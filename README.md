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
