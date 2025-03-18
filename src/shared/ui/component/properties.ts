import { Binding } from "@rbxts/react"

export type InternalProperties<T extends Instance> = Partial<WritableInstanceProperties<T>>
export type ComponentProperties<T extends InternalProperties<Instance>> = Partial<{[A in keyof T]: T[A] | Binding<T[A]>}> & Partial<{ children: React.ReactNode }>