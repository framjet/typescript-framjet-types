import { IsEqual } from 'type-plus';

export type TypeMatcher<TInput, TExpect, TExact extends boolean = true> =
  TExact extends true ? IsEqual<TInput, TExpect>
    : TInput extends TExact ? true : false;
