import { defineStore } from 'pinia'
import { useRuntimeConfig } from '#app'
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL
const API = process.env.API
export const useSiteStore = defineStore('site', {
  state: () => {
    const config = useRuntimeConfig()
    const API_PREVIEW = config.public.api
    return {
      api: API || API_PREVIEW,
      url: siteUrl,
      overflowHidden: false,
    }
  },
})