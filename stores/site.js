import { defineStore } from 'pinia'
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL
const API = process.env.API
export const useSiteStore = defineStore('site', {
  state: () => {
    return {
      api: API,
      url: siteUrl,
      overflowHidden: false,
    }
  },
})