import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Returns `serverValue` during SSR and hydration, then `getClientValue()` once
 * running in the browser. Avoids the setState-in-effect pattern for values
 * that only exist client-side (touch support, clock, decoded email).
 * `getClientValue` must return a stable value (primitive) between calls.
 */
export function useClientValue<T>(getClientValue: () => T, serverValue: T): T {
  return useSyncExternalStore(noopSubscribe, getClientValue, () => serverValue);
}

export function isTouchDevice(): boolean {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
