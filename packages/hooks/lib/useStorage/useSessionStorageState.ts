import useStorageState from './useStorageState'
import altStorageState from './altStorageState'

// hooks场景
export function useSessionStorageState<T>(key: string, defaultValue?: T | (() => T)) {
  return useStorageState(sessionStorage, key, defaultValue)
}

// 非hooks场景
export function altSessionStorageState<T>(key: string, defaultValue?: T | (() => T)) {
  return altStorageState(sessionStorage, key, defaultValue)
}
