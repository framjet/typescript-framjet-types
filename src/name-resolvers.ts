/* eslint-disable @typescript-eslint/ban-types */
import type { IsAny, IsEqual, IsNever, IsUnknown } from 'type-plus';
import { type CreateTypeNameResolver, type CreateTypeNameResolverConditionally, TypeMatcher } from './utils';
import type {
  AnyFunction,
  ArrayTypeNames,
  CollectionTypeNamesResolver,
  FunctionTypeNames,
  FutureTypeNames,
  GlobalInstanceTypeNameResolver,
  JsonTypeNames, JsonValue,
  Primitive,
  PrimitiveTypeNames,
  SpecialTypeNames
} from './types';
import type { CustomTypeNames } from './name';

type Simplify<T> = { [K in keyof T]: T[K] } & unknown;
type Merge<T, I> = Simplify<{ [k in Exclude<keyof T, keyof I>]: T[k] } & I>;

export interface TypeNameResolvers<T, TExact extends boolean> {
  array: CreateTypeNameResolverConditionally<T, unknown[], TExact, ArrayTypeNames>;
  collection: CollectionTypeNamesResolver<T, TExact>;
  function: CreateTypeNameResolverConditionally<T, AnyFunction, TExact, FunctionTypeNames>;
  future: CreateTypeNameResolver<T, TExact, FutureTypeNames>;
  json: CreateTypeNameResolver<T, TExact, JsonTypeNames>;
  primitive: CreateTypeNameResolver<T, TExact, PrimitiveTypeNames>;
  special: CreateTypeNameResolver<T, TExact, SpecialTypeNames>;
  custom: CreateTypeNameResolver<T, TExact, CustomTypeNames>;
  global: GlobalInstanceTypeNameResolver<T, TExact>;
  never: IsNever<T, 'never', never>;
  any: IsAny<T, 'any', never>;
  unknown: IsUnknown<T, 'unknown', never>;
}

type AllTypeNameResolvers<T, TExact extends boolean> = TypeNameResolvers<T, TExact>[keyof TypeNameResolvers<T, TExact>];

type WhenNever<T, When> = IsNever<T, When, T>;

export type TypeNameOptions = {
  unknown?: string;
  exact?: boolean;
  widenPrimitives?: boolean;
}

type TypeNameOptionsDefault = {
  unknown: 'unknown';
  exact: true;
  widenPrimitives: true;
}

export type WidenPrimitives<T, C> =
  C extends true ?
    T extends string ?
      string
      : T extends number ?
        number
        : T extends boolean ?
          boolean
        : T
    : T;

type IsSpecialTypeCase<T> = IsNever<T> extends true ? 'never' : IsAny<T> extends true ? 'any' : IsUnknown<T> extends true ? 'unknown' : false;

type TypeNameInner<
  TInput,
  TOptions extends TypeNameOptions
> = IsSpecialTypeCase<TInput> extends infer Special ?
    Special extends false ?
      WhenNever<
        AllTypeNameResolvers<
          WidenPrimitives<TInput, TOptions['widenPrimitives']>,
          TOptions['exact']
        >,
        TOptions['unknown']
      > & string
    : Special
  : TOptions['unknown'];

export type TypeName<
  TInput,
  TOptions extends TypeNameOptions = {}
> = TypeNameInner<TInput, Merge<TypeNameOptionsDefault, TOptions>> & string;

type Test = TypeName<JsonValue>;
