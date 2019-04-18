// @see: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CombinedReducersState<T extends { [key: string]: (...args: any[]) => {} }> = {
  [P in keyof T]: ReturnType<T[P]>
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RouteState<T extends { routeName: any; state: any }> = {
  [P in T['routeName']]: T['state']
};

