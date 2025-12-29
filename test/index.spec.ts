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
import { Enum } from '../src/index.js';
import { describe, expect, it } from 'vitest';

enum NumericEnum {
  First = 0,
  Second = 1,
  Third = 2,
}

enum NumericEnumUnspecified {
  First,
  Second,
  Third,
}

enum NumericEnumNegative {
  NegOne = -1,
  Zero = 0,
  PosOne = 1,
}

enum StringEnum {
  First = 'FIRST',
  Second = 'SECOND',
  Third = 'THIRD',
}

enum StringEnumNumericValues {
  First = '123',
  Second = '456',
  Third = '789',
}

enum MixedEnum {
  Negative = -1,
  Zero = 0,
  Positive = 1,
  StringValue = 'STRING',
  NumericString = '999',
}

enum DuplicateValuesEnum {
  First = 'DUPLICATE',
  Second = 'DUPLICATE',
  Third = 'UNIQUE',
}

enum SameAsKeyEnum {
  First = 'First',
  Second = 'Second',
  Third = 'Third',
}

describe('ts-enum', () => {

  describe('keys()', () => {
    it('should return keys for numeric enum with specified values', () => {
      const result = Enum.keys(NumericEnum);
      expect(result).toEqual(['First', 'Second', 'Third']);
    });

    it('should return keys for numeric enum with unspecified values', () => {
      const result = Enum.keys(NumericEnumUnspecified);
      expect(result).toEqual(['First', 'Second', 'Third']);
    });

    it('should return keys for numeric enum with negative values', () => {
      const result = Enum.keys(NumericEnumNegative);
      expect(result).toEqual(['NegOne', 'Zero', 'PosOne']);
    });

    it('should return keys for string enum', () => {
      const result = Enum.keys(StringEnum);
      expect(result).toEqual(['First', 'Second', 'Third']);
    });

    it('should return keys for string enum with numeric string values', () => {
      const result = Enum.keys(StringEnumNumericValues);
      expect(result).toEqual(['First', 'Second', 'Third']);
    });

    it('should return keys for mixed enum', () => {
      const result = Enum.keys(MixedEnum);
      expect(result).toEqual([
        'Negative',
        'Zero',
        'Positive',
        'StringValue',
        'NumericString',
      ]);
    });

    it('should return keys for enum with duplicate values', () => {
      const result = Enum.keys(DuplicateValuesEnum);
      expect(result).toEqual(['First', 'Second', 'Third']);
    });

    it('should return keys for enum where values match key names', () => {
      const result = Enum.keys(SameAsKeyEnum);
      expect(result).toEqual(['First', 'Second', 'Third']);
    });
  });

  describe('values()', () => {
    it('should return values for numeric enum with specified values', () => {
      const result = Enum.values(NumericEnum);
      expect(result).toEqual([0, 1, 2]);
    });

    it('should return values for numeric enum with unspecified values', () => {
      const result = Enum.values(NumericEnumUnspecified);
      expect(result).toEqual([0, 1, 2]);
    });

    it('should return values for numeric enum with negative values', () => {
      const result = Enum.values(NumericEnumNegative);
      expect(result).toEqual([-1, 0, 1]);
    });

    it('should return values for string enum', () => {
      const result = Enum.values(StringEnum);
      expect(result).toEqual(['FIRST', 'SECOND', 'THIRD']);
    });

    it('should return values for string enum with numeric string values', () => {
      const result = Enum.values(StringEnumNumericValues);
      expect(result).toEqual(['123', '456', '789']);
    });

    it('should return values for mixed enum', () => {
      const result = Enum.values(MixedEnum);
      expect(result).toEqual([-1, 0, 1, 'STRING', '999']);
    });

    it('should return values for enum with duplicate values', () => {
      const result = Enum.values(DuplicateValuesEnum);
      expect(result).toEqual(['DUPLICATE', 'DUPLICATE', 'UNIQUE']);
    });

    it('should return values for enum where values match key names', () => {
      const result = Enum.values(SameAsKeyEnum);
      expect(result).toEqual(['First', 'Second', 'Third']);
    });
  });

  describe('entries()', () => {
    it('should return entries for numeric enum with specified values', () => {
      const result = Enum.entries(NumericEnum);
      expect(result).toEqual([
        ['First', 0],
        ['Second', 1],
        ['Third', 2],
      ]);
    });

    it('should return entries for numeric enum with unspecified values', () => {
      const result = Enum.entries(NumericEnumUnspecified);
      expect(result).toEqual([
        ['First', 0],
        ['Second', 1],
        ['Third', 2],
      ]);
    });

    it('should return entries for numeric enum with negative values', () => {
      const result = Enum.entries(NumericEnumNegative);
      expect(result).toEqual([
        ['NegOne', -1],
        ['Zero', 0],
        ['PosOne', 1],
      ]);
    });

    it('should return entries for string enum', () => {
      const result = Enum.entries(StringEnum);
      expect(result).toEqual([
        ['First', 'FIRST'],
        ['Second', 'SECOND'],
        ['Third', 'THIRD'],
      ]);
    });

    it('should return entries for string enum with numeric string values', () => {
      const result = Enum.entries(StringEnumNumericValues);
      expect(result).toEqual([
        ['First', '123'],
        ['Second', '456'],
        ['Third', '789'],
      ]);
    });

    it('should return entries for mixed enum', () => {
      const result = Enum.entries(MixedEnum);
      expect(result).toEqual([
        ['Negative', -1],
        ['Zero', 0],
        ['Positive', 1],
        ['StringValue', 'STRING'],
        ['NumericString', '999'],
      ]);
    });

    it('should return entries for enum with duplicate values', () => {
      const result = Enum.entries(DuplicateValuesEnum);
      expect(result).toEqual([
        ['First', 'DUPLICATE'],
        ['Second', 'DUPLICATE'],
        ['Third', 'UNIQUE'],
      ]);
    });

    it('should return entries for enum where values match key names', () => {
      const result = Enum.entries(SameAsKeyEnum);
      expect(result).toEqual([
        ['First', 'First'],
        ['Second', 'Second'],
        ['Third', 'Third'],
      ]);
    });
  });

  describe('isKey()', () => {
    it('should return true for valid keys in numeric enum', () => {
      expect(Enum.isKey(NumericEnum, 'First')).toBe(true);
      expect(Enum.isKey(NumericEnum, 'Second')).toBe(true);
      expect(Enum.isKey(NumericEnum, 'Third')).toBe(true);
    });

    it('should return false for invalid keys in numeric enum', () => {
      expect(Enum.isKey(NumericEnum, 'Invalid')).toBe(false);
      expect(Enum.isKey(NumericEnum, 0)).toBe(false);
      expect(Enum.isKey(NumericEnum, null)).toBe(false);
      expect(Enum.isKey(NumericEnum, undefined)).toBe(false);
    });

    it('should return true for valid keys in string enum', () => {
      expect(Enum.isKey(StringEnum, 'First')).toBe(true);
      expect(Enum.isKey(StringEnum, 'Second')).toBe(true);
    });

    it('should return false for string enum values as keys', () => {
      expect(Enum.isKey(StringEnum, 'FIRST')).toBe(false);
      expect(Enum.isKey(StringEnum, 'SECOND')).toBe(false);
    });

    it('should return true for valid keys in mixed enum', () => {
      expect(Enum.isKey(MixedEnum, 'Negative')).toBe(true);
      expect(Enum.isKey(MixedEnum, 'StringValue')).toBe(true);
    });

    it('should return true for valid keys in enum with duplicate values', () => {
      expect(Enum.isKey(DuplicateValuesEnum, 'First')).toBe(true);
      expect(Enum.isKey(DuplicateValuesEnum, 'Second')).toBe(true);
    });

    it('should return true for valid keys in enum where values match key names', () => {
      expect(Enum.isKey(SameAsKeyEnum, 'First')).toBe(true);
      expect(Enum.isKey(SameAsKeyEnum, 'Second')).toBe(true);
    });
  });

  describe('createIsKeyGuard()', () => {
    it('should create a guard that returns true for valid keys in numeric enum', () => {
      const isKey = Enum.createIsKeyGuard(NumericEnum);
      expect(isKey('First')).toBe(true);
      expect(isKey('Second')).toBe(true);
      expect(isKey('Third')).toBe(true);
    });

    it('should create a guard that returns false for invalid keys in numeric enum', () => {
      const isKey = Enum.createIsKeyGuard(NumericEnum);
      expect(isKey('Invalid')).toBe(false);
      expect(isKey(0)).toBe(false);
      expect(isKey(null)).toBe(false);
    });

    it('should create a guard that works for string enum', () => {
      const isKey = Enum.createIsKeyGuard(StringEnum);
      expect(isKey('First')).toBe(true);
      expect(isKey('FIRST')).toBe(false);
    });

    it('should create a guard that works for mixed enum', () => {
      const isKey = Enum.createIsKeyGuard(MixedEnum);
      expect(isKey('Negative')).toBe(true);
      expect(isKey('StringValue')).toBe(true);
      expect(isKey(-1)).toBe(false);
    });

    it('should create a guard that is reusable and performant', () => {
      const isKey = Enum.createIsKeyGuard(NumericEnum);
      expect(isKey('First')).toBe(true);
      expect(isKey('First')).toBe(true);
      expect(isKey('Invalid')).toBe(false);
    });
  });

  describe('isValue()', () => {
    it('should return true for valid values in numeric enum', () => {
      expect(Enum.isValue(NumericEnum, 0)).toBe(true);
      expect(Enum.isValue(NumericEnum, 1)).toBe(true);
      expect(Enum.isValue(NumericEnum, 2)).toBe(true);
    });

    it('should return false for invalid values in numeric enum', () => {
      expect(Enum.isValue(NumericEnum, 3)).toBe(false);
      expect(Enum.isValue(NumericEnum, 'First')).toBe(false);
      expect(Enum.isValue(NumericEnum, null)).toBe(false);
    });

    it('should return true for valid values in numeric enum with negative values', () => {
      expect(Enum.isValue(NumericEnumNegative, -1)).toBe(true);
      expect(Enum.isValue(NumericEnumNegative, 0)).toBe(true);
      expect(Enum.isValue(NumericEnumNegative, 1)).toBe(true);
    });

    it('should return true for valid values in string enum', () => {
      expect(Enum.isValue(StringEnum, 'FIRST')).toBe(true);
      expect(Enum.isValue(StringEnum, 'SECOND')).toBe(true);
    });

    it('should return false for keys as values in string enum', () => {
      expect(Enum.isValue(StringEnum, 'First')).toBe(false);
    });

    it('should return true for valid values in string enum with numeric string values', () => {
      expect(Enum.isValue(StringEnumNumericValues, '123')).toBe(true);
      expect(Enum.isValue(StringEnumNumericValues, '456')).toBe(true);
    });

    it('should return true for valid values in mixed enum', () => {
      expect(Enum.isValue(MixedEnum, -1)).toBe(true);
      expect(Enum.isValue(MixedEnum, 'STRING')).toBe(true);
      expect(Enum.isValue(MixedEnum, '999')).toBe(true);
    });

    it('should return true for duplicate values in enum', () => {
      expect(Enum.isValue(DuplicateValuesEnum, 'DUPLICATE')).toBe(true);
      expect(Enum.isValue(DuplicateValuesEnum, 'UNIQUE')).toBe(true);
    });

    it('should return true for values in enum where values match key names', () => {
      expect(Enum.isValue(SameAsKeyEnum, 'First')).toBe(true);
      expect(Enum.isValue(SameAsKeyEnum, 'Second')).toBe(true);
    });
  });

  describe('createIsValueGuard()', () => {
    it('should create a guard that returns true for valid values in numeric enum', () => {
      const isValue = Enum.createIsValueGuard(NumericEnum);
      expect(isValue(0)).toBe(true);
      expect(isValue(1)).toBe(true);
      expect(isValue(2)).toBe(true);
    });

    it('should create a guard that returns false for invalid values in numeric enum', () => {
      const isValue = Enum.createIsValueGuard(NumericEnum);
      expect(isValue(3)).toBe(false);
      expect(isValue('First')).toBe(false);
    });

    it('should create a guard that works for string enum', () => {
      const isValue = Enum.createIsValueGuard(StringEnum);
      expect(isValue('FIRST')).toBe(true);
      expect(isValue('First')).toBe(false);
    });

    it('should create a guard that works for mixed enum', () => {
      const isValue = Enum.createIsValueGuard(MixedEnum);
      expect(isValue(-1)).toBe(true);
      expect(isValue('STRING')).toBe(true);
      expect(isValue('999')).toBe(true);
      expect(isValue(999)).toBe(false);
    });

    it('should create a guard that is reusable and performant', () => {
      const isValue = Enum.createIsValueGuard(NumericEnum);
      expect(isValue(0)).toBe(true);
      expect(isValue(0)).toBe(true);
      expect(isValue(3)).toBe(false);
    });
  });

  describe('map()', () => {
    it('should map over numeric enum entries', () => {
      const result = Enum.map(NumericEnum, (k, v) => `${k}:${v}`);
      expect(result).toEqual(['First:0', 'Second:1', 'Third:2']);
    });

    it('should map over string enum entries', () => {
      const result = Enum.map(StringEnum, (k, v) => ({ key: k, value: v }));
      expect(result).toEqual([
        { key: 'First', value: 'FIRST' },
        { key: 'Second', value: 'SECOND' },
        { key: 'Third', value: 'THIRD' },
      ]);
    });

    it('should map over mixed enum entries', () => {
      const result = Enum.map(MixedEnum, (_k, v) => typeof v);
      expect(result).toEqual(['number', 'number', 'number', 'string', 'string']);
    });

    it('should map over enum with negative values', () => {
      const result = Enum.map(NumericEnumNegative, (_k, v) => v * 2);
      expect(result).toEqual([-2, 0, 2]);
    });

    it('should handle enum with duplicate values', () => {
      const result = Enum.map(DuplicateValuesEnum, (k, v) => `${k}=${v}`);
      expect(result).toEqual(['First=DUPLICATE', 'Second=DUPLICATE', 'Third=UNIQUE']);
    });
  });

  describe('keyOf()', () => {
    it('should find key for value in numeric enum', () => {
      expect(Enum.keyOf(NumericEnum, 0)).toBe('First');
      expect(Enum.keyOf(NumericEnum, 1)).toBe('Second');
      expect(Enum.keyOf(NumericEnum, 2)).toBe('Third');
    });

    it('should return undefined for non-existent value in numeric enum', () => {
      expect(Enum.keyOf(NumericEnum, 3)).toBeUndefined();
      expect(Enum.keyOf(NumericEnum, 'First')).toBeUndefined();
    });

    it('should find key for value in string enum', () => {
      expect(Enum.keyOf(StringEnum, 'FIRST')).toBe('First');
      expect(Enum.keyOf(StringEnum, 'SECOND')).toBe('Second');
    });

    it('should return undefined for keys passed as values in string enum', () => {
      expect(Enum.keyOf(StringEnum, 'First')).toBeUndefined();
    });

    it('should find key for negative values in numeric enum', () => {
      expect(Enum.keyOf(NumericEnumNegative, -1)).toBe('NegOne');
      expect(Enum.keyOf(NumericEnumNegative, 0)).toBe('Zero');
    });

    it('should find key for values in mixed enum', () => {
      expect(Enum.keyOf(MixedEnum, -1)).toBe('Negative');
      expect(Enum.keyOf(MixedEnum, 'STRING')).toBe('StringValue');
      expect(Enum.keyOf(MixedEnum, '999')).toBe('NumericString');
    });

    it('should find first key for duplicate values', () => {
      expect(Enum.keyOf(DuplicateValuesEnum, 'DUPLICATE')).toBe('First');
      expect(Enum.keyOf(DuplicateValuesEnum, 'UNIQUE')).toBe('Third');
    });

    it('should find key in enum where values match key names', () => {
      expect(Enum.keyOf(SameAsKeyEnum, 'First')).toBe('First');
      expect(Enum.keyOf(SameAsKeyEnum, 'Second')).toBe('Second');
    });

    it('should find key for numeric string values', () => {
      expect(Enum.keyOf(StringEnumNumericValues, '123')).toBe('First');
      expect(Enum.keyOf(StringEnumNumericValues, '456')).toBe('Second');
    });
  });

  describe('keyOfStrict()', () => {
    it('should find key for value in numeric enum', () => {
      expect(Enum.keyOfStrict(NumericEnum, 0)).toBe('First');
      expect(Enum.keyOfStrict(NumericEnum, 1)).toBe('Second');
    });

    it('should throw error for non-existent value in numeric enum', () => {
      expect(() => Enum.keyOfStrict(NumericEnum, 3)).toThrow();
      expect(() => Enum.keyOfStrict(NumericEnum, 'First')).toThrow();
    });

    it('should find key for value in string enum', () => {
      expect(Enum.keyOfStrict(StringEnum, 'FIRST')).toBe('First');
      expect(Enum.keyOfStrict(StringEnum, 'SECOND')).toBe('Second');
    });

    it('should throw for keys passed as values in string enum', () => {
      expect(() => Enum.keyOfStrict(StringEnum, 'First')).toThrow();
    });

    it('should find key for values in mixed enum', () => {
      expect(Enum.keyOfStrict(MixedEnum, -1)).toBe('Negative');
      expect(Enum.keyOfStrict(MixedEnum, 'STRING')).toBe('StringValue');
    });

    it('should find first key for duplicate values', () => {
      expect(Enum.keyOfStrict(DuplicateValuesEnum, 'DUPLICATE')).toBe('First');
    });
  });

  describe('keyOfValueToString()', () => {
    it('should find key as string for value in numeric enum', () => {
      expect(Enum.keyOfValueToString(NumericEnum, 0)).toBe('First');
      expect(Enum.keyOfValueToString(NumericEnum, 1)).toBe('Second');
    });

    it('should return undefined for non-existent value', () => {
      expect(Enum.keyOfValueToString(NumericEnum, 3)).toBeUndefined();
    });

    it('should work for string enum', () => {
      expect(Enum.keyOfValueToString(StringEnum, 'FIRST')).toBe('First');
    });

    it('should work for mixed enum', () => {
      expect(Enum.keyOfValueToString(MixedEnum, -1)).toBe('Negative');
      expect(Enum.keyOfValueToString(MixedEnum, 'STRING')).toBe('StringValue');
    });
  });

  describe('valueFromKeyString()', () => {
    it('should find value from key string in numeric enum (case-insensitive)', () => {
      expect(Enum.valueFromKeyString(NumericEnum, 'First')).toBe(0);
      expect(Enum.valueFromKeyString(NumericEnum, 'first')).toBe(0);
      expect(Enum.valueFromKeyString(NumericEnum, 'FIRST')).toBe(0);
      expect(Enum.valueFromKeyString(NumericEnum, 'Second')).toBe(1);
    });

    it('should return undefined for non-existent key string', () => {
      expect(Enum.valueFromKeyString(NumericEnum, 'Invalid')).toBeUndefined();
      expect(Enum.valueFromKeyString(NumericEnum, '0')).toBeUndefined();
    });

    it('should find value from key string in string enum (case-insensitive)', () => {
      expect(Enum.valueFromKeyString(StringEnum, 'First')).toBe('FIRST');
      expect(Enum.valueFromKeyString(StringEnum, 'first')).toBe('FIRST');
      expect(Enum.valueFromKeyString(StringEnum, 'SECOND')).toBe('SECOND');
    });

    it('should find value from key string in mixed enum (case-insensitive)', () => {
      expect(Enum.valueFromKeyString(MixedEnum, 'Negative')).toBe(-1);
      expect(Enum.valueFromKeyString(MixedEnum, 'negative')).toBe(-1);
      expect(Enum.valueFromKeyString(MixedEnum, 'StringValue')).toBe('STRING');
      expect(Enum.valueFromKeyString(MixedEnum, 'numericstring')).toBe('999');
    });

    it('should find value for negative numeric values', () => {
      expect(Enum.valueFromKeyString(NumericEnumNegative, 'NegOne')).toBe(-1);
      expect(Enum.valueFromKeyString(NumericEnumNegative, 'negone')).toBe(-1);
    });

    it('should find value for numeric string values', () => {
      expect(Enum.valueFromKeyString(StringEnumNumericValues, 'First')).toBe('123');
      expect(Enum.valueFromKeyString(StringEnumNumericValues, 'SECOND')).toBe('456');
    });

    it('should work for enum where values match key names', () => {
      expect(Enum.valueFromKeyString(SameAsKeyEnum, 'First')).toBe('First');
      expect(Enum.valueFromKeyString(SameAsKeyEnum, 'first')).toBe('First');
    });

    it('should work for enum with duplicate values', () => {
      expect(Enum.valueFromKeyString(DuplicateValuesEnum, 'First')).toBe('DUPLICATE');
      expect(Enum.valueFromKeyString(DuplicateValuesEnum, 'Second')).toBe('DUPLICATE');
    });
  });
});
