cd .. && npm run build
cd dist
$(go env GOPATH)/bin/serve --port 4200 
