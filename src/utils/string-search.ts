import type { IsUndefined } from 'type-plus';

type StringToArray<S extends string, Result extends string[] = []> =
  string extends S ?
    never
    : S extends `${infer F}${infer R}` ?
      StringToArray<R, [...Result, F]>
      : Result;

type JoinStringArray<
  TInput extends string[],
  TSeparator extends string = ''
> = TInput extends [] ?
  ''
  : TInput extends [infer H, ...infer T] ?
    H extends string ?
      `${H}${TSeparator}${JoinStringArray<T extends string[] ? T : [], TSeparator>}`
      : never
    : never;

type TakeFirstN<
  TInput extends unknown[],
  TCount extends number,
  TResult extends unknown[] = []
> =
  TResult['length'] extends TCount ?
    TResult
    : TInput extends [infer H, ...infer T] ?
      TakeFirstN<T, TCount, [...TResult, H]>
      : TResult;

type ArrayReverse<
  TInput extends unknown[],
> = number extends TInput['length']
  ? TInput
  : TInput['length'] extends 0
    ? TInput
    : TInput['length'] extends 1
      ? TInput
      : TInput extends [unknown, ...infer T]
        ? T extends unknown[]
          ? [...ArrayReverse<T>, TInput[0]]
          : never
        : never;

type ArraySliceReversed<
  TInput extends unknown[],
  TStart extends number = 0,
  TEnd extends number | undefined = undefined,
  TResult extends unknown[] = [],
  TSkip extends unknown[] = []
> = TStart extends 0 ?
  IsUndefined<TEnd> extends true ?
    TInput extends [] ?
      TResult
      : TInput extends [...infer T, infer H] ?
        ArraySliceReversed<T, TStart, TEnd, [H, ...TResult], TSkip>
        : never
    : TResult['length'] extends TEnd ?
      TResult
      : TInput extends [...infer T, infer H] ?
        ArraySliceReversed<T, TStart, TEnd, [H, ...TResult], TSkip>
        : never
  : TSkip['length'] extends TStart ?
    ArraySliceReversed<TInput, 0, TEnd, TResult>
  : TInput extends [...infer T, infer H] ?
      ArraySliceReversed<T, TStart, TEnd, [], [...TSkip, H]>
      : never;

type ArraySliceNormal<
  TInput extends unknown[],
  TStart extends number = 0,
  TEnd extends number | undefined = undefined,
  TResult extends unknown[] = [],
  TSkip extends unknown[] = []
> = TStart extends 0 ?
  IsUndefined<TEnd> extends true ?
    TInput extends [] ?
      TResult
      : TInput extends [infer H, ...infer T] ?
        ArraySlice<T, TStart, TEnd, [...TResult, H], TSkip>
        : never
    : TResult['length'] extends TEnd ?
      TResult
      : TInput extends [infer H, ...infer T] ?
        ArraySlice<T, TStart, TEnd, [...TResult, H], TSkip>
        : never
  : TSkip['length'] extends TStart ?
    ArraySlice<TInput, 0, TEnd, TResult>
    : TInput extends [infer H, ...infer T] ?
      ArraySlice<T, TStart, TEnd, [], [...TSkip, H]>
      : never;

type ArraySlice<
  TInput extends unknown[],
  TStart extends number = 0,
  TEnd extends number | undefined = undefined,
  TResult extends unknown[] = [],
  TSkip extends unknown[] = []
> = `${TStart}` extends `-${infer S extends number}` ?
  ArraySliceReversed<TInput, S, TEnd, TResult, TSkip>
  : ArraySliceNormal<TInput, TStart, TEnd, TResult, TSkip>
  ;

type A1 = StringToArray<'Hello World'>;
//   ^?
type A2 = JoinStringArray<A1, ' '>;
//   ^?
type A3 = ArraySlice<A1, -1>;
//   ^?
type A4 = ArraySlice<A1, 1, 1>;
//   ^?


export type SearchStringOptions = {
  numOfLetersIfEmpty?: number
}
