import { readFileSync, writeFileSync } from "fs"
import { resolve } from "path"
import { fileURLToPath } from "url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))
// Locate package.json inside @zenithui/day-picker
const packageJsonPath = resolve(__dirname, "./../package.json")
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"))

// Fetch latest version of @zenithui/utils
import { execSync } from "child_process"
const latestVersion = execSync("npm show @zenithui/utils version")
  .toString()
  .trim()

// Update dependencies
if (packageJson.dependencies["@zenithui/utils"]?.startsWith("workspace:")) {
  packageJson.dependencies["@zenithui/utils"] = latestVersion
}

writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
console.log(`Updated @zenithui/utils to version ${latestVersion}`)
