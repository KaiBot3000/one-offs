#!/bin/bash

# Given a line-delimited file of geojson features, log any features
# with more than 10 synonyms in `carmen:text`
# usage: $ ./countSynonyms.sh <geojsonFile>

filename="$1"
while read -r line
do
    feat="$line"
    count=$(echo $feat | jq '.properties["carmen:text"]' | awk -F, '{ print NF - 1 }')
    if (( "$count" > "10" )); then
        echo $feat >> ./longFeatures4.geojson
    fi
done < "$filename"
