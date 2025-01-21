## ZenithUi Mono-Repo

### Introduction

ZenithUi is a mono-repo containing multiple packages for building user interfaces. This repository aims to provide a cohesive set of tools and components to streamline the development process. The monorepo is built using Turborepo and pnpm.

### Directory Structure

- **apps**: Contains applications for testing and documentation.
  - **test-app**: An application for testing the packages.
  - **doc-app**: An application for documentation purposes.
- **packages**: Contains all UI libraries that are to be published on npm.

### Getting Started

1. **Clone the repository**:
   ```sh
   git clone https://github.com/ChanduBobbili/ZenithUi.git
   ```
2. **Install dependencies**:
   ```sh
   cd ZenithUi
   pnpm install
   ```
3. **Build the packages**:
   ```sh
   pnpm run build
   ```

### Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
