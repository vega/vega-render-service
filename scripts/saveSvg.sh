#!/usr/bin/env bash

curl -X POST \
  -H 'Accept: image/vegaSvg' \
  -H 'Content-Type: application/json' \
  -d @./vegaSpecs/bar.vl.json http://localhost:8080/ \
  >> plot.svg