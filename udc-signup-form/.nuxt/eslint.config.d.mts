import type { FlatConfigComposer } from "../node_modules/.pnpm/eslint-flat-config-utils@2.0.1/node_modules/eslint-flat-config-utils/dist/index.mjs"
import { defineFlatConfigs } from "../node_modules/.pnpm/@nuxt+eslint-config@1.4.0_@vue+compiler-sfc@3.5.14_eslint@9.27.0_jiti@2.4.2__typescript@5.8.3/node_modules/@nuxt/eslint-config/dist/flat.mjs"
import type { NuxtESLintConfigOptionsResolved } from "../node_modules/.pnpm/@nuxt+eslint-config@1.4.0_@vue+compiler-sfc@3.5.14_eslint@9.27.0_jiti@2.4.2__typescript@5.8.3/node_modules/@nuxt/eslint-config/dist/flat.mjs"

declare const configs: FlatConfigComposer
declare const options: NuxtESLintConfigOptionsResolved
declare const withNuxt: typeof defineFlatConfigs
export default withNuxt
export { withNuxt, defineFlatConfigs, configs, options }