import { defineStore } from 'pinia'
import { useRuntimeConfig } from '#app'

export const useSiteStore = defineStore('site', {
  state: () => {
    const config = useRuntimeConfig()
    return {
      api: config.public.api,
      url: config.public.siteUrl,
      overflowHidden: false,
    }
  },
})