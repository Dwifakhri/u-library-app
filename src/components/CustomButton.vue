<template>
  <button v-on="$listeners" class="px-4 py-2 bg-blue_hex text-white">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      default: "",
    },
  },
};
</script>
