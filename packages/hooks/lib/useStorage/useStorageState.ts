import { useState } from 'react'
import useUpdateEffect from '../useUpdateEffect'
import { isFunction } from './utils'

import {
  IFuncUpdater,
  TStorageStateDefaultValue,
  TStorageStateResult
} from './types'

function useStorageState<T>(storage: Storage, key: string, defaultValue?: TStorageStateDefaultValue<T>): TStorageStateResult<T> {

  const [state, setState] = useState<T | undefined>(() => getStoredValue())

  function getStoredValue() {
    const raw = storage.getItem(key)
    if (raw) {
      try {
        return JSON.parse(raw)
      } catch (e) { }
    }
    if (isFunction<IFuncUpdater<T>>(defaultValue)) {
      return defaultValue()
    }
    return defaultValue
  }

  function updateState(value?: T | IFuncUpdater<T>) {
    if (isFunction<IFuncUpdater<T>>(value)) {
      const previousState = getStoredValue()
      const currentState = value(previousState)
      storage.setItem(key, JSON.stringify(currentState))
      setState(currentState)
    } else {
      storage.setItem(key, JSON.stringify(value))
      setState(value)
    }
  }

  function deleteState() {
    setState(undefined)
    storage.removeItem(key)
  }

  useUpdateEffect(() => {
    setState(getStoredValue())
  }, [key])
  return [state, updateState, deleteState]
}

export default useStorageState
