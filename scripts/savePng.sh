#!/usr/bin/env bash

curl -X POST \
  http://localhost:8080/ \
  -H 'Accept: image/png' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 4940' \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:8080' \
  -H 'cache-control: no-cache' \
  -d @vegaSpecs/bar.vl.json >> plot.png