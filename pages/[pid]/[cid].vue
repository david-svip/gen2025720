<template>
  <div>
    {{ routeParams }}
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const routeParams = ref('');
routeParams.value = JSON.stringify(route.params);
</script>