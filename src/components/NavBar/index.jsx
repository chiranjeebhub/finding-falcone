import React from "react";

const NavBar = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "30px",
        }}
      >
        <div style={{ fontSize: "40px" }}>
          Finding <b>Falcone</b>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{ cursor: "pointer" }}
            onClick={(e) => window.location.reload()}
          >
            Reset
          </div>
          <div style={{ padding: "0px 10px" }}>|</div>
          <div>Home</div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
