import { readFileSync, writeFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

// Correctly resolve __dirname
const __dirname = dirname(fileURLToPath(import.meta.url))

// Locate package.json inside @zenithui/day-picker
const packageJsonPath = resolve(__dirname, "./../package.json")
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"))

// Reset @zenithui/utils to "workspace:*"
if (packageJson.dependencies["@zenithui/utils"]) {
  packageJson.dependencies["@zenithui/utils"] = "workspace:*"
}

// Write updated package.json
writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
console.log(`Restored @zenithui/utils to workspace:*`)
