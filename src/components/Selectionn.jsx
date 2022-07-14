import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobalContex } from "../globalContext";

const Selection = ({
  selectedPlanet,
  selectedRide,
  setSelectedPlanet,
  setSelectedRide,
}) => {
  const {
    planets,
    setPlanets,
    vehicles,
    setVehicles,
    query,
    setQuery,
    updateTime,
  } = useContext(GlobalContex);
  const [showPlanetList, setShowPlanetList] = useState(false);

  const wrapperRef = useRef();

  let filteredPlanets = planets
    ? planets.filter((item) => {
        const lowquery = query.toLowerCase();
        return item.name.toLowerCase().indexOf(lowquery) >= 0;
      })
    : "";

  function useOutsideClickListener(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowPlanetList(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideClickListener(wrapperRef);

  useEffect(() => {
    if (selectedPlanet && selectedRide) {
      updateTime(selectedPlanet.distance, selectedRide.speed);
    }
  }, [selectedPlanet, selectedRide]);

  useEffect(() => {
    // console.log(clickedItem);
    setPlanets(planets.filter((o) => o !== selectedPlanet));
  }, [selectedPlanet]);

  const removeSelected = (item) => {
    setPlanets([...planets, item]);
    setSelectedPlanet(null);
    // console.log("remove selected", selectedPlanet);
    // setPlanets(planets.filter((o) => o.name !== selectedPlanet.name));
    // // setPlanets([...planets, selectedPlanet]);
  };

  useEffect(() => {
    if (selectedRide) {
      const found = vehicles.find((obj) => obj.name == selectedRide.name);
      if (found) {
        found.total_no = found.total_no - 1;
        setVehicles([...vehicles]);
      }
    }
  }, [selectedRide]);

  return selectedPlanet ? (
    <div className="slectionCard">
      <div className="selectedPlanet">
        {selectedPlanet?.name}
        <div
          className="resetPlanet1"
          onClick={(e) => {
            removeSelected(selectedPlanet);
          }}
        >
          {selectedPlanet.distance} km
        </div>
      </div>
      <br />
      <div>Choose Your Ride:</div>

      <div className={selectedRide ? "disabledSection" : ""}>
        {vehicles.map((item, index) => {
          return (
            <div
              onClick={(e) => {
                console.log(
                  item.max_distance,
                  selectedPlanet.distance,
                  selectedRide,
                  "kjebdkwjed"
                );
                if (
                  item.max_distance >= selectedPlanet.distance &&
                  item.total_no > 0 &&
                  selectedRide === null
                ) {
                  console.log(
                    item.max_distance,
                    selectedPlanet.distance,
                    selectedRide,
                    "kjebdkwjed"
                  );
                  setSelectedRide(item);
                }
              }}
              id={index}
              className={
                item.max_distance >= selectedPlanet.distance &&
                item.total_no > 0
                  ? "planetItem"
                  : "planetItemDisabled"
              }
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: "10px",
                  width: "10px",
                  background: selectedRide === item ? "green" : "lightgray",
                  borderRadius: "100%",
                }}
              ></div>
              <div>{item.name}</div>
              <div className="resetPlanet" style={{ background: "#e7e7e7" }}>
                {item.total_no}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <>
      <div className="slectionCard">
        <input
          ref={wrapperRef}
          onFocus={(e) => setShowPlanetList(true)}
          //   onBlur={(e) => setShowPlanetList(false)}
          className="planetSearch"
          type="text"
          placeholder="Choose Destination"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div onMouseDown={(e) => e.stopPropagation()}>
          {showPlanetList ? (
            <div>
              {filteredPlanets.map((item, index) => {
                return (
                  <div
                    onClick={(e) => {
                      setSelectedPlanet(item);
                      // setClickedItem(item);
                      //   setShowPlanetList(null);
                    }}
                    className="planetItem"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img
                      src={require(`../assets/images/planets/${item?.name.toLowerCase()}.png`)}
                      alt=""
                      style={{ width: "30px" }}
                    />
                    <div style={{ paddingLeft: "10px" }}>{item.name}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Selection;
