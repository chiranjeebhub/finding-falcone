import React, { useContext } from "react";
import { GlobalContex } from "../globalContext";

const Vehicles = () => {
  const {
    wrapperRef,
    showRides,
    vehicles,
    selectedPlanet,
    setpair,
    pair,
    updateUnit,
    resources,
  } = useContext(GlobalContex);
  return (
    <>
      <div ref={wrapperRef} style={{ padding: "0px 10vh" }}>
        {showRides ? (
          <div className="ridesSection">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px",
              }}
            >
              {resources === 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "30vh",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      paddingBottom: "40px",
                      fontSize: "20px",
                      fontWeight: 700,
                    }}
                  >
                    You can't search in this planet because your Resources are
                    depleted.
                    <br />
                    Please restart your ship selection or choose other planet.
                  </div>
                  <div
                    className="submitButton"
                    onClick={(e) => window.location.reload()}
                  >
                    Restart Selection
                  </div>
                </div>
              ) : (
                vehicles.map((item, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        onClick={(e) => {
                          if (
                            item.max_distance >= selectedPlanet.distance &&
                            item.total_no > 0
                          ) {
                            setpair([
                              ...pair,
                              {
                                planet: selectedPlanet.name,
                                distance: selectedPlanet.distance,
                                vehicle: item.name,
                                vehicleMax: item.max_distance,
                                speed: item.speed,
                              },
                            ]);
                            updateUnit(item);
                          }
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          cursor: "pointer",
                          opacity:
                            item.max_distance >= selectedPlanet.distance &&
                            item.total_no > 0
                              ? 1
                              : 0.4,
                        }}
                      >
                        <img
                          // className="App-logo"
                          src={require(`../assets/images/vehicles/${item.max_distance}.jpeg`)}
                          alt=""
                          style={{ width: "100px", height: "250px" }}
                        />
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: "20px",
                            paddingTop: "10px",
                          }}
                        >
                          {item.name}
                        </div>
                        <br />
                        <div>Max Distance: {item.max_distance}</div>
                        <div style={{ display: "flex" }}>
                          <div>Speed: {item.speed}</div>
                          <div style={{ padding: "0px 10px" }}>|</div>
                          <div>Units: {item.total_no}</div>
                        </div>
                      </div>
                    </>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        {!showRides && pair.length < 1 ? (
          <div
            style={{
              margin: "20vh 10vw",
              padding: "7vh",
              border: "1px solid lightgray",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "white",
                marginTop: "-9.5vh",
                marginBottom: "5vh",
                padding: "10px",
                width: "200px",
                textAlign: "center",
                // border: "1px solid lightgray",
                fontWeight: 700,
                fontSize: "20px",
                // background: "black",
                // color: "white",
              }}
            >
              Mission & Objective
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                // textAlign: "center",
                fontSize: "18px",
              }}
            >
              After the recent Falicornian war, King Shan has exiled Queen Al
              Falcone for 15 years. However, if he finds her before the 15 years
              are up, she has to go into exile for another 15 years!
              <br />
              <br />
              King Shan has received intelligence that Al Falcone is hiding in
              one of six neighbouring planets.
              <br />
              <br />
              But you have limited resources. You can only search in 4 planets.
              Choose Wisely.
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Vehicles;
