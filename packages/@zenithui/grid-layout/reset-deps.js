import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageJsonPath = resolve(__dirname, 'package.json')
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))

if (packageJson.dependencies['@zenithui/utils']) {
  packageJson.dependencies['@zenithui/utils'] = 'workspace:*'
}

writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
console.log('Restored @zenithui/utils to workspace:*')
