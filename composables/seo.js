import { useSiteStore } from '@/stores/site'

export function useSeoObject(title, description, image = null) {
    
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
        title:  ((title) ? `${title} - ` : null) + 'ESD Madrid',
        ogTitle: title,
        description: description,
        ogDescription: description,
        ogImage: image,
    }
    useSeoMeta(seoMeta)
}
