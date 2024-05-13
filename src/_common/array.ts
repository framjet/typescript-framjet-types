import type { IsUndefined } from 'type-plus';

export type StringToArray<S extends string, Result extends string[] = []> =
  string extends S ?
    never
    : S extends `${infer F}${infer R}` ?
      StringToArray<R, [...Result, F]>
      : Result;

export type JoinStringArray<
  TInput extends string[],
  TSeparator extends string = ''
> = TInput extends [] ?
  ''
  : TInput extends [infer H, ...infer T] ?
    H extends string ?
      `${H}${TSeparator}${JoinStringArray<T extends string[] ? T : [], TSeparator>}`
      : never
    : never;

export type ArraySlice<
  TInput extends unknown[],
  TStart extends number = 0,
  TEnd extends number | undefined = undefined,
  TResult extends unknown[] = [],
  TSkip extends unknown[] = []
> = TEnd extends 0 ?
  []
  : `${TStart}` extends `-${infer S extends number}` ?
    TSkip['length'] extends S ?
      ArraySlice<TSkip, 0, TEnd, TResult, TInput>
      : TInput extends [...infer T, infer H] ?
        ArraySlice<T, TStart, TEnd, TResult, [H, ...TSkip]>
        : ArraySlice<TSkip, 0, TEnd, TResult, []>
    : TStart extends 0 ?
      `${TEnd}` extends `-${infer E extends number}` ?
        TInput['length'] extends E ?
          TResult
          : TInput extends [infer H, ...infer T] ?
            ArraySlice<T, TStart, TEnd, [...TResult, H], TSkip>
            : []
        : IsUndefined<TEnd> extends true ?
          TInput extends [] ?
            TResult
            : TInput extends [infer H, ...infer T] ?
              ArraySlice<T, TStart, TEnd, [...TResult, H], TSkip>
              : never
          : [...TSkip, ...TResult]['length'] extends TEnd ?
            TResult
            : TInput extends [infer H, ...infer T] ?
              ArraySlice<T, TStart, TEnd, [...TResult, H], TSkip>
              : TResult
      : TSkip['length'] extends TStart ?
        ArraySlice<TInput, 0, TEnd, TResult, []>
        : TInput extends [infer H, ...infer T] ?
          ArraySlice<T, TStart, TEnd, TResult, [...TSkip, H]>
          : [];

type StringSliceArraySlice<
  TInput extends string,
  TStart extends number = 0,
  TEnd extends number | undefined = undefined
> = JoinStringArray<ArraySlice<StringToArray<TInput>, TStart, TEnd>>

type StringSliceFast<T extends string> = {
  '0_1': T extends `${infer L0}${string}` ? L0 : '';
  '0_2': T extends `${infer L0}${infer L1}${string}` ? `${L0}${L1}` : '';
  '0_3': T extends `${infer L0}${infer L1}${string}` ? `${L0}${L1}` : '';
  '0_4': T extends `${infer L0}${infer L1}${string}` ? `${L0}${L1}` : '';
  '0_5': T extends `${infer L0}${infer L1}${string}` ? `${L0}${L1}` : '';
  '0_6': T extends `${infer L0}${infer L1}${string}` ? `${L0}${L1}` : '';
}

export type StringSlice<
  TInput extends string,
  TStart extends number = 0,
  TEnd extends number | undefined = undefined,
  TNonGeneric = never
> = string extends TInput ?
  TNonGeneric
  : TInput extends '' ?
    ''
    : TEnd extends 0 ?
      ''
      : StringSliceArraySlice<TInput, TStart, TEnd>

type Test = StringSlice<`World`, 0, -1>
//   ^?
