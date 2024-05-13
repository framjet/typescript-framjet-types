import { TypeMatcher } from '.';

export type TypeNameMap = {};

export type CreateTypeNameResolver<
  TInput,
  TExact extends boolean,
  TTypeNameMap extends TypeNameMap
> = {
  [K in keyof TTypeNameMap]: TypeMatcher<TInput, TTypeNameMap[K], TExact> extends true ? K : never;
}[keyof TTypeNameMap];

export type CreateTypeNameResolverConditionally<
  TInput,
  TExpected,
  TExact extends boolean,
  TTypeNameMap extends TypeNameMap
> = TInput extends TExpected ?
  CreateTypeNameResolver<TInput, TExact, TTypeNameMap>
  : never;
