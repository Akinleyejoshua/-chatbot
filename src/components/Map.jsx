import GoogleMapReact from 'google-map-react';
import LocationPin from "./LocationPin";

const Map = ({location, zoomLevel}) => {
  return (
    <div className="map">
    <GoogleMapReact
      bootstrapURLKeys={{ key: "" }}
      defaultCenter={location}
      defaultZoom={zoomLevel}
    >
      <LocationPin
        lat={location.lat}
        lng={location.lng}
        // text={location.address}
      />
    </GoogleMapReact>
  </div>
  )
}



export default Map;