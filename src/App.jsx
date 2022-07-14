import logo from "./logo.svg";
import "./App.scss";
import NavBar from "./components/NavBar";
// import Selection from "./components/Selection";
import { useEffect, useMemo, useState } from "react";

import { GlobalContex } from "./globalContext";
import axios from "axios";
import Selection from "./components/Selectionn";

function App() {
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [query, setQuery] = useState("");

  const [selectedPlanet1, setSelectedPlanet1] = useState(null);
  const [selectedPlanet2, setSelectedPlanet2] = useState(null);
  const [selectedPlanet3, setSelectedPlanet3] = useState(null);
  const [selectedPlanet4, setSelectedPlanet4] = useState(null);

  const [selectedRide1, setSelectedRide1] = useState(null);
  const [selectedRide2, setSelectedRide2] = useState(null);
  const [selectedRide3, setSelectedRide3] = useState(null);
  const [selectedRide4, setSelectedRide4] = useState(null);

  const [totalTime, setTotalTime] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get(`https://findfalcone.herokuapp.com/planets`).then((res) => {
      setPlanets(res.data);
    });
    axios.get(`https://findfalcone.herokuapp.com/vehicles`).then((res) => {
      setVehicles(res.data);
    });
  }, []);

  const updateTime = (distance, speed) => {
    console.log("in update time", distance, speed);
    const time = Number(distance) / Number(speed);
    setTotalTime(totalTime + time);
  };

  useEffect(() => {});

  const value = {
    planets,
    setPlanets,
    vehicles,
    setVehicles,
    query,
    setQuery,
    updateTime,
  };

  const getToken = () => {
    axios
      .post(
        `https://findfalcone.herokuapp.com/token`,
        {},
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data.token);
        // setToken(res.data.token)
        if (res.data.token) {
          handleSearch(res.data.token);
        }
      });
  };

  const handleSearch = (token) => {
    axios
      .post(
        `https://findfalcone.herokuapp.com/find`,
        {
          token: token,
          planet_names: [
            selectedPlanet1.name,
            selectedPlanet2.name,
            selectedPlanet3.name,
            selectedPlanet4.name,
          ],
          vehicle_names: [
            selectedRide1.name,
            selectedRide2.name,
            selectedRide3.name,
            selectedRide4.name,
          ],
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data, "showresult");
        setResult(res.data);
      });
  };

  const conditionalPlanetState = (index) => {
    switch (index) {
      case 0:
        return selectedPlanet1;
      case 1:
        return selectedPlanet2;
      case 2:
        return selectedPlanet3;
      case 3:
        return selectedPlanet4;
      default:
        break;
    }
  };

  const conditionalPlanetSetState = (index) => {
    switch (index) {
      case 0:
        return setSelectedPlanet1;
      case 1:
        return setSelectedPlanet2;
      case 2:
        return setSelectedPlanet3;
      case 3:
        return setSelectedPlanet4;
      default:
        break;
    }
  };

  const conditionalRideState = (index) => {
    switch (index) {
      case 0:
        return selectedRide1;
      case 1:
        return selectedRide2;
      case 2:
        return selectedRide3;
      case 3:
        return selectedRide4;
      default:
        break;
    }
  };

  const conditionalRideSetState = (index) => {
    switch (index) {
      case 0:
        return setSelectedRide1;
      case 1:
        return setSelectedRide2;
      case 2:
        return setSelectedRide3;
      case 3:
        return setSelectedRide4;
      default:
        break;
    }
  };

  const conditionalDiv = () => {
    if (result?.status !== "false" && result !== null) {
      return (
        <div
          style={{
            padding: "6vw 10vw",
            height: "52vh",
            fontSize: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: 600 }}>
            Success! Congratulations on Finding Falcone. King Shan is mightly
            pleased.
          </div>
          <br />
          <div>Time Taken: {totalTime}</div>
          <div>Planet Found: {result.planet_name}</div>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="submitButton"
              onClick={(e) => window.location.reload()}
            >
              Start Again
            </div>
          </div>
        </div>
      );
    } else if (result?.status === "false" && result !== null) {
      return (
        <div
          style={{
            padding: "6vw 10vw",
            height: "52vh",
            fontSize: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: 600 }}>
            Mission Failed! Falcone is yet to be found. King Shan is waiting.
          </div>

          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="submitButton"
              onClick={(e) => window.location.reload()}
            >
              Start Again
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div style={{ padding: "6vw 10vw", height: "52vh" }}>
            <div
              style={{
                padding: "30px 0px",
                fontSize: "25px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                Select planets you want to <b>search</b> in:
              </div>
              <div>Time Taken: {totalTime}</div>
            </div>
            <div className="selectionGrid">
              {Array(4)
                .fill("")
                .map((item, index) => {
                  return (
                    <div>
                      <div style={{ padding: "10px 27px" }}>
                        Destination {index + 1}
                      </div>
                      <Selection
                        selectedPlanet={conditionalPlanetState(index)}
                        selectedRide={conditionalRideState(index)}
                        setSelectedPlanet={conditionalPlanetSetState(index)}
                        setSelectedRide={conditionalRideSetState(index)}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          {selectedPlanet1 &&
          selectedPlanet2 &&
          selectedPlanet3 &&
          selectedPlanet4 &&
          selectedRide1 &&
          selectedRide2 &&
          selectedRide3 &&
          selectedRide4 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="submitButton" onClick={getToken}>
                Find Falcone!
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      );
    }
  };

  return (
    <GlobalContex.Provider value={value}>
      <div className="App">
        <div className="nav">
          <NavBar />
        </div>
        {conditionalDiv()}
      </div>
    </GlobalContex.Provider>
  );
}

export default App;
