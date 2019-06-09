/* eslint-disable no-console */
const aws = require('aws-sdk');

async function main() {
  const s3 = new aws.S3();

  function uploadArtifact(artifact, options) {
    return new Promise(async (resolve, reject) => {
      s3.upload(
        {
          ...options,
          Body: JSON.stringify(artifact, null, 2),
          ContentType: 'application/json',
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        },
      );
    });
  }

  console.log(process.env);
  /* 
  const branch = process.

  let build;
  try {
    build = await loadBuild(desiredBuild);
  } catch (err) {
    return { statusCode: 404, body: JSON.stringify(String(err)) };
  }

  if (build.branch.startsWith('pull/')) {
    return {
      statusCode: 403,
      body: JSON.stringify('size snapshots are only permitted for non-fork pushes'),
    };
  }


  try {
    function upload(revision) {
      const uploadOptions = {
        Bucket: 'eps1lon-material-ui',
        Key: `artifacts/${build.branch}/${revision}/size-snapshot.json`,
      };
      return uploadArtifact(snapshotArtifact, uploadOptions);
    }

    // save snapshot under the commit id as well as imitating a symlink `latest`
    // to the commit id
    const [uploaded] = await Promise.all([upload(build.vcs_revision), upload('latest')]);

    return {
      statusCode: 200,
      body: JSON.stringify(uploaded.Location),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
    };
  } */
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
