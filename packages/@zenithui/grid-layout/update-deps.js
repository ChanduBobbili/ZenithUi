import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageJsonPath = resolve(__dirname, 'package.json')
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))

const latestVersion = execSync('npm show @zenithui/utils version').toString().trim()

if (packageJson.dependencies['@zenithui/utils']?.startsWith('workspace:')) {
  packageJson.dependencies['@zenithui/utils'] = latestVersion
}

writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
console.log(`Updated @zenithui/utils to version ${latestVersion}`)
