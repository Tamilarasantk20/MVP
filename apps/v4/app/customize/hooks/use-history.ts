"use client"

import * as React from "react"

type HistoryState<T> = {
  current: T
  past: T[]
  future: T[]
}

// Undo/redo stack over a config value. Kept as a single state object (rather
// than refs) so it stays a pure reducer-style update — safe under React's
// double-invoked updater functions in dev/Strict Mode.
export function useHistoryState<T>(initial: T) {
  const [state, setState] = React.useState<HistoryState<T>>({
    current: initial,
    past: [],
    future: [],
  })

  const set = React.useCallback((next: T | ((prev: T) => T)) => {
    setState((s) => {
      const value =
        typeof next === "function" ? (next as (prev: T) => T)(s.current) : next
      return { current: value, past: [...s.past, s.current], future: [] }
    })
  }, [])

  const undo = React.useCallback(() => {
    setState((s) => {
      if (s.past.length === 0) return s
      const previous = s.past[s.past.length - 1]
      return {
        current: previous,
        past: s.past.slice(0, -1),
        future: [s.current, ...s.future],
      }
    })
  }, [])

  const redo = React.useCallback(() => {
    setState((s) => {
      if (s.future.length === 0) return s
      const [next, ...rest] = s.future
      return { current: next, past: [...s.past, s.current], future: rest }
    })
  }, [])

  return {
    value: state.current,
    set,
    undo,
    redo,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
  }
}
