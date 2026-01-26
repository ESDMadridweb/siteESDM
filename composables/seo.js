import { useSiteStore } from '@/stores/site'

export function useSeoObject(seo) {

    const { locale } = useI18n()

    const siteSettingsDataES = inject('siteSettingsDataES')
    const siteSettingsDataEN = inject('siteSettingsDataES')

    let fallback_seo;

    if(locale.value == 'en'){
        fallback_seo = siteSettingsDataEN?.value?.fallback_seo
    } else {
        fallback_seo = siteSettingsDataES?.value?.fallback_seo
    }
    
    const route = useRoute()
    const site = useSiteStore()
    const siteUrlWithoutTrailingSlash = site?.url?.replace(/\/$/, '')
    const fullRouteWithoutLeadingSlash = route?.path?.replace(/^\//, '')
    const fullRouteWithoutTrailingSlash = fullRouteWithoutLeadingSlash?.replace(
        /\/$/,
        '',
    )
    const canonicalUrl =
        route?.name == 'index__es' || route?.name == 'index__en'
            ? `${siteUrlWithoutTrailingSlash}/`
            : `${siteUrlWithoutTrailingSlash}/${fullRouteWithoutTrailingSlash}/`

    useHead(() => ({
        link: [
            {
                rel: 'canonical',
                href: canonicalUrl,
            },
        ],
    }))
    const seoMeta = {
        title:  ((seo?.title) ? `${seo?.title} - ` : null) + 'ESD Madrid',
        ogTitle: seo?.title,
        description: seo?.description || fallback_seo?.description,
        ogDescription: seo?.description || fallback_seo?.description,
        ogImage: seo?.featuredImage || fallback_seo?.image,
    }
    useSeoMeta(seoMeta)
}
