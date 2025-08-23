import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerConfig from '../src/swagger/config';

const baseDir = path.join(__dirname, '..', 'src', 'routes');

function processExamples(obj) {
  if (obj && typeof obj === 'object') {
    if (obj.examples && typeof obj.examples === 'object') {
      for (const key of Object.keys(obj.examples)) {
        const ex = obj.examples[key];
        if (ex && typeof ex === 'object') {
          if ('$ref' in ex && typeof ex.$ref === 'string') {
            if (!ex.$ref.startsWith('#/')) {
              const refPath = path.resolve(baseDir, ex.$ref);
              const data = JSON.parse(fs.readFileSync(refPath, 'utf8'));
              obj.examples[key] = { value: data };
            }
          } else if (!('value' in ex)) {
            obj.examples[key] = { value: ex };
          }
        }
      }
    }
    for (const val of Object.values(obj)) {
      processExamples(val);
    }
  }
}

const outputPath = path.join(baseDir, 'swagger.json');
const spec = swaggerJsdoc(swaggerConfig);
processExamples(spec);
fs.writeFileSync(outputPath, JSON.stringify(spec, null, 2));

try {
  execSync(`npx swagger-cli validate ${outputPath}`, { stdio: 'inherit' });
} finally {
  fs.unlinkSync(outputPath);
}

