import React from "react";
import "./ButtonPanel.css";

function ButtonPanel(props) {
  return (
    <div className="buttons-container">
      <button className="button-61" onClick={props.setDefaultMapZoom}>
        Default zoom
      </button>
    </div>
  );
}
export default ButtonPanel;
