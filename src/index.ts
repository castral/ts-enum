/*
 * MIT License
 *
 * Copyright (c) 2025 Cas Argilla
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

/**
 * A namespace providing utility functions and types for working with
 * enum-like objects. These functions are useful for operations such
 * as retrieval, mapping, and validation of keys and values in objects
 * that adhere to EnumLike structures.
 */
export namespace Enum {
  /**
   * A utility type representing an object similar to an enumeration.
   *
   * This type is used to define objects that map string keys to string or number
   * values while enforcing reverse mapping for number keys to their respective
   * string keys. It is particularly useful in scenarios where bidirectional
   * mapping between keys and values is required, such as TypeScript enums.
   *
   * @template T The base type used to infer key-value pairs for the enum-like object.
   */
  export type EnumLike<T> = Record<keyof T & string, string | number> &
    Record<keyof T & number, keyof T & string>;

  /**
   * Represents a TypeScript utility type that is used to extract the string-typed keys of the provided enum-like structure.
   *
   * This type ensures that the keys of the enum-like structure are valid strings, effectively narrowing the key type to a subset of both `keyof E` and `string`.
   *
   * @template E Represents the enum-like structure from which the keys will be extracted. This type must extend `EnumLike<E>`, where `EnumLike` is typically a constraint for objects that resemble enums.
   */
  export type Key<E extends EnumLike<E>> = keyof E & string;

  /**
   * Represents a type that maps to a specific value within an enumeration-like structure.
   *
   * @template E - An enumeration-like type (typically an object with string or symbol keys and associated values).
   *
   * The `Value` type takes an `EnumLike` type `E` and resolves to the type of the values corresponding to the keys of `E`.
   * It is commonly used to extract the value types from a type object that conforms to an enum-like structure.
   */
  export type Value<E extends EnumLike<E>> = E[Key<E>];

  /**
   * Determines if the provided value is a number or a string that can be converted to a number.
   *
   * @param v The value to check.
   * @return Returns true if the value is a number or a numeric string; otherwise, returns false.
   */
  function isEnumNumber(v: unknown): v is number {
    return (
      typeof v === 'number' || (typeof v === 'string' && !isNaN(Number(v)))
    );
  }

  /**
   * Determines whether the provided key exists as a key in the given enum-like object.
   *
   * @param e - The enum-like object to check the key against.
   * @param k - The key to verify against the enum-like object.
   * @return A boolean indicating whether the provided key exists within the enum-like object.
   */
  function isEnumKey<E extends EnumLike<E>>(e: E, k: any): k is keyof E {
    return k in e;
  }

  /**
   * Retrieves the keys of an enumerable object, excluding numeric enum members.
   *
   * @param e - The enumerable object to extract keys from.
   * @return An array of keys present in the enumerable object.
   */
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

  /**
   * Retrieves an array of all the values from the given enum-like object.
   *
   * @param e The enum-like object whose values need to be retrieved.
   * @returns An array containing all the values of the provided enum-like object.
   */
  export function values<E extends EnumLike<E>>(e: E): Value<E>[] {
    return keys(e).map((k) => e[k]);
  }

  /**
   * Retrieves an array of key-value pairs from the provided enum-like object.
   *
   * @param {E} e - An enum-like object from which to extract keys and values.
   * @return {[Key<E>, Value<E>][]} An array of tuples, where each tuple consists of a key and its corresponding value from the enum-like object.
   */
  export function entries<E extends EnumLike<E>>(e: E): [Key<E>, Value<E>][] {
    return keys(e).map((k) => [k, e[k]]);
  }

  /**
   * Determines whether the provided value `k` is a valid key of the given enum-like object `e`.
   *
   * @param e The enum-like object to check the key against.
   * @param k The value to verify as a key of the provided enum-like object.
   * @return A boolean indicating whether the value `k` is a valid key of the enum-like object `e`.
   */
  export function isKey<E extends EnumLike<E>>(e: E, k: any): k is Key<E> {
    return keys(e).includes(k);
  }

