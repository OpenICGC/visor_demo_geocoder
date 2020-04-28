import $ from "jquery";
import { point } from "@turf/helpers";

import "./cercaLlocs.css";

const _options = {
    domain: "https://aws.icgc.cat/cerca_pelias/reverse?"
};


function sendRequest(parent, map, _toponim, keyOrigen) {
    const self = this;
    $.ajax({
        url: `${_options.domain}${ _toponim}`,
        method: "GET",
        dataType: "json",
        success: function(data) {
            const mygrid = parent.find(".mygrid");
            if (data) {
                mygrid.fadeIn();
                mygrid.html("");
                if (data.features && data.features.length >= 1) {
                    const cList = $("<ul>").appendTo(mygrid);
                    $.each(data.features, function(index, feature) {

                        $(`<li><a data="${feature.geometry.coordinates[1]}#${feature.geometry.coordinates[0]}" href="#"><b>${feature.properties.label}</b></a>`).appendTo(cList);

                        if (keyOrigen && data.features.length >= 1) {

                            zoomTo(parent, map, feature.geometry.coordinates[1], feature.geometry.coordinates[0])

                        }

                    });
                } else {
                    mygrid.html("No s'ha trobat cap resultat");
                }
            } else {
                mygrid.html("An error occured:");
            }
        },
        error: function(xhr) {
            console.log(xhr);
            mygrid.html(`An error occured: ${xhr.status} ${xhr.statusText}`);
        }

    });
}

function zoomTo(parent, map, lat, lon) {
    netejaPantalla(parent);
    map.flyTo({ center: [lon, lat], zoom: 14.5 });
    createPoint(map, lat, lon);
}

function netejaPantalla(parent) {
    parent.find(".mygrid").fadeOut();
    parent.find(".searchboxinput").val("");
}

function createPoint(map, lat, lon){
    map.getSource("adreca").setData({
        type: 'FeatureCollection',
        features: [
          {type: "Feature", geometry: {type: "Point", coordinates: [lon, lat]}}
        ]
    });
}


