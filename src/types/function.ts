export type AnyFunction<TArgs extends unknown[] = unknown[], TResult = unknown> = (...args: TArgs) => TResult;
export type AnyVoidFunction<TArgs extends unknown[] = unknown[]> = AnyFunction<TArgs, void>;
export type AnyNoArgFunction<TResult = unknown> = AnyFunction<[], TResult>;
export type AnyNoArgVoidFunction = AnyFunction<[], void>;


export type FunctionTypeNames = {
  Function: AnyFunction;
  VoidFunction: AnyVoidFunction;
  NoArgFunction: AnyNoArgFunction;
  NoArgVoidFunction: AnyNoArgVoidFunction;
}
