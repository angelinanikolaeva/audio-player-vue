<template>
  <Suspense>
    <component
      :is="icon"
      v-bind="$attrs"
      class="app-icon"
    />
    <template #fallback></template>
  </Suspense>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue';

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const icon = defineAsyncComponent(
      () => import(`../../assets/icons/${props.name}.svg`),
    );
    return { icon };
  },
};
</script>

<style lang="scss" scoped>
.app-icon {
  stroke: currentColor;
  fill: currentColor;
}
</style>
