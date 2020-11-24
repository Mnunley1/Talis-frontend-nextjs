import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import talisMarker from '../../public/images/talis-marker.svg';
import 'leaflet/dist/leaflet.css';

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;
const mapMarker = L.icon({
  iconUrl: talisMarker,

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});
const position = [5.6046451, -0.187984];

const Map = () => {
  return (
    <MapContainer
      center={[5.6046451, -0.187984]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: '400px' }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mxnunley1/ckgs8lxoe187p1al3q9s3pohv/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      <Marker position={position} icon={mapMarker}>
        <Popup>
          Talis Office <br /> 8 Sir Arku Korsah Rd <br /> Airport, Accra, Ghana
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
