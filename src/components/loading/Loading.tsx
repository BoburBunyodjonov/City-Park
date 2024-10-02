import React from "react";
import logo from "../assets/logo.svg";

const Loading: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        zIndex: 999,
      }}
    >
      <img src={logo} alt="ikan-park-logo" width={200} />
    </div>
  );
};

export default Loading;
