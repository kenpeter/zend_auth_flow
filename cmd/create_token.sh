#!/bin/sh

curl https://kenpeter4444.zendesk.com/api/v2/oauth/tokens.json \
   -H "Content-Type: application/json" \
   -d '{"token": {"client_id": 114093958794, "scopes": ["read", "write"]}}' \
   -X POST -v -u figo2478@gmail.com:Kenpeter4444!
