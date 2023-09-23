import type { Room } from 'livekit-client';
import { InjectionKey, inject } from 'vue';

/** @public */
export const roomContextKey: InjectionKey<Room> = Symbol();

/**
 * Ensures that a room is provided via context.
 * If no room is provided, an error is thrown.
 * @public
 */
export function useRoomContext() {
  const ctx = inject(roomContextKey);
  if (!ctx) {
    throw Error('tried to access room context outside of livekit room component');
  }
  return ctx;
}

/**
 * Returns the room context if it exists, otherwise undefined.
 * @public
 */
export function useMaybeRoomContext() {
  return inject(roomContextKey);
}

/**
 * Ensures that a room is provided, either via context or explicitly as a parameter.
 * If no room is provided, an error is thrown.
 * @public
 */
export function useEnsureRoom(room?: Room) {
  const context = useMaybeRoomContext();
  const r = room ?? context;
  if (!r) {
    throw new Error(
      'No room provided, make sure you are inside a Room context or pass the room explicitly',
    );
  }
  return r;
}
