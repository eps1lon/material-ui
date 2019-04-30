const fetch = require('node-fetch');
const { uniq: unique } = require('lodash');
const listChangedFiles = require('./listChangedFiles');

const { GITHUB_SHA, GITHUB_EVENT_PATH, GITHUB_TOKEN, GITHUB_WORKSPACE } = process.env;
const event = require(GITHUB_EVENT_PATH);
const { repository } = event;
const {
  owner: { login: owner },
} = repository;
const { name: repo } = repository;

const checkName = 'Preview Links';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/vnd.github.antiope-preview+json',
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  'User-Agent': 'preview-links',
};

async function createCheck() {
  const body = {
    name: checkName,
    head_sha: GITHUB_SHA,
    status: 'in_progress',
    started_at: new Date(),
  };

  const endpoint = `https://api.github.com/repos/${owner}/${repo}/check-runs`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const { id } = await response.json();
  return id;
}

async function updateCheck(id, conclusion, output) {
  const body = {
    name: checkName,
    head_sha: GITHUB_SHA,
    status: 'completed',
    completed_at: new Date(),
    conclusion,
    output,
  };

  await fetch(`https://api.github.com/repos/${owner}/${repo}/check-runs/${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body),
  });
}

function exitWithError(err) {
  console.error('Error', err.stack);
  if (err.data) {
    console.error(err.data);
  }
  process.exit(1);
}

function docPageAffectedBy(filePath) {
  return 'demos/dialogs';
}

async function run() {
  const id = await createCheck();
  console.log(GITHUB_WORKSPACE);
  try {
    const changedFiles = await listChangedFiles(event.pullRequest);
    const docsPages = unique(changedFiles.map(docPageAffectedBy).filter(Boolean));
    const text = docsPages.map(page => `https://next.material-ui.com/${page}`).join('');
    const output = {
      title: checkName,
      summary: '',
      text,
    };
    await updateCheck(id, 'success', output);
  } catch (err) {
    await updateCheck(id, 'failure');
    exitWithError(err);
  }
}

run().catch(exitWithError);
