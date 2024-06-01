# Check if version argument is provided
if (-not $args) {
    Write-Host "No version argument supplied, defaulting to 'latest'"
    $version = "latest"
} else {
    $version = $args[0]
}

# Build the Docker image
docker build --build-arg APP_ENV=production -t rockonyxapp:$version .

# Tag the Docker image
docker tag rockonyxapp:$version rockonyx.azurecr.io/rockonyxapp:$version

# Push the Docker image to the registry
docker push rockonyx.azurecr.io/rockonyxapp:$version
