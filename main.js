const mapViewOptions = {
    accessToken: 'pk.eyJ1IjoiZ2V3YS1tYXBzcGVvcGxlIiwiYSI6ImNsZzJudDB4ZTAwcnEzZnAwb2VvbTYwYnIifQ.w-cnsU-xP9jaly_qrgy_iA',
    element: document.getElementById('map'),
    center: { lat: 30.3605208, lng: -97.7421839 }, // Austin Office
    zoom: 18,
    maxZoom: 22,
};


const mapViewInstance = new mapsindoors.mapView.MapboxView(mapViewOptions);
const mapsIndoorsInstance = new mapsindoors.MapsIndoors({
    mapView: mapViewInstance,
});
const mapboxInstance = mapViewInstance.getMap();

// Floor Selector
const floorSelectorElement = document.createElement('div');
new mapsindoors.FloorSelector(floorSelectorElement, mapsIndoorsInstance);
mapboxInstance.addControl({ onAdd: function () { return floorSelectorElement }, onRemove: function () { } });



// List of coordinates
const coords = [
[-97.74235947195987, 30.360446646290285],
[-97.74227024531181, 30.360585962071397],
[-97.74218951643951, 30.360717945260504],
[-97.74204930313549, 30.360875591613947],
[-97.74190908983101, 30.360926918279276],
[-97.74168814765467, 30.360871925422444],
[-97.7416541565507, 30.360772938203937],
[-97.74172213875867, 30.36064462128914],
[-97.74185810317503, 30.360453978704953],
[-97.74191758760722, 30.360354991062692],
[-97.74182411207106, 30.36022667359957],
[-97.74169239654279, 30.36014601682197],
[-97.74157342767886, 30.360065359978606],
[-97.74136523216642, 30.359992035517266],
[-97.74107727565409, 30.359934588549905],
[-97.74094131123775, 30.359769608214435],
[-97.74087332902977, 30.359564298964457],
[-97.74084783570156, 30.35930766179544],
[-97.74079746031015, 30.359089067189473],
[-97.74078471364626, 30.358909420369415],
[-97.74099715804637, 30.359019408257353],
[-97.74140930018315, 30.359228384904924],
[-97.74172796678374, 30.35941536363177],
[-97.74249833126048, 30.359747141751612],
[-97.74278725564477, 30.359912122124953],
[-97.74305918447752, 30.36000377776756],
[-97.74325888221374, 30.360121096864574],
[-97.74322064222163, 30.360286076607196],
[-97.74311442002157, 30.360447389864234],
[-97.74297845559684, 30.360670062743054],
[-97.74271927342842, 30.360600404936775],
[-97.74248983347587, 30.36050141744265],
[-97.74238361127581, 30.36047575400208]
];

// create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';
        


// Create marker
const marker = new mapboxgl.Marker(el)
  .setLngLat(coords[0])
  .addTo(mapboxInstance); 

let counter = 0; 

// Move marker every 3 seconds  
const interval = setInterval(() => {

  marker.setLngLat(coords[counter]);
  
  counter++;
  
  if (counter >= coords.length) {
    counter = 0;
  }

}, 700);
        

mapboxInstance.on('load', function() {
    map.addLayer({
      id: 'polyline',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: coords
          }
        }
      },
      paint: {
        'line-color': 'yellow',
        'line-width': 7,
        'line-opacity': 0.5
      }
    });
  });
  
  var polylineVisible = true;

document.getElementById('toggleButton').addEventListener('click', function() {
  if (polylineVisible) {
    map.setLayoutProperty('polyline', 'visibility', 'none');
  } else {
    map.setLayoutProperty('polyline', 'visibility', 'visible');
  }
  polylineVisible = !polylineVisible;
});
          
