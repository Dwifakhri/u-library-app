<template>
  <div class="flex space-x-3 text-white">
    <div v-on="$listeners" class="bg-blue_hex py-1 px-2 cursor-pointer">
      Prev
    </div>
    <div v-on="$listeners" class="bg-blue_hex py-1 px-2 cursor-pointer">
      Next
    </div>
  </div>
</template>

<script>
export default {
  props: {},
};
</script>
