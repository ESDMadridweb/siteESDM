<template>
    <PosterProject 
        v-for="(post, index) in postersFiltrados" 
        :post="post" 
        :mode="mode" 
        :index="index" 
    />
</template>
<script setup>
const props = defineProps({
    projects: Array,
    mode: String
})
const posterStore = usePosterStore()
const postersFiltrados = computed(() => {
  const { temas, fechas, tipos } = posterStore;

  return props.projects.filter(post => {
    const coincideTemas =
      temas.length === 0 ||
      (Array.isArray(post.temas) && post.temas.some(t => temas.includes(t.slug)));

    const coincideFechas =
      fechas.length === 0 ||
      (Array.isArray(post.fecha) && post.fecha.some(f => fechas.includes(f.slug)));

    const coincideTipos =
      tipos.length === 0 ||
      (Array.isArray(post.tipo) && post.tipo.some(tp => tipos.includes(tp.slug)));

    return coincideTemas && coincideFechas && coincideTipos;
  });
});

</script>