  /**
   * Creates a type guard function to check if a given value is a key of the provided enum-like object.
   *
   * @param e - The enum-like object for which the key guard is created.
   * @return A function that checks if a given value is a key of the provided enum-like object.
   */
  export function createIsKeyGuard<E extends EnumLike<E>>(e: E): (k: any) => k is Key<E> {
    const ks = new Set(keys(e));
    return (k: any): k is Key<E> => ks.has(k);
  }

  /**
   * Determines if the given value is a valid value of the provided enumeration.
   *
   * @param e - The enumeration to check against.
   * @param v - The value to validate as a member of the enumeration.
   * @return True if the value exists in the enumeration, otherwise false.
   */
  export function isValue<E extends EnumLike<E>>(e: E, v: any): v is Value<E> {
    return values(e).includes(v);
  }

  /**
   * Creates a type guard function to verify if a value is a member of the provided enum-like object.
   *
   * @param {E} e - The enum-like object to be used for the type guard.
   * @return {(v: any) => v is Value<E>} A function that checks if the provided value is a member of the enum.
   */
  export function createIsValueGuard<E extends EnumLike<E>>(e: E): (v: any) => v is Value<E> {
    const vs = new Set(values(e));
    return (v: any): v is Value<E> => vs.has(v);
  }

  /**
   * Transforms the entries of an enumerable type into a new array by applying a provided function.
   *
   * @param e - The enumerable object to iterate over.
   * @param fn - A function that is invoked for each key-value pair in the enumerable. It receives the key and value as arguments and returns the transformed value.
   * @return An array containing the transformed results for each key-value pair in the enumerable.
   */
  export function map<E extends EnumLike<E>, T>(
    e: E,
    fn: (k: Key<E>, v: Value<E>) => T,
  ): T[] {
    return entries(e).map(([k, v]) => fn(k, v));
  }

  /**
   * Finds and returns the key of the enum-like object for the given value.
   *
   * @param {E} e - The enum-like object to search within.
   * @param {unknown} v - The value to find within the enum-like object.
   * @return {Key<E> | undefined} The key corresponding to the provided value, or undefined if not found.
   */
  export function keyOf<E extends EnumLike<E>>(
    e: E,
    v: unknown,
  ): Key<E> | undefined {
    return keys(e).find((k) => e[k] === v);
  }

  /**
   * Retrieves the key of a given value in the enum-like object. Throws an error
   * if the key corresponding to the value does not exist.
   *
   * @param e - The enum-like object to search within.
   * @param v - The value to find the corresponding key for.
   * @return The key associated with the given value in the enum-like object.
   * @throws {Error} If no key exists for the value in the provided enum-like object.
   */
  export function keyOfStrict<E extends EnumLike<E>>(e: E, v: unknown): Key<E> {
    const k = keyOf(e, v);
    if (k === undefined) {
      throw new Error(`No key for value ${v} in enum ${e}`);
    }
    return k;
  }

  /**
   * Converts a given value to its corresponding key string representation in an enumerated type.
   * An alias of `keyOf` with a looser return type.
   *
   * @param {E} e - The enumerated type to search for the key corresponding to the value.
   * @param {unknown} v - The value to look up in the enumerated type.
   * @return {string | undefined} The key as a string if the value is found in the enumerated type, otherwise undefined.
   */
  export function keyOfValueToString<E extends EnumLike<E>>(
    e: E,
    v: unknown,
  ): string | undefined {
    return keyOf(e, v);
  }

  /**
   * Converts a string to a corresponding enumeration value if a matching key exists. Case-insensitive.
   *
   * @param e The enumeration object containing enum members.
   * @param s The string to be matched with one of the enumeration members.
   * @return The corresponding enumeration value if a match is found; otherwise, returns undefined.
   */
  export function valueFromKeyString<E extends EnumLike<E>>(
    e: E,
    s: string,
  ): Value<E> | undefined {
    const k = keys(e).find((v) => e[v].toLowerCase() === s.toLowerCase());
    return k === undefined ? undefined : e[k];
  }
}
