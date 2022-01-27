import React, { Component } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlSourceOSM from "ol/source/OSM";
import "./Map.css";
import rocket from "./images/kisspng-international-space-station-zero-robotics-earth-ob-iss-5b0f61c11a3f64.1228346515277347211075.png";

class Map extends Component {
  constructor(props) {
    super(props);
    this.olmap = new OlMap({
      target: null,
      layers: [
        new OlLayerTile({
          source: new OlSourceOSM(),
        }),
      ],
      view: new OlView({
        center: props.issPosition,
        zoom: props.mapZoom,
      }),
    });
  }

  updateMap() {
    this.olmap.getView().setCenter(this.props.issPosition);
    this.olmap.getView().setZoom(this.props.mapZoom);
  }

  componentDidMount() {
    this.olmap.setTarget("map");
    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.props.setIssPosition(center);
      this.props.setMapZoom(zoom);
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    if (
      center === this.props.getIssPosition() &&
      zoom === this.props.getMapZoom()
    ) {
      return false;
    }
    return true;
  }

  render() {
    this.updateMap(); // Update map on render?
    return (
      <div id="map">
        <img id="rocket" src={rocket} alt="rocket" />
      </div>
    );
  }
}

export default Map;
