export async function myFetch(query) {
    
    const config = useRuntimeConfig()
    const api = config?.public?.api
    const headers = { 'Content-Type': 'application/json' }
    
    const { data, error } = await useFetch(api, {
        method: "POST",
        headers,
        body: JSON.stringify({
          query,
        }),
    })
    return data?.value?.data

}
  