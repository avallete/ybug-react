# Ybug-React Development Instructions

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

Ybug-react is a React TypeScript wrapper library for ybug.io (a feedback/bug reporting widget). It provides React components and hooks to easily integrate ybug.io into React applications.

## Working Effectively

### Initial Setup and Dependencies
- Install dependencies: `npm install` -- takes ~26 seconds. NEVER CANCEL.
- The repository has no complex environment setup or external dependencies beyond npm.

### Build and Development Commands
- Build the library: `npm run build` -- takes ~2 seconds. Compiles TypeScript to the `lib/` directory.
- Run tests: `npm test` -- takes ~1 second. Uses Jest with minimal test suite.
- Lint code: `npm run lint` -- takes ~1 second. Uses ESLint with TypeScript support. Shows TypeScript version warning (safe to ignore).
- Fix linting issues: `npm run lint:fix` -- takes ~1 second. Auto-fixes ESLint issues.
- Format code: `npm run format` -- takes ~1 second. Uses Prettier to format all source files.

### Publishing Commands (do not run manually)
- `npm run prepare` - Runs automatically on install, builds the library
- `npm run prepublishOnly` - Runs tests and linting before publishing
- `npm run preversion` - Runs linting before version bump
- `npm run version` - Formats code and commits changes
- `npm run postversion` - Pushes changes and tags

## Validation and Testing

### Always Run Before Committing
1. `npm run build` - Ensure TypeScript compilation succeeds
2. `npm test` - Ensure all tests pass
3. `npm run lint` - Ensure no linting errors
4. `npm run format` - Ensure consistent code formatting

### Key Validation Scenarios
Since this is a React library wrapper, validation involves:
- **Build validation**: Ensure TypeScript compiles cleanly to `lib/` directory
- **Type validation**: Verify `lib/index.d.ts` contains proper TypeScript declarations
- **Export validation**: Confirm library exports `YbugProvider`, `useYbugApi`, and types: `YbugApi`, `YbugSettings`, `SetUserType`, `YbugContextType`, `YbugProviderProps`
- **Test validation**: Run the test suite (currently minimal)
- **Integration validation**: The library loads external scripts from ybug.io and provides React context

### Manual Testing Notes
- This library loads external scripts from ybug.io and requires a valid ybugId
- To test integration, you would need to create a demo React app and test with a real ybug.io account
- The main functionality involves script loading and React context management

## Repository Structure and Key Files

### Source Code
- `src/index.tsx` - Main library file containing YbugProvider component and useYbugApi hook
- `src/ybug.d.ts` - TypeScript type definitions for ybug.io API
- `src/__tests__/index.test.ts` - Test file (currently contains only placeholder test)

### Configuration Files
- `package.json` - npm package configuration and scripts
- `tsconfig.json` - TypeScript compiler configuration (outputs to `lib/`)
- `.eslintrc` - ESLint configuration for TypeScript and Jest
- `.prettierrc` - Prettier formatting configuration
- `jest.config.js` - Jest testing framework configuration
- `.gitignore` - Excludes `node_modules/`, `lib/`, and common build artifacts

### Build Output
- `lib/index.js` - Compiled JavaScript (CommonJS format)
- `lib/index.d.ts` - TypeScript declaration files for consumers

## Common Development Tasks

### Rapid Development Workflow
For quick iteration during development:
1. `npm run build && npm test && npm run lint` - Full validation cycle (~5 seconds total)
2. `npm run lint:fix && npm run format` - Fix code style issues automatically

### Adding New Features
1. Edit source files in `src/`
2. Run `npm run build` to compile TypeScript
3. Run `npm test` to ensure tests pass
4. Run `npm run lint` to check code quality
5. Run `npm run format` to maintain consistent formatting

### Fixing Bugs
1. Add or update tests in `src/__tests__/`
2. Make minimal changes to source code
3. Validate with the full build/test/lint cycle

### Debugging Build Issues
- If TypeScript compilation fails, check `tsconfig.json` configuration
- If exports are missing, verify the export statements in `src/index.tsx`
- If types are incorrect, check type definitions in `src/ybug.d.ts`
- Use `node -e "console.log(require('./lib/index.js'))"` to inspect built exports

### Updating Dependencies
- Use `npm install <package>` for runtime dependencies (avoid this - library should have minimal deps)
- Use `npm install -D <package>` for development dependencies
- Update peerDependencies in package.json for React version compatibility

## Important Notes

### Known Warnings (Safe to Ignore)
- ESLint shows TypeScript version warning: "WARNING: You are currently running a version of TypeScript which is not officially supported" - this is expected and does not affect functionality.

### Library Design
- This is a wrapper library that loads external scripts from ybug.io
- It provides React-friendly API via Context and hooks
- Main exports: `YbugProvider` (React component) and `useYbugApi` (React hook)
- Library supports React 16, 17, and 18 via peerDependencies

### TypeScript Support
- Full TypeScript support with exported type definitions
- Types are defined in `src/ybug.d.ts` and exported from main module
- Build process generates declaration files in `lib/` for consumers

### Testing Limitations
- Current test suite is minimal (placeholder test only)
- Real integration testing requires external ybug.io service
- Focus on ensuring TypeScript compilation and basic functionality

### Code Quality
- ESLint enforces TypeScript and Jest best practices
- Prettier maintains consistent code formatting
- Pre-commit hooks run via npm scripts to ensure quality

### Build Process
- TypeScript compiler (tsc) handles all compilation
- No complex build tools or bundlers required
- Output is CommonJS format for npm distribution
- Declaration files are automatically generated

### Common Commands Output Reference

#### Repository Root Files
```
.eslintignore    jest.config.js    package.json     tsconfig.json
.eslintrc        LICENSE.md        .prettierrc      README.md
.gitignore       package-lock.json src/             lib/
```

#### Source Directory Structure
```
src/
├── __tests__/
│   └── index.test.ts
├── index.tsx
└── ybug.d.ts
```

#### Build Output Structure
```
lib/
├── index.d.ts
└── index.js
```