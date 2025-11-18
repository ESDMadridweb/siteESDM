import { useSiteStore } from '@/stores/site'

export function useSeoObject(seo) {
    
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
        description: seo?.description,
        ogDescription: seo?.description,
        ogImage: seo?.featuredImage,
    }
    useSeoMeta(seoMeta)
}
