import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobalContex } from "../globalContext";

const Selection4 = () => {
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

    selectedPlanet4,
    setSelectedPlanet4,
    selectedRide4,
    setSelectedRide4,
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
    if (selectedPlanet4 && selectedRide4) {
      updateTime(selectedPlanet4.distance, selectedRide4.speed);
    }
  }, [selectedPlanet4, selectedRide4]);

  useEffect(() => {
    // console.log(clickedItem);
    setPlanets(planets.filter((o) => o !== selectedPlanet4));
  }, [selectedPlanet4]);

  const removeSelected = (item) => {
    setPlanets([...planets, item]);
    setSelectedPlanet4(null);
    // console.log("remove selected", selectedPlanet4);
    // setPlanets(planets.filter((o) => o.name !== selectedPlanet4.name));
    // // setPlanets([...planets, selectedPlanet4]);
  };

  const removeSelectedRide = () => {};

  useEffect(() => {
    if (selectedRide4) {
      const found = vehicles.find((obj) => obj.name == selectedRide4.name);
      if (found) {
        found.total_no = found.total_no - 1;
        setVehicles([...vehicles]);
      }
    }
  }, [selectedRide4]);

  const handleChooseRide = () => {};

  return selectedPlanet4 ? (
    <div className="slectionCard">
      <div className="selectedPlanet">
        {selectedPlanet4?.name}
        <div
          className="resetPlanet1"
          onClick={(e) => {
            removeSelected(selectedPlanet4);
          }}
        >
          {selectedPlanet4.distance} km
        </div>
      </div>
      <br />
      <div>Choose Your Ride:</div>

      {selectedRide4 ? (
        <div className="selectedPlanet">
          {selectedRide4?.name}
          <div
            className="resetPlanet1"
            onClick={(e) => {
              removeSelectedRide(selectedRide4);
            }}
          >
            {selectedRide4.total_no} Remaining
          </div>
        </div>
      ) : (
        vehicles.map((item, index) => {
          return (
            <div
              onClick={(e) => {
                if (
                  item.max_distance >= selectedPlanet4.distance &&
                  item.total_no > 0
                ) {
                  setSelectedRide4(item);
                  updateTime(selectedPlanet4.distance, selectedRide4.speed);
                }
              }}
              id={index}
              className={
                item.max_distance >= selectedPlanet4.distance &&
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
                  background: selectedRide4 === item ? "green" : "lightgray",
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
                      setSelectedPlanet4(item);
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

export default Selection4;
