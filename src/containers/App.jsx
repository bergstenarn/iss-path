import React from "react";
import "./App.css";
import Header from "../components/Header";
import ButtonPanel from "../components/ButtonPanel";
import Map from "../components/Map";
import { fromLonLat } from "ol/proj";

const defaultIssPosition = [0, 0];
const defaultMapZoom = 5;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { issPosition: defaultIssPosition, mapZoom: defaultMapZoom };
  }

  fetchIssPosition = () => {
    fetch("http://api.open-notify.org/iss-now.json")
      .then((resp) => resp.json())
      .then((issData) => {
        const issPosition = {
          issPosition: fromLonLat([
            Number(issData.iss_position.longitude),
            Number(issData.iss_position.latitude),
          ]),
        };
        this.setState(issPosition);
      });
  };

  onSetIssPosition = (position) => {
    this.setState({ ...this.state, issPosition: position });
  };

  onSetMapZoom = (zoom) => {
    this.setState({ ...this.state, mapZoom: zoom });
  };

  onSetDefaultMapZoom = () => {
    this.onSetMapZoom(defaultMapZoom);
  };

  onGetIssPosition = () => {
    return this.state.issPosition;
  };

  onGetMapZoom = () => {
    return this.state.mapZoom;
  };

  componentDidMount() {
    this.fetchIssPosition();
    this.timer = setInterval(() => this.fetchIssPosition(), 3000);
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        <ButtonPanel
          setIssPosition={this.onSetIssPosition}
          setDefaultMapZoom={this.onSetDefaultMapZoom}
        />
        <Map
          issPosition={this.state.issPosition}
          mapZoom={this.state.mapZoom}
          setIssPosition={this.onSetIssPosition}
          setMapZoom={this.onSetMapZoom}
          getIssPosition={this.onGetIssPosition}
          getMapZoom={this.onGetMapZoom}
        />
      </div>
    );
  }
}

export default App;
