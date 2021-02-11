# actions-is-first-run

This action determines if the currently executing run is the first run for a particular commit, or
if it is a re-run. It also provides an option to fail immediately if it is not the first run.

## Usage

```yaml
- uses: colpal/actions-is-first-run@v1
  with:
    # If set to "true", will mark the workflow as failed if the run is a re-run.
    # Default: false
    fail-fast: ''

    # The token to use to authenticate to the GitHub API
    # Default: ${{ github.token }}
    token: ''

    # The amount of time that must past since the initial workflow run for subsequent runs to be
    # considered re-runs.
    # Default: 1m
    threshold: ''
```

## Examples

### Fail Fast

```yaml
'on': push

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: colpal/actions-is-first-run@v1
        with:
          fail-fast: true

      # If we get this far, we know this is the first run of the workflow
      - uses: actions/checkout@v2

      # ...
```

### Conditional Steps

```yaml
'on': push

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - id: first
        uses: colpal/actions-is-first-run@v1

      # ...

      - if: steps.first.outputs.is-first-run
        run: ./script-that-should-not-run-on-reruns.sh
```

### Allow Re-runs for a Limited Time

```yaml
'on': push

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      # Allow re-runs for up to 2 hours after the first run starts
      - uses: colpal/actions-is-first-run@v1
        with:
          threshold: 120m
          fail-fast: true

      # If we get this far, we know this run is up to 2 hours after the first
      - uses: actions/checkout@v2

      # ...
```
