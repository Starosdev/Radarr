import { readdirSync, statSync } from 'fs';
import path from 'path';
import { defineConfig, Plugin } from 'vitest/config';

const srcDir = path.resolve(__dirname, 'src');

// Generate aliases for all top-level directories in src/ so that
// bare imports like 'App/Foo' resolve to 'frontend/src/App/Foo'.
const srcAliases: Record<string, string> = {};

for (const entry of readdirSync(srcDir)) {
  const full = path.join(srcDir, entry);

  if (statSync(full).isDirectory() && entry !== 'node_modules') {
    srcAliases[entry] = full;
  }
}

// Vite plugin that intercepts CSS imports and returns an identity proxy
// module instead of processing the actual CSS. This avoids PostCSS
// compatibility issues and makes styles[key] return the key name.
function cssIdentityPlugin(): Plugin {
  return {
    name: 'css-identity-proxy',
    enforce: 'pre',
    resolveId(id) {
      if (id.endsWith('.css')) {
        // Use .js extension on virtual ID to prevent Vite's CSS plugin
        // from trying to process it with PostCSS.
        return `\0css-proxy-${id}.js`;
      }

      return null;
    },
    load(id) {
      if (id.startsWith('\0css-proxy-')) {
        return `export default new Proxy({}, {
  get(_, prop) {
    return typeof prop === 'string' ? prop : undefined;
  }
});`;
      }

      return null;
    },
  };
}

export default defineConfig({
  plugins: [cssIdentityPlugin()],
  resolve: {
    alias: {
      ...srcAliases,
      jquery: path.resolve(
        __dirname,
        '..',
        'node_modules/jquery/dist/jquery.min.js'
      ),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  test: {
    root: srcDir,
    environment: 'jsdom',
    globals: true,
    setupFiles: [path.resolve(__dirname, 'test/setup.ts')],
    include: ['**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['**/*.{ts,tsx}'],
      exclude: [
        '**/*.test.{ts,tsx}',
        '**/*.css.d.ts',
        '**/typings/**',
        '**/Shims/**',
        'index.ts',
      ],
    },
  },
});
