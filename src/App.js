import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import useLocalStorage from 'use-local-storage';
import { TipLabel } from './TipLabel.js';
import 'leaflet/dist/leaflet.css';

const LocateClicks = ({ createLabel }) => {
  const map = useMap();
  map.off('click');
  map.on('click', function (e) {
    createLabel(e.latlng);
  });
  return null
}

const App = () => {
  const [labels, setLabels] = useLocalStorage("labels", []);
  return (
    <MapContainer
      center={[32.1, 34.8]}
      zoom={14}
      style={{ height: '100vh' }}
      key={'map'}
    >
      <LocateClicks
        createLabel={(latlng) => {
          const newLabels = labels.map(l => {
            const {latlng, text} = l;
            return {latlng, text};
          });
          newLabels.push({ latlng, text: 'Label ' + labels.length, first: true });
          setLabels(newLabels);
        }}
      >
      </LocateClicks>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {labels.map((lb, i) =>
        <TipLabel key={i} currLabel={lb} labels={labels} setLabels={setLabels}></TipLabel>
      )}
    </MapContainer>
  );
}

export default App;
