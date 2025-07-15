import { defineConfig, mergeConfig } from 'vitest/config';
import baseConfig from '../../vitest.workspace.config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    // override lokal jika diperlukan
  })
);
