<script lang="ts" setup name="AudioPre">
import { defineProps } from 'vue';
defineProps<{
  test: string;
}>();
</script>

<template>
  <div>AudioPre, {{ test }}</div>
</template>
