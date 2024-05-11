#!/bin/sh

# Check if version argument is provided
if [ -z "$1" ]
then
    echo "No version argument supplied, defaulting to 'latest'"
    version="latest"
else
    version=$1
fi

# Build the Docker image
docker build --build-arg APP_ENV=production -t rockonyxapp:$version .

# Tag the Docker image
docker tag rockonyxapp:$version rockonyx.azurecr.io/rockonyxapp:$version

# Push the Docker image to the registry
docker push rockonyx.azurecr.io/rockonyxapp:$version