#!/usr/bin/env node

/*
 * Given an interpolated segment, tranforms into
 * a feature collection and outputs to a given file.
 * Each feature represents one segment, with 
 * associated itp properties like `lfromhn`
 * 
 * Usage: 
 * $ node ./segTransform.js <input> <output>
 *
 * ex: node ./segTransform.js itpSeg.json outputSeg.geojson
 */

const segmentJson = require(__dirname + '/' + process.argv[2]);
const outputPath = '/' + process.argv[3];
const fs = require('fs');

transformSegment(segmentJson, outputPath);

function transformSegment(segment, output) {
    let feature = {
        'type': 'Feature',
        'geometry': {
            'type': 'LineString',
            'coordinates': []
        },
        'properties': {}
    };

    let featCollection = {
        'type': 'FeatureCollection',
        'features': []
    };

    for (var i = 0; i < segment['geometry']['geometries'][0]['coordinates'].length; i++) {
        feature['geometry']['coordinates'] = segment['geometry']['geometries'][0]['coordinates'][i];
        feature['properties']['parityl'] = segment['properties']['carmen:parityl'][0][i];
        feature['properties']['parityr'] = segment['properties']['carmen:parityr'][0][i];
        feature['properties']['lfromhn'] = segment['properties']['carmen:lfromhn'][0][i];
        feature['properties']['ltohn'] = segment['properties']['carmen:ltohn'][0][i];
        feature['properties']['rfromhn'] = segment['properties']['carmen:rfromhn'][0][i];
        feature['properties']['rtohn'] = segment['properties']['carmen:rtohn'][0][i];
        featCollection['features'].push(JSON.parse(JSON.stringify(feature)));
    }

    // loop through addresses, combine with coords to feature, push
    feature['geometry']['type'] = 'Point';
    for (var j = 0; j < segment['properties']['carmen:addressnumber'][1].length; j++) {
        feature['properties']['carmen:addressnumber'] = segment['properties']['carmen:addressnumber'][1][j];
        feature['geometry']['coordinates'] = segment['geometry']['geometries'][1]['coordinates'][j];
        featCollection['features'].push(JSON.parse(JSON.stringify(feature)));
    }

    fs.writeFileSync(__dirname + output, JSON.stringify(featCollection, null, 2));
}
