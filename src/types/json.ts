export type JsonObject = {[Key in string]: JsonValue} & {[Key in string]?: JsonValue | undefined};

export type JsonArray = JsonValue[] | readonly JsonValue[];

export type JsonPrimitive = string | number | boolean | null;

export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export type JsonTypeNames = {
  JsonObject: JsonObject;
  JsonArray: JsonArray;
  JsonPrimitive: JsonPrimitive;
  JsonValue: JsonValue;
}
