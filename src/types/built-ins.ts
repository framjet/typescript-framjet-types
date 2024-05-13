import { Primitive } from '.';

export type BuiltIns = Primitive | void | Date | RegExp;

export interface BuiltInTypeNames {
  BuiltIns: BuiltIns;
}
