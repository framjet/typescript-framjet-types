import type {
  ArrayTypeNames,
  BuiltInTypeNames,
  CollectionTypeNames,
  FunctionTypeNames,
  FutureTypeNames,
  GlobalTypeNames, GlobalTypeNamesProvider,
  JsonTypeNames,
  PrimitiveTypeNames,
  SpecialTypeNames
} from './types';
import type { IsAny, IsNever, IsUndefined, IsUnknown } from 'type-plus';
import type { GenericTypeName } from './utils';

const CustomTypePlaceHolder: unique symbol = Symbol.for('CustomTypePlaceHolder');

export interface CustomTypeNames {
  CustomTypePlaceHolder: typeof CustomTypePlaceHolder;
}

export type StringContains<T, S extends string> = T extends `${string}${S}${string}` ? true : false;

export interface TypeNamesProvider<TInput extends string, TInstanceOf = unknown> {
  _internal: StringContains<TInput, '<' | '>'> extends true ? never : FilterPossibleNames<TInput, keyof FilterPossibleTypeNamesMap<AllTypeNames, TInstanceOf>>;
  _global: StringContains<TInput, '<' | '>'> extends true ? never : GlobalTypeNamesProvider<TInput, TInstanceOf>;
  _map: GenericTypeName<TInput, 'Map', [unknown, unknown], never>;
  _weakMap: GenericTypeName<TInput, 'WeakMap', [WeakKey, unknown], never>;
  _set: GenericTypeName<TInput, 'Set', [unknown], never>;
  _weakSet: GenericTypeName<TInput, 'WeakSet', [WeakKey], never>;
  _weakRef: GenericTypeName<TInput, 'WeakRef', [WeakKey], never>;
  _promise: GenericTypeName<TInput, 'Promise', [unknown], never>;
}


export type AllTypeNames =
  & ArrayTypeNames
  & BuiltInTypeNames
  & CollectionTypeNames
  & FunctionTypeNames
  & FutureTypeNames
  & GlobalTypeNames
  & JsonTypeNames
  & PrimitiveTypeNames
  & SpecialTypeNames
  & CustomTypeNames
  ;

type IsSpecial<T> = IsNever<T, true, IsAny<T, true, IsUnknown<T, true, IsUndefined<T>>>>;

export type FilterPossibleTypeNamesMap<T, V> = {
  [K in keyof T as IsUnknown<V, K, IsSpecial<V> extends true ? T[K] extends V ? K : never : IsSpecial<T[K]> extends false ? T[K] extends V ? K : never : never>]: T[K]
};

type LongestMatch<L extends string, R extends string, I extends string = ''> =
  L extends `${I}${infer H}${string}` ?
    R extends `${I}${H}${string}` ?
      LongestMatch<L, R, `${I}${H}`>
      : I
    : I;

type LongestMatches<TInput extends string, TList extends string> = {
  [K in TList as LongestMatch<TInput, K>]: K;
};

type FindMostMatchingKey<TInput extends string, TList extends object, TLast extends string = ''> =
  TInput extends `${TLast}${infer V}${string}` ?
    IsNever<FindMostMatchingKey<TInput, TList, `${TLast}${V}`>> extends false ?
      FindMostMatchingKey<TInput, TList, `${TLast}${V}`>
      : TLast extends keyof TList ?
        TList[TLast]
        : never
    : TLast extends keyof TList ?
      TList[TLast]
      : never
  ;

type FindLastMatch<TInput extends string, TList extends string, TUnknown = never> = IsNever<FindMostMatchingKey<TInput, LongestMatches<TInput, TList>>, TUnknown, FindMostMatchingKey<TInput, LongestMatches<TInput, TList>>>

export type FilterPossibleNames<TInput extends string, TPossible extends string> =
  string extends TInput ?
    TPossible
    : '' extends TInput ?
      TPossible
      : FindLastMatch<TInput, TPossible>;


export type TypeNamesInner<TInput extends string = string, TInstanceOf = unknown> = {
  [K in keyof TypeNamesProvider<TInput, TInstanceOf>]: TypeNamesProvider<TInput, TInstanceOf>[K];
}[keyof TypeNamesProvider<TInput>];

export type TypeNames<TInput extends string = string, TInstanceOf = unknown> = never extends TInput ?
  TypeNamesInner<TInput, TInstanceOf> & string : TInput;

