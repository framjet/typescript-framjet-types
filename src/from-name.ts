import type { AllTypeNames } from './name';
import type { IsNever, IsUnknown } from 'type-plus';
import type { CollectionTypeFromNameResolver } from './types';

type Simplify<T> = { [K in keyof T]: T[K] } & unknown;
type Merge<T, I> = Simplify<{ [k in Exclude<keyof T, keyof I>]: T[k] } & I>;

export interface TypeFromNameResolvers<TInput extends string> {
  _internal: TInput extends keyof AllTypeNames ? AllTypeNames[TInput] : never;
  _collection: CollectionTypeFromNameResolver<TInput>;
}

type AllTypeFromNameResolvers<TInput extends string> = TypeFromNameResolvers<TInput>[keyof TypeFromNameResolvers<TInput>]  & unknown;


export type TypeFromNameOptions = {
  unknown?: unknown;
  instanceOf?: unknown;
}

type TypeFromNameOptionsDefault = {
  unknown: unknown;
  instanceOf?: unknown;
}

type WhenNever<T, When> = IsNever<T, When, T>;
type IsInstanceOf<T, I, Else> = T extends I ? T : Else;

type TypeFromNameInner<
  TInput extends string,
  TOptions extends TypeFromNameOptions
> = IsUnknown<
  TOptions['instanceOf'],
  WhenNever<AllTypeFromNameResolvers<TInput>, TOptions['unknown']>,
  IsInstanceOf<WhenNever<AllTypeFromNameResolvers<TInput>, TOptions['unknown']>, TOptions['instanceOf'], never>
>;

export type TypeFromName<
  TInput extends string,
  TOptions extends TypeFromNameOptions = {}
> = TypeFromNameInner<TInput, Merge<TypeFromNameOptionsDefault, TOptions>>;
