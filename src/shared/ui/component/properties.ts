export type ComponentProperties<T extends Instance> = Partial<WritableInstanceProperties<T>> & Partial<{ children: React.ReactNode }>