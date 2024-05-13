import { TypeName } from '..';
import { IsEqual, type IsNever } from 'type-plus';
import type { TypeFromName } from '../from-name';

export type AnyMap<K = unknown, V = unknown> = Map<K, V>;
export type AnyWeakMap<K extends WeakKey = WeakKey, V = unknown> = WeakMap<K, V>;
export type AnySet<V = unknown> = Set<V>;
export type AnyWeakSet<V extends WeakKey = WeakKey> = WeakSet<V>;
export type AnyWeakRef<V extends WeakKey = WeakKey> = WeakRef<V>;

export interface CollectionTypeNames {
  Map: AnyMap;
  WeakMap: AnyWeakMap;
  Set: AnySet;
  WeakSet: AnyWeakSet;
  WeakRef: AnyWeakRef;
}

interface CollectionTypeNamesResolvers<TInput, TExact extends boolean> {
  map: TInput extends Map<infer K, infer V> ? [Map<K, V>, `Map<${TypeName<K, { exact: TExact }>}, ${TypeName<V, { exact: TExact }>}>`] : never;
  weakMap: TInput extends WeakMap<infer K, infer V> ? [WeakMap<K, V>, `WeakMap<${TypeName<K, { exact: TExact }>}, ${TypeName<V, { exact: TExact }>}>`] : never;
  set: TInput extends Set<infer V> ? [Set<V>, `Set<${TypeName<V, { exact: TExact }>}>`] : never;
  weakSet: TInput extends WeakSet<infer V> ? [WeakSet<V>, `WeakSet<${TypeName<V, { exact: TExact }>}>`] : never;
  weakRef: TInput extends WeakRef<infer V> ? [WeakRef<V>, `WeakRef<${TypeName<V, { exact: TExact }>}>`] : never;
}

export type CollectionTypeNamesResolver<
  TInput,
  TExact extends boolean
> = {
  [K in keyof CollectionTypeNamesResolvers<TInput, TExact>]: CollectionTypeNamesResolvers<TInput, TExact>[K] extends [infer V, infer Name] ?
    IsEqual<TInput, V, Name, never> : never;
}[keyof CollectionTypeNamesResolvers<TInput, TExact>];

type InferType<T extends string> = TypeFromName<T,  { unknown: never }>;

interface CollectionTypeFromNameResolvers<TInput extends string> {
  map: TInput extends `Map<${infer K}, ${infer V}>` ? IsNever<InferType<K>, never, IsNever<InferType<V>, never, Map<TypeFromName<K>, TypeFromName<V>>>> : never;
  weakMap: TInput extends `WeakMap<${infer K}, ${infer V}>` ? WeakMap<TypeFromName<K, { instanceOf: WeakKey }>, TypeFromName<V>> : never;
  set: TInput extends `Set<${infer V}>` ? Set<TypeFromName<V>> : never;
  weakSet: TInput extends `WeakSet<${infer V}>` ? WeakSet<TypeFromName<V, { instanceOf: WeakKey }>> : never;
  weakRef: TInput extends `WeakRef<${infer V}>` ? WeakRef<TypeFromName<V, { instanceOf: WeakKey }>> : never;
}

export type CollectionTypeFromNameResolver<
  TInput extends string
> = {
  [K in keyof CollectionTypeFromNameResolvers<TInput>]: CollectionTypeFromNameResolvers<TInput>[K];
}[keyof CollectionTypeFromNameResolvers<TInput>];
