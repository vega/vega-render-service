#!/usr/bin/env bash

curl -X POST \
  -H 'Accept: image/png' \
  -H 'Content-Type: application/json' \
  -d @./vegaSpecs/bar.vg.json  http://localhost:8080/ \
  >> plot.png