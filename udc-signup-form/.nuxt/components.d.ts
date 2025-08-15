
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'DatePicker': typeof import("../components/DatePicker.vue")['default']
    'FormAccordion': typeof import("../components/FormAccordion.vue")['default']
    'FormCountrySelect': typeof import("../components/FormCountrySelect.vue")['default']
    'FormFile': typeof import("../components/FormFile.vue")['default']
    'FormInput': typeof import("../components/FormInput.vue")['default']
    'FormPhone': typeof import("../components/FormPhone.vue")['default']
    'FormRadio': typeof import("../components/FormRadio.vue")['default']
    'FormSignature': typeof import("../components/FormSignature.vue")['default']
    'HeaderElement': typeof import("../components/HeaderElement.vue")['default']
    'LanguageSelector': typeof import("../components/LanguageSelector.vue")['default']
    'MultiStepForm': typeof import("../components/MultiStepForm.vue")['default']
    'SuccessFailureDisplay': typeof import("../components/SuccessFailureDisplay.vue")['default']
    'TcLayout': typeof import("../components/TcLayout.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'NuxtLinkLocale': typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.5.4_@vue+compiler-dom@3.5.14_eslint@9.27.0_jiti@2.4.2__magicast@0.3.5_ro_a52f77fb919fa4a86b7fc15c44846522/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
    'SwitchLocalePathLink': typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.5.4_@vue+compiler-dom@3.5.14_eslint@9.27.0_jiti@2.4.2__magicast@0.3.5_ro_a52f77fb919fa4a86b7fc15c44846522/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
    'NuxtPage': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyDatePicker': LazyComponent<typeof import("../components/DatePicker.vue")['default']>
    'LazyFormAccordion': LazyComponent<typeof import("../components/FormAccordion.vue")['default']>
    'LazyFormCountrySelect': LazyComponent<typeof import("../components/FormCountrySelect.vue")['default']>
    'LazyFormFile': LazyComponent<typeof import("../components/FormFile.vue")['default']>
    'LazyFormInput': LazyComponent<typeof import("../components/FormInput.vue")['default']>
    'LazyFormPhone': LazyComponent<typeof import("../components/FormPhone.vue")['default']>
    'LazyFormRadio': LazyComponent<typeof import("../components/FormRadio.vue")['default']>
    'LazyFormSignature': LazyComponent<typeof import("../components/FormSignature.vue")['default']>
    'LazyHeaderElement': LazyComponent<typeof import("../components/HeaderElement.vue")['default']>
    'LazyLanguageSelector': LazyComponent<typeof import("../components/LanguageSelector.vue")['default']>
    'LazyMultiStepForm': LazyComponent<typeof import("../components/MultiStepForm.vue")['default']>
    'LazySuccessFailureDisplay': LazyComponent<typeof import("../components/SuccessFailureDisplay.vue")['default']>
    'LazyTcLayout': LazyComponent<typeof import("../components/TcLayout.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyNuxtLinkLocale': LazyComponent<typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.5.4_@vue+compiler-dom@3.5.14_eslint@9.27.0_jiti@2.4.2__magicast@0.3.5_ro_a52f77fb919fa4a86b7fc15c44846522/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
    'LazySwitchLocalePathLink': LazyComponent<typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.5.4_@vue+compiler-dom@3.5.14_eslint@9.27.0_jiti@2.4.2__magicast@0.3.5_ro_a52f77fb919fa4a86b7fc15c44846522/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const DatePicker: typeof import("../components/DatePicker.vue")['default']
export const FormAccordion: typeof import("../components/FormAccordion.vue")['default']
export const FormCountrySelect: typeof import("../components/FormCountrySelect.vue")['default']
export const FormFile: typeof import("../components/FormFile.vue")['default']
export const FormInput: typeof import("../components/FormInput.vue")['default']
export const FormPhone: typeof import("../components/FormPhone.vue")['default']
export const FormRadio: typeof import("../components/FormRadio.vue")['default']
export const FormSignature: typeof import("../components/FormSignature.vue")['default']
export const HeaderElement: typeof import("../components/HeaderElement.vue")['default']
export const LanguageSelector: typeof import("../components/LanguageSelector.vue")['default']
export const MultiStepForm: typeof import("../components/MultiStepForm.vue")['default']
export const SuccessFailureDisplay: typeof import("../components/SuccessFailureDisplay.vue")['default']
export const TcLayout: typeof import("../components/TcLayout.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtLinkLocale: typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.5.4_@vue+compiler-dom@3.5.14_eslint@9.27.0_jiti@2.4.2__magicast@0.3.5_ro_a52f77fb919fa4a86b7fc15c44846522/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
export const SwitchLocalePathLink: typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.5.4_@vue+compiler-dom@3.5.14_eslint@9.27.0_jiti@2.4.2__magicast@0.3.5_ro_a52f77fb919fa4a86b7fc15c44846522/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
export const NuxtPage: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyDatePicker: LazyComponent<typeof import("../components/DatePicker.vue")['default']>
export const LazyFormAccordion: LazyComponent<typeof import("../components/FormAccordion.vue")['default']>
export const LazyFormCountrySelect: LazyComponent<typeof import("../components/FormCountrySelect.vue")['default']>
export const LazyFormFile: LazyComponent<typeof import("../components/FormFile.vue")['default']>
export const LazyFormInput: LazyComponent<typeof import("../components/FormInput.vue")['default']>
export const LazyFormPhone: LazyComponent<typeof import("../components/FormPhone.vue")['default']>
export const LazyFormRadio: LazyComponent<typeof import("../components/FormRadio.vue")['default']>
export const LazyFormSignature: LazyComponent<typeof import("../components/FormSignature.vue")['default']>
export const LazyHeaderElement: LazyComponent<typeof import("../components/HeaderElement.vue")['default']>
export const LazyLanguageSelector: LazyComponent<typeof import("../components/LanguageSelector.vue")['default']>
export const LazyMultiStepForm: LazyComponent<typeof import("../components/MultiStepForm.vue")['default']>
export const LazySuccessFailureDisplay: LazyComponent<typeof import("../components/SuccessFailureDisplay.vue")['default']>
export const LazyTcLayout: LazyComponent<typeof import("../components/TcLayout.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtLinkLocale: LazyComponent<typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.5.4_@vue+compiler-dom@3.5.14_eslint@9.27.0_jiti@2.4.2__magicast@0.3.5_ro_a52f77fb919fa4a86b7fc15c44846522/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
export const LazySwitchLocalePathLink: LazyComponent<typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.5.4_@vue+compiler-dom@3.5.14_eslint@9.27.0_jiti@2.4.2__magicast@0.3.5_ro_a52f77fb919fa4a86b7fc15c44846522/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.3_@parcel+watcher@2.5.1_@types+node@22.15.18_db0@0.3.2_eslint@9.27.0_jiti@2.4_eaf8d4cc3818141beca418bfb50e9934/node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]
