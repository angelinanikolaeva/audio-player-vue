<template>
  <div class="app-slider">
    <app-button
      v-if="buttons && step"
      type="primary-new"
      class="app-slider__button"
      @click="removeStep"
    >
      <app-icon
        name="minus"
        width="10px"
        height="10px"
      />
    </app-button>
    <div class="app-slider__content">
      <input
        v-model="sliderValue"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        class="app-slider__content--input"
        @input="updateValue"
      />
    </div>
    <app-button
      v-if="buttons && step"
      type="primary-new"
      class="app-slider__button"
      @click="addStep"
    >
      <app-icon
        name="plus"
        width="14px"
        height="14px"
      />
    </app-button>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, ref, watch } from 'vue';
import AppButton from '../AppButton/AppButton.vue';

export default defineComponent({
  name: 'AppSlider',
  components: {
    AppButton,
    AppIcon: defineAsyncComponent(() => import('../AppIcon/AppIcon.vue')),
  },
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    step: {
      type: Number,
    },
    buttons: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const sliderValue = ref(0);

    watch(
      () => props.modelValue,
      (val) => (sliderValue.value = val),
      {
        immediate: true,
      },
    );

    const updateValue = () => emit('update:modelValue', +sliderValue.value);

    const addStep = () => {
      if (!props.step) return;
      let count = props.modelValue + props.step;
      if (count > props.max) {
        count = props.max;
      }
      sliderValue.value = +count.toFixed(2);
    };

    const removeStep = () => {
      if (!props.step) return;

      let count = props.modelValue - props.step;
      if (count < props.min) {
        count = props.min;
      }
      sliderValue.value = +count.toFixed(2);
    };

    return { sliderValue, updateValue, addStep, removeStep };
  },
});
</script>

<style lang="scss" scoped>
.app-slider {
  display: flex;
  gap: 5px;
  --slider-color: var(--color-primary);
  .app-slider__content {
    width: 100%;
    .app-slider__content--input {
      width: 100%;
      height: 6px;
      border-radius: 2px;
      accent-color: var(--slider-color);
      cursor: pointer;
    }
  }
  &__button {
    border-radius: 50%;
    width: 25px;
    height: 25px;
    min-width: 25px;
    min-height: 25px;
    justify-content: center;
    padding: 0;
    margin: 0;
  }
}
</style>
