<script lang="ts" setup>
import { AudioPre, demo } from '@livekit/components-vue';

const count = ref(1);
const sum = computed(() => demo(count.value, 20));

const handleClick = () => {
  console.log('click');
  count.value++;
};
</script>

<template>
  <div>
    <h2>Home</h2>
    <AudioPre test="okk"></AudioPre>
    <div>
      <button @click="handleClick">click {{ count }}</button>
      <div>SUM: {{ sum }}</div>
    </div>
  </div>
</template>
