const fse = require('fs-extra');
const path = require('path');

const [leftStatsPath, rightStatsPath, assetName] = process.argv.slice(2);

function getChunks(stats) {
  return stats.namedChunkGroups[assetName].chunks.map(chunkId =>
    stats.chunks.find(chunk => chunk.id === chunkId),
  );
}

function collectModules(stats) {
  return getChunks(stats, assetName)
    .map(chunk => chunk.modules)
    .reduce((acc, modules) => acc.concat(modules));
}

function toMap(key) {
  return list => new Map(list.map(item => [item[key], item]));
}

function consoleModuleTable(modules) {
  console.table(modules.map(module => ({ name: module.name })));
}

async function run() {
  const [leftModules, rightModules] = await Promise.all(
    [leftStatsPath, rightStatsPath].map(statsPath =>
      fse.readJSON(path.resolve(process.cwd(), statsPath)),
    ),
  ).then(stats => stats.map(collectModules));
  const [leftModulesMap, rightModulesMap] = [leftModules, rightModules].map(toMap('name'));

  console.log(`left: ${leftModules.length} modules`);
  console.log(`right: ${rightModules.length} modules`);

  const removedModules = leftModules.filter(module => !rightModulesMap.has(module.name));
  const addedModules = rightModules.filter(module => !leftModulesMap.has(module.name));

  console.log('removed overview');
  consoleModuleTable(removedModules);
  console.log('added overview');
  consoleModuleTable(addedModules);
}

run().catch(err => {
  console.log('usage diff-stats path-to-old-stats.json path-to-new-stats.json assetName')
  console.error(err);
  process.exit(1);
});
