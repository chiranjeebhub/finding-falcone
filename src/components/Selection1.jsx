import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobalContex } from "../globalContext";

const Selection1 = () => {
  const {
    planets,
    setPlanets,
    vehicles,
    setVehicles,
    query,
    setQuery,
    selectedPlanets,
    setSelectedPlanets,
    selectedVehicles,
    setSelectedVehicles,

    selectedPlanet1,
    setSelectedPlanet1,
    selectedRide1,
    setSelectedRide1,
    getVehicles,
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
    if (selectedPlanet1 && selectedRide1) {
      updateTime(selectedPlanet1.distance, selectedRide1.speed);
    }
  }, [selectedPlanet1, selectedRide1]);

  useEffect(() => {
    // console.log(clickedItem);
    setPlanets(planets.filter((o) => o !== selectedPlanet1));
  }, [selectedPlanet1]);

  const removeSelected = (item) => {
    setPlanets([...planets, item]);
    setSelectedPlanet1(null);
    // console.log("remove selected", selectedPlanet1);
    // setPlanets(planets.filter((o) => o.name !== selectedPlanet1.name));
    // // setPlanets([...planets, selectedPlanet1]);
  };

  const removeSelectedRide = () => {};

  useEffect(() => {
    if (selectedRide1) {
      const found = vehicles.find((obj) => obj.name == selectedRide1.name);
      if (found) {
        found.total_no = found.total_no - 1;
        setVehicles([...vehicles]);
      }
    }
  }, [selectedRide1]);

  return selectedPlanet1 ? (
    <div className="slectionCard">
      <div className="selectedPlanet">
        {selectedPlanet1?.name}
        <div
          className="resetPlanet1"
          onClick={(e) => {
            removeSelected(selectedPlanet1);
          }}
        >
          {selectedPlanet1.distance} km
        </div>
      </div>
      <br />
      <div>Choose Your Ride:</div>

      <div className={selectedRide1 ? "disabledSection" : ""}>
        {vehicles.map((item, index) => {
          return (
            <div
              onClick={(e) => {
                if (
                  item.max_distance >= selectedPlanet1.distance &&
                  item.total_no > 0 &&
                  selectedRide1 === null
                ) {
                  setSelectedRide1(item);
                }
              }}
              id={index}
              className={
                item.max_distance >= selectedPlanet1.distance &&
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
                  background: selectedRide1 === item ? "green" : "lightgray",
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
              {filteredPlanets.map((item) => {
                return (
                  <div
                    onClick={(e) => {
                      setSelectedPlanet1(item);
                      // setClickedItem(item);
                      //   setShowPlanetList(null);
                    }}
                    className="planetItem"
                  >
                    {item.name}
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

export default Selection1;
