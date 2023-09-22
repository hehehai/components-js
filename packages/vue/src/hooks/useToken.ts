import { log } from '@livekit/components-core';
import { MaybeRef, ref, unref, watchEffect } from 'vue';

/** @public */
export interface UserInfo {
  identity?: string;
  name?: string;
  metadata?: string;
}

/** @public */
export interface UseTokenOptions {
  userInfo?: UserInfo;
}

/**
 * The `useToken` hook fetches a token from the given token endpoint with the given user info.
 *
 * @example
 * ```tsx
 * const token = useToken(<token-endpoint>, roomName, { userInfo: { identity, name }});
 * ```
 * @public */
export function useToken(
  tokenEndpoint: MaybeRef<string | undefined>,
  roomName: MaybeRef<string>,
  options: MaybeRef<UseTokenOptions> = {},
) {
  const token = ref<string | undefined>(undefined);

  watchEffect(() => {
    if (unref(tokenEndpoint) === undefined) {
      throw Error('token endpoint needs to be defined');
    }
    if (unref(options).userInfo?.identity === undefined) {
      return;
    }
    const tokenFetcher = async () => {
      log.debug('fetching token');
      const params = new URLSearchParams({ ...unref(options).userInfo, roomName: unref(roomName) });
      const res = await fetch(`${tokenEndpoint}?${params.toString()}`);
      const { accessToken } = await res.json();
      token.value = accessToken;
    };
    tokenFetcher();
  });
  return token;
}
