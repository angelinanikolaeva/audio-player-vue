<template>
  <button
    class="app-button"
    :disabled="isDisabled"
    :aria-disabled="isDisabled"
    type="button"
    :class="[type ? 'app-button--' + type : '']"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppButton',
  props: {
    type: {
      type: String,
      default: 'default',
    },
    icon: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  computed: {
    isDisabled() {
      return this.disabled;
    },
  },
  methods: {
    handleClick(evt: Event) {
      this.$emit('click', evt);
    },
  },
});
</script>

<style lang="scss" scoped>
.app-button {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    pointer-events: none;
    opacity: 0.65;
  }
}
</style>
