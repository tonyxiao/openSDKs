# Contributing new SDKs

Welcome to `opensdks` - a comprehensive suite of type-safe SDKs built on a unified runtime (`@opensdks/core`). Our goal is to provide a simple, extensible, and delightful development experience.

## Quick Start

1. **Installation**: Start by installing the package in your project:
   ```bash
   pnpm install
   ```
2. **Examples**: For implementation examples, see `docs/example.ts`.
3. **Existing SDKs**: Browse the `sdks` directory for ready-to-use SDK adapters like `sdk-apollo`, `sdk-discord`, `sdk-github`, and `sdk-slack`.

## Creating a New SDK Adapter

Creating a new SDK adapter in `opensdks` follows a standardized process, leveraging the existing structure of adapters like `sdk-slack`.

### Step-by-Step Guide

1. **Set Up Directory**:
   Create a new directory for your SDK, for example, `sdk-openai`:
   ```bash
   mkdir sdk-openai
   ```

2. **Prepare `package.json`**:
   Copy `package.json` from an existing SDK and adjust it for your SDK. Key modifications include the package name and scripts for downloading and generating the OpenAPI spec. Remember to include dependencies like `@opensdks/core` and `openapi-typescript`.

3. **Install Dependencies**:
   Run:
   ```bash
   pnpm install
   ```

4. **Download and Generate OpenAPI Specs**:
   Execute the download and generate scripts specified in `package.json`:
   ```bash
   pnpm run download
   pnpm run generate
   ```

5. **Develop `index.ts`**:
   Use an existing SDK's `index.ts` as a template. Update the imports, types, and SDK definition to reflect your new SDK's functionality and structure.

6. **Testing Your SDK**:
   Test your new SDK by writing a simple script that uses its functions, ensuring everything works as expected.

### Additional Notes

- **OpenAPI Specifications**: Ensure your SDK's OpenAPI spec is accurate and up-to-date.
- **TypeScript Types**: Update TypeScript types according to your SDK's specific requirements.
- **Documentation**: Document your SDK's functions and usage for ease of understanding.

## Conclusion

By following these steps, you can seamlessly create and integrate new SDK adapters into `opensdks`. For more detailed examples and guidance, refer to the existing SDKs in the `sdks` folder and the usage examples in `docs/example.ts`.

---

Feel free to specify any particular aspects you'd like to be included or expanded upon in this README.