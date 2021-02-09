const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
  try {
    const token = core.getInput('token', { required: true });

    const owner = github.context.payload.repository.owner.name;
    const repo = github.context.payload.repository.name;
    const run_id = github.context.runId;

    const run = await github
      .getOctokit(token)
      .actions
      .getWorkflowRun({ owner, repo, run_id });

    core.debug(JSON.stringify(run, null, 2));

    core.debug(JSON.stringify({
      owner,
      repo,
      run_id,
    }, null, 2));

    const isFirstRun = run.created_at === run.updated_at;
    core.setOutput('is-first-run', isFirstRun);

    const failFast = core.getInput('fail-fast', { required: false });
    if (!isFirstRun && failFast === 'true') {
      core.setFailed('This is a re-run, and "fail-fast" is set.');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})();
