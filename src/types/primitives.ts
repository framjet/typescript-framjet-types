export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

export type PrimitiveTypeNames = {
  null: null;
  undefined: undefined;
  string: string;
  number: number;
  boolean: boolean;
  symbol: symbol;
  bigint: bigint;
  Primitive: Primitive;
}
