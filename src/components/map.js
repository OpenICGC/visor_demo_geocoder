import mapboxgl from "mapbox-gl";
import StylesControl from "mapbox-gl-controls/lib/styles";
import CompassControl from 'mapbox-gl-controls/lib/compass';
import ZoomControl from 'mapbox-gl-controls/lib/zoom';
import turfCircle from '@turf/circle';
import { point } from "@turf/helpers";

import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-controls/theme.css";

export default function createMap() {
	const map = new mapboxgl.Map({
		container: "map",
		minZoom: 2,
		maxZoom: 18,
		hash: true,
		style: "https://tilemaps.icgc.cat/tileserver/styles/positron.json",
		center: [1.88979, 41.69589],
		zoom: 13.61,
		attributionControl: false,
		preserveDrawingBuffer: true
	});
	
	//map.addControl(new mapboxgl.NavigationControl());

	map.addControl(new ZoomControl(), 'top-right');
	map.addControl(new CompassControl(), 'top-right');

	map.addControl(new mapboxgl.AttributionControl({
		compact: true
	}));

	map.on('load', function(){

		map.addSource('adreca', {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: [
				]
			}
		});

		map.addSource('buffer', {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: [
				]
			}
		});

		map.addLayer({
			id: 'adreca',
			type: 'circle',
			source: 'adreca',
			paint: {
				'circle-radius': 6,
				'circle-stroke-color': "#ffffff",
				'circle-stroke-width': 1,
				'circle-color': '#486DE0'
			}
		});

		map.addLayer({
			id: 'buffer',
			type: 'fill',
			source: 'buffer',
			paint: {
				'fill-color': '#486DE0',
				'fill-opacity': 0.4
			}
		}, 'adreca');

		map.on('click', function(e) {

			

		});

	});

	return map;
}
