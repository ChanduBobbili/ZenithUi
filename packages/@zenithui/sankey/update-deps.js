import { readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))
const packageJsonPath = resolve(__dirname, "package.json")
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"))

// Fetch latest version of @zenithui/utils
import { execSync } from "node:child_process"
const latestVersion = execSync("npm show @zenithui/utils version")
  .toString()
  .trim()

// Update dependencies
if (packageJson.dependencies["@zenithui/utils"]?.startsWith("workspace:")) {
  packageJson.dependencies["@zenithui/utils"] = latestVersion
}

writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
console.log(`Updated @zenithui/utils to version ${latestVersion}`)
