<script lang="ts" setup>
import { useToken } from '@livekit/components-vue';
const query = useRoute().query;

const roomName = (query.room ?? 'test-room').toString();
const userIdentity = (query.user ?? 'test-identity').toString();

const config = useRuntimeConfig();

const token = useToken(config.public.NUXT_PUBLIC_LK_TOKEN_ENDPOINT, roomName, {
  userInfo: {
    identity: userIdentity,
    name: userIdentity,
  },
});
</script>

<template>
  <ClientOnly>
    <div>{{ roomName }} / {{ userIdentity }}</div>
    <div>{{ token }}</div>
  </ClientOnly>
</template>
