#!/usr/bin/env bash

curl -X POST \
  -H 'Accept: application/pdf' \
  -H 'Content-Type: application/json' \
  -d @./vegaSpecs/bar.vg.json http://localhost:8080/ \
   >> plot.pdf