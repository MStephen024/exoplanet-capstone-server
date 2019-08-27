#!/bin/bash

API="http://localhost:4741"
URL_PATH="/favorites"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "favorite": {
      "nasa_id": "'"${NASA_ID}"'",
      "tags": "'"${TAG}"'"
    }
  }'

echo
