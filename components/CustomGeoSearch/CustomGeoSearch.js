import { useEffect } from 'react';
import { connectGeoSearch } from 'react-instantsearch-dom';
import L from 'leaflet';
import talisMarker from '../../public/images/talis-marker.svg';
import 'leaflet/dist/leaflet.css';
import 'instantsearch.css/themes/algolia.css';
//import './Map.css';

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;
const mapMarker = L.icon({
  iconUrl: talisMarker,

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const GeoSearch = (props, el) => {
  const isUserInteraction = true;
  let markers = [];

  useEffect(() => {
    const { refine } = props;
    const instance = L.map(el, { center: [5.55602, -0.1969], zoom: 11 });
    L.tileLayer(
      `https://api.mapbox.com/styles/v1/mxnunley1/ckgs8lxoe187p1al3q9s3pohv/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`,
      {
        attribution:
          'Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>',
      }
    ).addTo(instance);
  }, []);

  useEffect(() => {
    const { hits, currentRefinement } = props;

    markers.forEach((marker) => marker.remove());

    markers = hits.map(({ _geoloc }) =>
      L.marker([_geoloc.lat, _geoloc.lng], { icon: mapMarker }).addTo(instance)
    );

    if (markers.length) {
      instance.fitBounds(L.featureGroup(markers).getBounds(), {
        animate: false,
        padding: [10, 10],
      });
    }
  }, [hits]);

  return (
    <div>
      <div
        style={{ position: 'absolute', height: '100%', borderRadius: '15px' }}
        ref={(c) => (el = c)}
      />
    </div>
  );
};

export const CustomGeoSearch = connectGeoSearch(GeoSearch);
