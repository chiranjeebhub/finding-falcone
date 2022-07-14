import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobalContex } from "../globalContext";

const Selection3 = () => {
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

    selectedPlanet3,
    setSelectedPlanet3,
    selectedRide3,
    setSelectedRide3,
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
    if (selectedPlanet3 && selectedRide3) {
      updateTime(selectedPlanet3.distance, selectedRide3.speed);
    }
  }, [selectedPlanet3, selectedRide3]);

  useEffect(() => {
    // console.log(clickedItem);
    setPlanets(planets.filter((o) => o !== selectedPlanet3));
  }, [selectedPlanet3]);

  const removeSelected = (item) => {
    setPlanets([...planets, item]);
    setSelectedPlanet3(null);
    // console.log("remove selected", selectedPlanet3);
    // setPlanets(planets.filter((o) => o.name !== selectedPlanet3.name));
    // // setPlanets([...planets, selectedPlanet3]);
  };

  const removeSelectedRide = () => {};

  useEffect(() => {
    if (selectedRide3) {
      const found = vehicles.find((obj) => obj.name == selectedRide3.name);
      if (found) {
        found.total_no = found.total_no - 1;
        setVehicles([...vehicles]);
      }
    }
  }, [selectedRide3]);

  const handleChooseRide = () => {};

  return selectedPlanet3 ? (
    <div className="slectionCard">
      <div className="selectedPlanet">
        {selectedPlanet3?.name}
        <div
          className="resetPlanet1"
          onClick={(e) => {
            removeSelected(selectedPlanet3);
          }}
        >
          {selectedPlanet3.distance} km
        </div>
      </div>
      <br />
      <div>Choose Your Ride:</div>

      {selectedRide3 ? (
        <div className="selectedPlanet">
          {selectedRide3?.name}
          <div
            className="resetPlanet1"
            onClick={(e) => {
              removeSelectedRide(selectedRide3);
            }}
          >
            {selectedRide3.total_no} Remaining
          </div>
        </div>
      ) : (
        vehicles.map((item, index) => {
          return (
            <div
              onClick={(e) => {
                if (
                  item.max_distance >= selectedPlanet3.distance &&
                  item.total_no > 0
                ) {
                  setSelectedRide3(item);
                  updateTime(selectedPlanet3.distance, selectedRide3.speed);
                }
              }}
              id={index}
              className={
                item.max_distance >= selectedPlanet3.distance &&
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
                  background: selectedRide3 === item ? "green" : "lightgray",
                  borderRadius: "100%",
                }}
              ></div>
              <div>{item.name}</div>
              <div className="resetPlanet" style={{ background: "#e7e7e7" }}>
                {item.total_no}
              </div>
            </div>
          );
        })
      )}
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
                      setSelectedPlanet3(item);
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

export default Selection3;
