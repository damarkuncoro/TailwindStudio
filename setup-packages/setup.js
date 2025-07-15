const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, '..', 'packages');
const pkgTemplate = require('./package.template.json');
const tsconfig = fs.readFileSync(path.join(__dirname, 'tsconfig.template.json'), 'utf-8');
const dependencyMap = require('./dependency-map.json');

for (const dir of fs.readdirSync(basePath)) {
  const fullPath = path.join(basePath, dir);
  if (!fs.lstatSync(fullPath).isDirectory()) continue;

  const pkgJsonPath = path.join(fullPath, 'package.json');
  const tsconfigPath = path.join(fullPath, 'tsconfig.json');
  const srcPath = path.join(fullPath, 'src');
  const indexTsPath = path.join(srcPath, 'index.ts');

  const name = `@tailwind-studio/${dir}`;
  const dependencies = {};
  const deps = dependencyMap[dir] || [];

  for (const dep of deps) {
    dependencies[`@tailwind-studio/${dep}`] = "workspace:*";
  }

  const pkg = {
    ...pkgTemplate,
    name,
    dependencies,
  };

  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2));
  console.log(`📦 Created package.json for ${name}`);

  fs.writeFileSync(tsconfigPath, tsconfig);
  console.log(`🛠  Wrote tsconfig.json for ${name}`);

  fs.mkdirSync(srcPath, { recursive: true });
  if (!fs.existsSync(indexTsPath)) {
    fs.writeFileSync(indexTsPath, `// ${name} entry\n`);
    console.log(`📝 Created src/index.ts for ${name}`);
  }

  console.log('---');
}
