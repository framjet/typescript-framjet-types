import type { TypeNames } from '../name';

type GetFirstLetter<T> = T extends `${infer L}${string}` ? L : never;

type GenericTypeNameOneNew<
  T extends string,
  TPrefix extends string,
  TKeys = unknown,
  TNoMatch = TPrefix
> =
  string extends T ?
    TNoMatch
  : T extends '' ?
    TNoMatch
  : T extends `${TPrefix}` ?
    TNoMatch
  : T extends `${TPrefix}<${infer Key}>` ?
    Key extends TypeNames<Key, TKeys> ?
      `${TPrefix}<${Key}>`
    : never
  : T extends `${TPrefix}<${infer Key}` ?
        Key extends '' ?
          `${TPrefix}<${GetFirstLetter<TypeNames<Key, TKeys>>}`
        : `${TPrefix}<${TypeNames<Key, TKeys>}>`
    : T extends `${TPrefix}<` ?
        `${TPrefix}<${GetFirstLetter<TypeNames<string, TKeys>>}`
    : never;

type GenericTypeNameTwoNew<
  T extends string,
  TPrefix extends string,
  TKeys = unknown,
  TValues = unknown,
  TNoMatch = TPrefix
> =
  string extends T ?
    TNoMatch
  : T extends '' ?
    TNoMatch
  : T extends `${TPrefix}` ?
    TNoMatch
  : T extends `${TPrefix}<${infer Key}, ${infer Value}>` ?
        Key extends TypeNames<Key, TKeys> ?
          Value extends TypeNames<Value, TValues> ?
            `${TPrefix}<${Key}, ${Value}>`
          : never
        : never
    : T extends `${TPrefix}<${infer Key}, ${infer Value}` ?
        Key extends TypeNames<Key, TKeys> ?
          Value extends '' ?
            `${TPrefix}<${Key}, ${GetFirstLetter<TypeNames<Value, TValues>>}`
          : `${TPrefix}<${Key}, ${TypeNames<Value, TValues>}>`
        : never
    : T extends `${TPrefix}<${infer Key}, ` ?
        Key extends TypeNames<Key, TKeys> ?
          `${TPrefix}<${Key}, ${GetFirstLetter<TypeNames<'', TValues>>}`
        : never
    : T extends `${TPrefix}<${infer Key}` ?
        Key extends '' ?
          `${TPrefix}<${GetFirstLetter<TypeNames<Key, TKeys>>}`
        : `${TPrefix}<${TypeNames<Key, TKeys>}, `
    : T extends `${TPrefix}<` ?
        `${TPrefix}<${GetFirstLetter<TypeNames<string, TKeys>>}`
    : never;

type GenericTypeNameThreeNew<
  T extends string,
  TPrefix extends string,
  TKeys = unknown,
  TValues = unknown,
  TValues2 = unknown,
  TNoMatch = TPrefix
> =
  string extends T ?
    TNoMatch
  : T extends '' ?
    TNoMatch
  : T extends `${TPrefix}` ?
    TNoMatch
  : T extends `${TPrefix}<${infer Key}, ${infer Value}, ${infer Value2}>` ?
        Key extends TypeNames<Key, TKeys> ?
          Value extends TypeNames<Value, TValues> ?
            Value2 extends TypeNames<Value2, TValues2> ?
             `${TPrefix}<${Key}, ${Value}>`
            : never
          : never
        : never
  : T extends `${TPrefix}<${infer Key}, ${infer Value}, ${infer Value2}` ?
    Key extends TypeNames<Key, TKeys> ?
      Value extends TypeNames<Value, TValues> ?
        Value2 extends '' ?
          `${TPrefix}<${Key}, ${Value}, ${GetFirstLetter<TypeNames<Value2, TValues2>>}`
        : `${TPrefix}<${Key}, ${Value}, ${TypeNames<Value2, TValues2>}>`
      : never
    : never
  : T extends `${TPrefix}<${infer Key}, ${infer Value}, ` ?
      Key extends TypeNames<Key, TKeys> ?
        Value extends TypeNames<Value, TValues> ?
          `${TPrefix}<${Key}, ${Value}, ${GetFirstLetter<TypeNames<'', TValues2>>}`
        : never
      : never
  : T extends `${TPrefix}<${infer Key}, ${infer Value}` ?
    Key extends TypeNames<Key, TKeys> ?
      Value extends '' ?
        `${TPrefix}<${Key}, ${GetFirstLetter<TypeNames<Value, TValues>>}`
      : `${TPrefix}<${Key}, ${TypeNames<Value, TValues>}, `
    : never
  : T extends `${TPrefix}<${infer Key}, ` ?
    Key extends TypeNames<Key, TKeys> ?
      `${TPrefix}<${Key}, ${GetFirstLetter<TypeNames<'', TValues>>}`
    : never
  : T extends `${TPrefix}<${infer Key}` ?
    Key extends '' ?
      `${TPrefix}<${GetFirstLetter<TypeNames<Key, TKeys>>}`
      : `${TPrefix}<${TypeNames<Key, TKeys>}, `
  : T extends `${TPrefix}<` ?
      `${TPrefix}<${GetFirstLetter<TypeNames<string, TKeys>>}`
  : never;


export type GenericTypeName<
  T extends string,
  TPrefix extends string,
  TInstancesOf extends [unknown] | [unknown, unknown] | [unknown, unknown, unknown],
  TNoMatch = TPrefix
> = TInstancesOf extends [infer V] ?
  GenericTypeNameOneNew<T, TPrefix, V, TNoMatch>
  : TInstancesOf extends [infer K, infer V] ?
    GenericTypeNameTwoNew<T, TPrefix, K, V, TNoMatch>
    : TInstancesOf extends [infer K, infer V, infer V2] ?
      GenericTypeNameThreeNew<T, TPrefix, K, V, V2, TNoMatch>
      : never
  ;
