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
              {vehicles.map((item, index) => {
                return (
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
                );
              })}
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
