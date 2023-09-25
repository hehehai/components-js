import type { Observable } from 'rxjs';
import { Ref, UnwrapRef, onScopeDispose, ref } from 'vue';

/**
 * Implementation used from https://github.com/vueuse/vueuse/blob/main/packages/rxjs/useObservable/index.ts
 * 
 * @internal
 */
export function useObservableState<T>(
  observable: Observable<T> | undefined,
  startWith: T,
) {
  const value = ref<T | undefined>(startWith)

  const subscription = observable?.subscribe({
    next: val => (value.value = (val as UnwrapRef<T>)),
  })

  onScopeDispose(() => {
    subscription?.unsubscribe()
  })

  return value as Readonly<Ref<T>>
}
