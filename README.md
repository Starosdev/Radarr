# Radarr

[![Build Status](https://dev.azure.com/Radarr/Radarr/_apis/build/status/Radarr.Radarr?branchName=develop)](https://dev.azure.com/Radarr/Radarr/_build/latest?definitionId=1&branchName=develop)
[![GitHub license](https://img.shields.io/github/license/Starosdev/Radarr.svg?style=flat-square)](https://github.com/Starosdev/Radarr/blob/develop/LICENSE)
[![GitHub release](http://img.shields.io/github/release/Starosdev/Radarr.svg?style=flat-square)](https://github.com/Starosdev/Radarr/releases)
[![Docker Pulls](https://img.shields.io/docker/pulls/linuxserver/radarr.svg?style=flat-square)](https://wiki.servarr.com/radarr/installation/docker)

**A movie collection manager for Usenet and BitTorrent users.**

Radarr monitors multiple RSS feeds for new movies and interfaces with download clients and indexers to grab, sort, and rename them. It can also automatically upgrade the quality of existing files in your library when a better format becomes available.

Note that only one type of a given movie is supported. If you want both a 4K and 1080p version of a given movie, you will need multiple instances.

# Why This Fork?

This fork is an independent build of Radarr maintained by Starosdev. It tracks upstream development while adding our own changes for error tracking, testing infrastructure, and build tooling. The upstream [Radarr/Radarr](https://github.com/Radarr/Radarr) project remains active and is the canonical source for the wider community.

Full credit for the original project goes to the [Radarr team](https://github.com/Radarr). This fork builds on their work with our own direction and priorities.

| | Upstream | This Fork |
|---|---|---|
| **Repository** | [Radarr/Radarr](https://github.com/Radarr/Radarr) | [Starosdev/Radarr](https://github.com/Starosdev/Radarr) |
| **Error Tracking** | Upstream Sentry | Self-hosted Sentry (sentry.io) |
| **Infrastructure** | Servarr ecosystem | Independent |
| **Status** | Active | Actively maintained |

### What's Changed in This Fork

- **Sentry DSN replacement** -- Error tracking points to our own Sentry project instead of upstream
- **Frontend test infrastructure** -- Added Vitest for frontend testing
- **Independent CI/CD** -- Working toward our own build and release pipeline

# Major Features

- Adding new movies with lots of information, such as trailers, ratings, etc.
- Support for major platforms: Windows, Linux, macOS, Raspberry Pi, etc.
- Can watch for better quality of the movies you have and do an automatic upgrade (e.g. from DVD to Blu-Ray)
- Automatic failed download handling will try another release if one fails
- Manual search so you can pick any release or to see why a release was not downloaded automatically
- Full integration with SABnzbd and NZBGet
- Automatically searching for releases as well as RSS Sync
- Automatically importing downloaded movies
- Recognizing Special Editions, Director's Cut, etc.
- Identifying releases with hardcoded subs
- Identifying releases with AKA movie names
- SABnzbd, NZBGet, QBittorrent, Deluge, rTorrent, Transmission, uTorrent, and other download clients are supported and integrated
- Full integration with Kodi and Plex (notifications, library updates)
- Importing metadata such as trailers or subtitles
- Adding metadata such as posters and information for Kodi and others to use
- Advanced customization for profiles, such that Radarr will always download the copy you want

# Getting Started

## Docker

The easiest way to run Radarr is with Docker via the [LinuxServer.io image](https://docs.linuxserver.io/images/docker-radarr):

```bash
docker run -d \
  --name radarr \
  -p 7878:7878 \
  -v /path/to/config:/config \
  -v /path/to/movies:/movies \
  -v /path/to/downloads:/downloads \
  --restart unless-stopped \
  lscr.io/linuxserver/radarr:latest
```

## Manual Installation

See the [Servarr Wiki](https://wiki.servarr.com/radarr/installation) for detailed installation instructions across all supported platforms.

## Building from Source

### Prerequisites

- .NET SDK 8.0
- Node.js 20.x (Volta-managed)
- Yarn 1.22.x

### Backend

```bash
dotnet build src/Radarr.sln
```

### Frontend

```bash
yarn install --frozen-lockfile
yarn build
```

### Full Build (All Platforms)

```bash
./build.sh --all
```

### Running Tests

```bash
# Unit tests
./test.sh Linux Unit Test

# Integration tests
./test.sh Linux Integration Test

# Specific test project
dotnet test src/NzbDrone.Core.Test/Radarr.Core.Test.csproj
```

# Architecture

Radarr is built with a C#/.NET 8.0 backend and a React/TypeScript frontend.

- **Backend**: ASP.NET Core REST API, custom SQLite ORM, repository pattern, dependency injection
- **Frontend**: React 18, Redux, CSS Modules (PostCSS), Webpack, SignalR for real-time updates
- **Database**: SQLite with sequential migrations (no Entity Framework)

The codebase uses the legacy `NzbDrone` namespace from its predecessor project. Project directories use `NzbDrone.*` but `.csproj` files are named `Radarr.*`.

For more details, see the [CLAUDE.md](CLAUDE.md) which contains a full architecture breakdown.

# Contributing

We welcome contributions. Please see [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

Issues and feature requests should be filed at [Starosdev/Radarr](https://github.com/Starosdev/Radarr/issues).

# Credits

**Original Project:** [Radarr Team](https://github.com/Radarr) -- Built Radarr and the broader Servarr ecosystem.

**Fork Maintainer:** [@Starosdev](https://github.com/Starosdev) -- Maintaining this fork with independent development and infrastructure.

# License

- [GNU GPL v3](http://www.gnu.org/licenses/gpl.html)
- Copyright 2010-2026
