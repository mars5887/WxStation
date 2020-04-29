import React from "react";
import L from "leaflet";

const style = {
  width: "100%",
  height: "300px"
};

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lon: '',
      markersData: []
    }

    console.log("Map constructor  " +JSON.stringify(this.props.markersData));
  }

   componentDidMount = () => {
    console.log("Map componentDidMount  " +JSON.stringify(this.props.markersData));
	    // create map
		this.map = L.map("map", {
			center: [0, 0],
			zoom: 12,
			layers: [
				L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
				attribution:
					'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				})
			]
		});

		// add layer
    this.layer = L.layerGroup().addTo(this.map);
    
    //Calling this here to get the map to paint first go around
    this.componentDidUpdate(this.props.markersData);
    
  }

  componentDidUpdate = ({ markersData }) => {

    console.log("Map componentDidUpdate");
	  this.updateMapView();
    // check if data has changed
    if (this.props.markersData !== markersData) {
      this.updateMarkers(this.props.markersData);
    }
    
	
  }

  updateMarkers = (markersData) => {
    console.log("Map updateMarkers " +JSON.stringify(markersData));
    this.layer.clearLayers();
    markersData.forEach(marker => {
      L.marker(marker.latLng, { title: marker.title }).addTo(this.layer);
    });

  }

  updateMapView = () => {
	  this.map.setView(L.latLng(this.props.lat, this.props.lon))
	  this.map.setZoom(12)
    console.log("Map updateMapView lat: "+this.props.lat+", lon: "+this.props.lon);
  }


  render() {
    return <div id="map" style={style} />;
  }
}

export default Map;
