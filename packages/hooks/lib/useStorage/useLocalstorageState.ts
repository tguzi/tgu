import useStorageState from './useStorageState'
import altStorageState from './altStorageState'

// hooks场景
export function useLocalStorageState<T>(key: string, defaultValue?: T | (() => T)) {
  return useStorageState(localStorage, key, defaultValue)
}

// 非hooks场景
export function altLocalStorageState<T>(key: string, defaultValue?: T | (() => T)) {
  return altStorageState(localStorage, key, defaultValue)
}
