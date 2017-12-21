#!/usr/bin/env node

/*
 * Given an interpolated segment, tranforms into
 * a feature collection and outputs to a given file.
 * Each feature represents one segment, with 
 * associated itp properties like `lfromhn`
 * 
 * Usage: 
 * $ npm install geojson # I know, this is trash. Sorrynotsorry.
 * $ node ./segTransform.js <input> <output>
 *
 * ex: node ./segTransform.js itpSeg.json outputSeg.geojson
 */

const segmentJson = require(__dirname + '/' + process.argv[2]);
const outputPath = '/' + process.argv[3];
const Geojson = require('geojson');
const fs = require('fs');

transformSegment(segmentJson, outputPath);

function transformSegment(segment, output) {
    let feature = {};
    let featArray = [];

    for (var i = 0; i < segment["geometry"]["geometries"][0]["coordinates"].length; i++) {
        feature.coordinates = segment["geometry"]["geometries"][0]["coordinates"][i];
        feature.parityl = segment["properties"]["carmen:parityl"][0][i];
        feature.parityr = segment["properties"]["carmen:parityr"][0][i];
        feature.lfromhn = segment["properties"]["carmen:lfromhn"][0][i];
        feature.ltohn = segment["properties"]["carmen:ltohn"][0][i];
        feature.rfromhn = segment["properties"]["carmen:rfromhn"][0][i];
        feature.rtohn = segment["properties"]["carmen:rtohn"][0][i];
        featArray.push(feature);
    }
    
    let collection = Geojson.parse(featArray, {'LineString': 'coordinates'});
    fs.writeFileSync(__dirname + output, JSON.stringify(collection, null, 2));
}
