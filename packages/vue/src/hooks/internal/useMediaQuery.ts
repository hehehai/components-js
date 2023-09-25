import { MaybeRef, ref, unref, watchEffect, onScopeDispose } from 'vue';
/**
 * Implementation used from https://github.com/vueuse/vueuse/blob/main/packages/core/useMediaQuery/index.ts
 *
 * @internal
 */
export function useMediaQuery(query: MaybeRef<string>) {
  const getMatches = (query: MaybeRef<string>): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(unref(query)).matches;
    }
    return false;
  };

  let mediaQuery: MediaQueryList | undefined;
  const matches = ref(getMatches(query));

  function handleChange() {
    matches.value = getMatches(query);
  }

  const cleanup = () => {
    if (!mediaQuery) return
    if (mediaQuery.removeListener) {
      mediaQuery.removeListener(handleChange);
    } else {
      mediaQuery.removeEventListener('change', handleChange);
    }
  }

  const stopWatch = watchEffect(() => {
    cleanup()

    mediaQuery = window.matchMedia(unref(query));

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
    } else {
      mediaQuery.addEventListener('change', handleChange);
    }
  });

  onScopeDispose(() => {
    stopWatch()
    cleanup()
  })

  return matches;
}
