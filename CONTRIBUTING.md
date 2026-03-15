# Contributing

Thank you for your interest in contributing to Radarr! This is an actively maintained fork of the original [Radarr/Radarr](https://github.com/Radarr/Radarr) project.

## Before You Start

- Check [GitHub Issues](https://github.com/Starosdev/Radarr/issues) for existing issues and planned work
- For bug reports or feature requests, please open a GitHub issue first
- For large changes, please discuss your approach in an issue before starting work

## Branch Workflow

We use a Gitflow-style workflow:

- `master` - Production-ready code (protected)
- `develop` - Integration branch for features
- `feature/*` - New features
- `fix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

### Creating a PR

1. Fork the repository and create your branch from `develop`
2. Make meaningful commits, or squash them
3. Ensure all tests pass
4. Submit a PR to `develop` (never `master`, unless it is a hotfix)

## Code Style

- No emojis in code, commits, comments, or documentation
- Follow existing code patterns and formatting
- Backend: StyleCop analyzers enforced, 4-space indentation, `var` preferred, `_camelCase` for private fields
- Frontend: ESLint + Prettier (2-space indentation), StyleLint for CSS

Run linting before submitting frontend changes:

```bash
yarn lint --fix
yarn stylelint-linux   # macOS/Linux
```

## Project Structure

Radarr is a monorepo containing:
- C#/.NET 8.0 Backend (API, domain logic, data layer)
- React/TypeScript Frontend (SPA with Redux and SignalR)

The codebase uses the legacy `NzbDrone` namespace from its predecessor project. Project directories use `NzbDrone.*` but `.csproj` files are named `Radarr.*`.

# Development Setup

## Tools Required

- [.NET SDK 8.0](https://dotnet.microsoft.com/download) (see `global.json` for exact version)
- [Node.js 20.x](https://nodejs.org/) (Volta-managed)
- [Yarn 1.22.x](https://yarnpkg.com/) (included with Node 20+ via `corepack enable`)
- [Git](https://git-scm.com/downloads)
- Visual Studio 2022+, Rider, or VS Code

> Node 20.x is required. The application will not run on older versions (18.x, 16.x) or on 21.x due to dependency issues.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Build and run (see below)

# Building the Frontend

```bash
yarn install --frozen-lockfile
yarn start                        # Dev watch mode
yarn build                        # Production build
```

# Building the Backend

## Visual Studio / Rider

1. Open `src/Radarr.sln`
2. Set startup project to `Radarr.Console`, framework to `net8.0`
3. Build the solution
4. Run/Debug
5. Open http://localhost:7878

## Command Line

```bash
# Clean
dotnet clean src/Radarr.sln -c Debug

# Restore and build
dotnet msbuild -restore src/Radarr.sln -p:Configuration=Debug -p:Platform=Posix -t:PublishAllRids

# Run from output
./_output/Radarr
```

# Running Tests

Radarr uses NUnit for its test suite. Test assemblies are output to `_tests/`.

```bash
# Unit tests
./test.sh Linux Unit Test
./test.sh Mac Unit Test

# Integration tests
./test.sh Linux Integration Test

# With coverage
./test.sh Linux Unit Coverage

# Specific test project
dotnet test src/NzbDrone.Core.Test/Radarr.Core.Test.csproj

# Specific test by name
dotnet test src/NzbDrone.Core.Test/Radarr.Core.Test.csproj --filter "FullyQualifiedName~TestClassName"
```

We encourage writing unit tests for any backend code changes. We currently require 80% coverage on new code when submitting a PR.

# Contributing Code

- If you're adding a feature already listed in Issues, comment on it so work is not duplicated
- Rebase from `develop`, do not merge
- One feature/bug fix per pull request
- Add tests (unit/integration)
- Commit with unix line endings
- Use 4 spaces instead of tabs (backend), 2 spaces (frontend)
- Commits should use `New:` or `Fixed:` prefixes for non-maintenance changes
- Feel free to open a draft PR before work is complete so we can provide early feedback

# Translation

Radarr uses a self-hosted [Weblate](https://translate.servarr.com) instance for translations. Translation files are stored at `src/NzbDrone.Core/Localization`.

The English translation (`en.json`) is the source for all other translations and is managed in the GitHub repo.

## Adding Translation Strings

### Backend

```csharp
private readonly ILocalizationService _localizationService;

public IndexerCheck(ILocalizationService localizationService)
{
    _localizationService = localizationService;
}

var translated = _localizationService.GetLocalizedString("IndexerHealthCheckNoIndexers");
```

### Frontend

```js
import translate from 'Utilities/String/translate';

<div>
  {translate('UnableToAddANewIndexerPleaseTryAgain')}
</div>
```

> PRs for translation of log messages will not be accepted.
