import { createContext, useContext } from 'react'

export const LayoutContext = createContext({ navCollapsed: false })
export function useLayout() { return useContext(LayoutContext) }
