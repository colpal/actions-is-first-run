const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
  try {
    const token = core.getInput('token', { required: true });

    core.debug(JSON.stringify(github, null, 2));

    const owner = github.context.owner.name;
    const repo = github.context.repository.name;
    const { run_id } = github;

    const { created_at, updated_at } = await github
      .getOctokit(token)
      .actions
      .getWorkflowRun({ owner, repo, run_id });

    core.debug(JSON.stringify({
      owner,
      repo,
      run_id,
      created_at,
      updated_at,
    }, null, 2));

    const isFirstRun = created_at === updated_at;
    core.setOutput('is-first-run', isFirstRun);

    const failFast = core.getInput('fail-fast', { required: false });
    if (!isFirstRun && failFast === 'true') {
      core.setFailed('This is a re-run, and "fail-fast" is set.');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})();
