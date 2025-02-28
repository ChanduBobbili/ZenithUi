#!/usr/bin/env node

const { program } = require("commander")
const inquirer = require("inquirer")
const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// List of ZenithUI packages
const PACKAGES = ["zenithui-day-picker", "zenithui-toast"]

// Detect package manager
function detectPackageManager() {
  if (fs.existsSync("pnpm-lock.yaml")) return "pnpm"
  if (fs.existsSync("yarn.lock")) return "yarn"
  if (fs.existsSync("bun.lockb")) return "bun"
  return "npm" // Default to npm
}

// Install packages using the detected package manager
function installPackages(packages) {
  const packageManager = detectPackageManager()
  console.log(`📦 Installing using ${packageManager}...`)

  const installCommand = {
    npm: `npm install ${packages.join(" ")}`,
    pnpm: `pnpm add ${packages.join(" ")}`,
    yarn: `yarn add ${packages.join(" ")}`,
    bun: `bun add ${packages.join(" ")}`,
  }[packageManager]

  try {
    execSync(installCommand, { stdio: "inherit" })
    console.log("✅ Packages installed successfully!")
  } catch (error) {
    console.error("❌ Failed to install packages:", error.message)
  }
}

// Validate Tailwind CSS and Import Alias
function validateProjectSetup() {
  const tailwindConfigPath = path.join(process.cwd(), "tailwind.config.js")
  const hasTailwind = fs.existsSync(tailwindConfigPath)

  const tsConfigPath = path.join(process.cwd(), "tsconfig.json")
  const hasAlias =
    fs.existsSync(tsConfigPath) &&
    JSON.parse(fs.readFileSync(tsConfigPath, "utf-8")).compilerOptions?.paths?.[
      "@/*"
    ]

  console.log(
    hasTailwind
      ? "✅ Tailwind CSS detected!"
      : "⚠️ Warning: Tailwind CSS not found.",
  )
  console.log(
    hasAlias
      ? "✅ Import alias '@/*' is set up!"
      : "⚠️ Warning: Import alias '@/*' is missing.",
  )
}

// **INIT COMMAND**
program
  .command("init")
  .description("Select and install ZenithUI packages")
  .action(async () => {
    const { selectedPackages } = await inquirer.prompt([
      {
        type: "checkbox",
        name: "selectedPackages",
        message: "Select packages to install:",
        choices: PACKAGES,
      },
    ])

    if (selectedPackages.length === 0) {
      console.log("❌ No packages selected. Exiting...")
      return
    }

    installPackages(selectedPackages)
  })

// **CREATE COMMAND**
program
  .command("create")
  .description("Generate a component")
  .action(async () => {
    // Step 1: Select a package
    const { selectedPackage } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedPackage",
        message: "Select a package to create a component for:",
        choices: PACKAGES,
      },
    ])

    // Step 2: Select variant (if applicable)
    let variant = null
    if (selectedPackage === "zenithui-day-picker") {
      const response = await inquirer.prompt([
        {
          type: "list",
          name: "variant",
          message: "Select a variant:",
          choices: ["with-popover", "without-popover"],
        },
      ])
      variant = response.variant
    }

    // Step 3: Select language (JS or TS)
    const { codeFormat } = await inquirer.prompt([
      {
        type: "list",
        name: "codeFormat",
        message: "Select a language format:",
        choices: ["JavaScript", "TypeScript"],
      },
    ])

    // Step 4: Validate Tailwind CSS and Import Alias
    validateProjectSetup()

    // Step 5: Copy Component from CLI `components/` folder
    const componentsDir = path.join(__dirname, "../components")
    const targetDir = path.join(process.cwd(), "src", "components")

    const fileExt = codeFormat === "TypeScript" ? "tsx" : "jsx"
    const variantPath = variant ? `${variant}.${fileExt}` : `toast.${fileExt}`
    const sourcePath = path.join(
      componentsDir,
      selectedPackage,
      codeFormat.toLowerCase(),
      variantPath,
    )
    const destPath = path.join(targetDir, variantPath)

    if (!fs.existsSync(sourcePath)) {
      console.error(`❌ Component template not found: ${sourcePath}`)
      return
    }

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    fs.copyFileSync(sourcePath, destPath)
    console.log(`✅ Component created: src/components/${variantPath}`)
  })

program.parse(process.argv)
