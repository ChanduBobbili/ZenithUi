#!/usr/bin/env node

import readline from "readline"
import { execSync } from "child_process"
import fs from "fs"

// Utility function to create a readline interface
const createInterface = () =>
  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

// Utility function to prompt user input
const askQuestion = (question) => {
  return new Promise((resolve) => {
    const rl = createInterface()
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim().toLowerCase())
    })
  })
}

// Execute a shell command synchronously
const execCommand = (command, options = {}) => {
  try {
    execSync(command, { stdio: "inherit", ...options })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error(`Error executing : ${command}`)
    process.exit(1)
  }
}

// Detect the appropriate package manager
function detectPackageManager() {
  if (fs.existsSync("pnpm-lock.yaml")) return "pnpm"
  if (fs.existsSync("yarn.lock")) return "yarn"
  if (fs.existsSync("bun.lockb")) return "bun"
  return "npm"
}

// Prompt user for permission
const askPermission = async () => {
  const answer = await askQuestion(
    "Do you want to install the required packages? (y/n): ",
  )
  return answer.toLowerCase() === "y" || answer.toLowerCase() === "yes"
}

// Install package based on the detected package manager
function installPackages(p) {
  const packageManager = detectPackageManager()
  console.log(`📦 Installing using ${packageManager}...`)
  const installCommand = {
    npm: `npm install ${p}`,
    pnpm: `pnpm install ${p}`,
    yarn: `yarn add ${p}`,
    bun: `bun add ${p}`,
  }[packageManager]

  execCommand(installCommand)
  console.log("✅ Packages installed successfully!")
}

// Main execution flow
const main = async () => {
  console.log("\n🚀 Welcome to ZenithUI Day Picker CLI")
  console.log("------------------------------------------")

  if (await askPermission()) {
    installPackages()
  } else {
    console.log("❌ Installation cancelled.")
  }
}

main().catch(console.error)
