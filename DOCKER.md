# URL Previewer - Docker Deployment Guide

## Quick Start

### Build the Docker Image
```bash
docker build -t url-previewer .
```

### Run the Container
```bash
docker run -p 3000:3000 url-previewer
```

The app will be available at `http://localhost:3000`

## Docker Compose (Optional)

Create a `docker-compose.yml` for easier management:

```yaml
version: '3.8'
services:
  url-previewer:
    build: .
    ports:
      - "3000:3000"
    restart: unless-stopped
```

Then run:
```bash
docker-compose up -d
```

## Production Deployment

### Build for Production
```bash
# Build the image
docker build -t url-previewer:latest .

# Tag for your registry (replace with your registry)
docker tag url-previewer:latest your-registry.com/url-previewer:latest

# Push to registry
docker push your-registry.com/url-previewer:latest
```

### Environment Variables

If you need to configure environment variables, pass them when running:

```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  url-previewer
```

## What's Included

The Dockerfile uses a **multi-stage build** for optimal image size:

1. **deps stage**: Installs dependencies
2. **builder stage**: Builds the Next.js application
3. **runner stage**: Creates minimal production image with only necessary files

The final image:
- Uses Alpine Linux for minimal size (~150MB)
- Runs as non-root user for security
- Includes only production dependencies
- Uses Next.js standalone output for optimal performance

## Troubleshooting

### Manifest Format Error on DigitalOcean/Older Docker

If you see this error:
```
mediaType in manifest should be 'application/vnd.docker.distribution.manifest.v2+json' 
not 'application/vnd.oci.image.manifest.v1+json'
```

This means your Docker daemon is outdated and doesn't support OCI image manifests. Here are your options:

#### Option 1: Update Docker (Recommended)
```bash
# SSH into your DigitalOcean droplet
sudo apt-get update
sudo apt-get install --only-upgrade docker-ce docker-ce-cli containerd.io

# Verify the version (should be 20.10+ or newer)
docker --version
```

#### Option 2: Enable Experimental Features
Add this to `/etc/docker/daemon.json`:
```json
{
  "experimental": true
}
```

Then restart Docker:
```bash
sudo systemctl restart docker
```

#### Option 3: Use Docker Buildx with Platform Flag
```bash
docker buildx build --platform linux/amd64 -t url-previewer .
```

#### Option 4: Pull Image Manually First
Sometimes pulling the base image separately helps:
```bash
docker pull node:20-alpine
docker build -t url-previewer .
```

### Port Already in Use
If port 3000 is already in use, map to a different port:
```bash
docker run -p 8080:3000 url-previewer
```

### View Logs
```bash
docker logs <container-id>
```

### Stop Container
```bash
docker stop <container-id>
```
