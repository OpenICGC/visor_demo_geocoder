import $ from "jquery";
import buffer from "@turf/buffer";
import { point } from "@turf/helpers";

import "./cercaLlocs.css";

const _options = {
    //domain: "https://betaserver.icgc.cat/icgc_geocoder/?maxresultats=17&obtenirCoordGeografiques=si&tipus=Cap%20de%20Municipi&metode=localitzaToponim&ordre=alfabetic&trobaTots=no&nom=",
    domain: "https://aws.icgc.cat/cerca_pelias/autocomplete?text="
};

function initControls(parent, map) {

    parent.find(".searchboxinput").on("keyup", function(event) {
        if (event.which == 13) {
            checkInput(parent, map, true);
            event.preventDefault();
        } else {
            checkInput(parent, map, false);
        }
    });

    parent.on("click", "li a", function(e) {
        if ($(this).attr("data")) {
            const coords = $(this).attr("data").split("#");
            zoomTo(parent, map, coords[0], coords[1])
        }
    });

}

function checkInput(parent, map, keyOrigen) {
    const self = this;
    const _toponim = parent.find(".searchboxinput").val();
    if (_toponim && _toponim.length > 2) {
        sendRequest(parent, map, _toponim, keyOrigen);
    } else {
        parent.find(".mygrid").fadeOut();
    }
}

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
    createBuffer(map, lat, lon);
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

function createBuffer(map, lat, lon){
    const pt = point([lon, lat]);
    const buffered = buffer(pt, 1, {units: 'kilometers'});
    console.log(buffered);
    map.getSource("buffer").setData({
        type: 'FeatureCollection',
        features: [
            buffered
        ]
    });
}

export default function createCercaLlocs(parent, map) {
    
    const html = `<div class="ui fluid icon input"><input class="searchboxinput" type="text" placeholder="Anar a... (Municipi)"><i class="search icon"></i></div><div class="mygrid"></div>`;

    const template = document.createElement("template");
	template.innerHTML = html;

    $(parent).append(template.content.cloneNode(true));
    
    initControls($(parent), map);

}
