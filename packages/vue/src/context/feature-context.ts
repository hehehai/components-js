import { InjectionKey, inject } from "vue";

/** @internal */
export interface FeatureFlags {
  autoSubscription?: boolean;
}

type FeatureContext<T extends boolean = false> = T extends true
  ? FeatureFlags
  : FeatureFlags | undefined;

/** @internal */
export const lkFeatureContextKey: InjectionKey<FeatureFlags> = Symbol();

/**
 * @internal
 */
export function useFeatureContext<T extends boolean>(require?: T): FeatureContext<T> {
  const ctx = inject(lkFeatureContextKey) as FeatureContext<T>;
  if (require === true) {
    if (ctx) {
      return ctx;
    } else {
      throw Error('tried to access feature context, but none is present');
    }
  }
  return ctx;
}
