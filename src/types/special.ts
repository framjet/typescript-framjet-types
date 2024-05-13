import { BuiltIns } from './built-ins';
import { AnyFunction } from './function';

export type NonRecursiveType = BuiltIns | AnyFunction | (new (...args: unknown[]) => unknown);

export type UnknownArrayOrTuple = readonly [...unknown[]];

export type NonEmptyTuple = readonly [unknown, ...unknown[]];

export type SpecialTypeNames = {
  NonRecursiveType: NonRecursiveType;
  UnknownArrayOrTuple: UnknownArrayOrTuple;
  NonEmptyTuple: NonEmptyTuple;
  object: object;
}
