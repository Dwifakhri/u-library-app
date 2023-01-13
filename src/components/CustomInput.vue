<template>
  <div class="flex flex-col space-y-1">
    <label class="text-black" for="input"><slot></slot></label>
    <input
      name="input"
      v-bind="$attrs"
      :placeholder="placeholder"
      :type="type"
      :value="modelValue"
      @input="$emit(`update:modelValue`, $event.target.value)"
      class="px-3 py-1 border border-primary"
      required
    />
  </div>
</template>

<script>
export default {
  name: "CustomInput",
  props: {
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    placeholder: {
      placeholder: String,
      default: "",
    },
    modelValue: {
      value: String,
      default: "",
    },
  },
};
</script>
