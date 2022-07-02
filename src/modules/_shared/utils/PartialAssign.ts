type ExcludeFunctionProps<T> = Omit<T, { [K in keyof T]-?: T[K] extends Function ? K : never }[keyof T]>;

export const partialAssign = <T>(el: T, el2: ExcludeFunctionProps<Partial<T>>): T =>
    Object.assign(el, el2) as unknown as T;
