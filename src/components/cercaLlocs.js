import $ from "jquery";
import { point } from "@turf/helpers";

import "./cercaLlocs.css";

const _options = {
    domain: "https://eines.icgc.cat/geocodificador/autocompletar?text="
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

    let mapCenter = map.getCenter();
    //let _focus = "&focus.point.lat=" + mapCenter.lat + "&focus.point.lon=" + mapCenter.lng;
    let _layer = "&layers=topo1,topo2,address";
    let _size = "&size=5";

    $.ajax({
        url: `${_options.domain}${ _toponim}${_layer}${_size}`,
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

export default function createCercaLlocs(parent, map) {
    
    const html = `<div class="ui fluid icon input"><input class="searchboxinput" type="text" placeholder="Anar a... (adreça)"><i class="search icon"></i></div><div class="mygrid"></div>`;

    const template = document.createElement("template");
	template.innerHTML = html;

    $(parent).append(template.content.cloneNode(true));
    
    initControls($(parent), map);

}
