import { MapContainer, TileLayer, useMap, ZoomControl } from 'react-leaflet';
import useLocalStorage from 'use-local-storage';
import { TipLabel } from './TipLabel.js';
import 'leaflet/dist/leaflet.css';
import { ForkMe } from './ForkMe.js';

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
  const firstCenter = labels && labels.length ? labels[0].latlng : [32.1, 34.8];
  return (
    <div>
      <div className="titleText">
        <h3>Map Labels</h3>
        <p>Just click the map to add labels</p>
        {/* <hr /> */}
      </div>
      <MapContainer
        center={firstCenter}
        zoom={14}
        zoomControl={false}
        style={{ height: '100vh' }}
        key={'map'}
      >
        <ZoomControl position="bottomleft" />
        <LocateClicks
          createLabel={(latlng) => {
            const newLabels = labels.map(l => {
              const { latlng, text } = l;
              return { latlng, text };
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
      <ForkMe></ForkMe>
    </div>
  );
}

export default App;
