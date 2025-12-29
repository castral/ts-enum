export namespace Enum {
  export type EnumLike<T> = Record<keyof T & string, string | number> &
    Record<keyof T & number, keyof T & string>;

  export type Key<E extends EnumLike<E>> = keyof E & string;

  export type Value<E extends EnumLike<E>> = E[Key<E>];

  function isEnumNumber(v: unknown): v is number {
    return (
      typeof v === 'number' || (typeof v === 'string' && !isNaN(Number(v)))
    );
  }

  function isEnumKey<E extends EnumLike<E>>(e: E, k: any): k is keyof E {
    return k in e;
  }

  export function keys<E extends EnumLike<E>>(e: E): Key<E>[] {
    const keys: Key<E>[] = [];
    // NOTE: .filter() and .map() don't work here
    for (const k of Object.keys(e)) {
      if (!isEnumNumber(k) && isEnumKey(e, k)) {
        keys.push(k);
      }
    }
    return keys;
  }

  export function values<E extends EnumLike<E>>(e: E): Value<E>[] {
    return keys(e).map((k) => e[k]);
  }

  export function entries<E extends EnumLike<E>>(e: E): [Key<E>, Value<E>][] {
    return keys(e).map((k) => [k, e[k]]);
  }

  export function isValue<E extends EnumLike<E>>(e: E, v: any): v is Value<E> {
    return values(e).includes(v);
  }

  export function createIsGuard<E extends EnumLike<E>>(e: E) {
    const vs = new Set(values(e));
    return (v: any): v is Value<E> => vs.has(v);
  }

  export function map<E extends EnumLike<E>, T>(
    e: E,
    fn: (k: Key<E>, v: Value<E>) => T,
  ): T[] {
    return entries(e).map(([k, v]) => fn(k, v));
  }

  export function keyOf<E extends EnumLike<E>>(
    e: E,
    v: unknown,
  ): Key<E> | undefined {
    return keys(e).find((k) => e[k] === v);
  }

  export function keyOfStrict<E extends EnumLike<E>>(e: E, v: unknown): Key<E> {
    const k = keyOf(e, v);
    if (k === undefined) {
      throw new Error(`No key for value ${v} in enum ${e}`);
    }
    return k;
  }

  export function toString<E extends EnumLike<E>>(
    e: E,
    v: unknown,
  ): string | undefined {
    return keyOf(e, v);
  }

  export function fromString<E extends EnumLike<E>>(
    e: E,
    s: string,
  ): Value<E> | undefined {
    const k = keys(e).find((v) => e[v].toLowerCase() === s.toLowerCase());
    return k === undefined ? undefined : e[k];
  }
}
