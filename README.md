# ts-enum

> Type-safe TypeScript enum utilities with perfect type inference and zero dependencies

[![npm version](https://img.shields.io/npm/v/@castral/ts-enum.svg)](https://www.npmjs.com/package/ts-enum)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@castral/ts-enum@1.0.0)](https://bundlephobia.com/package/@castral/ts-enum@1.0.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why Another Enum Library?

**Because existing solutions are over-engineered.** Popular enum libraries use wrapper objects, WeakMaps, and type assertions to work around TypeScript's limitations. This library takes a different approach: **work *with* TypeScript's type system, not against it.**

```typescript
import { Enum } from '@castral/ts-enum';

enum Status { Idle = 0, Running = 1, Complete = 2 }

// ✅ Perfect type inference - no casts needed
const keys = Enum.keys(Status);      // ("Idle" | "Running" | "Complete")[]
const values = Enum.values(Status);  // Status[] (= (0 | 1 | 2)[])

// ✅ Literal types preserved through type guards
const value = 'Running';
if (Enum.isValue(Status, value)) {
  // value is narrowed to Status (not just string!)
}

// ✅ TypeScript proves unreachable code
const invalid = 99;
if (Enum.isValue(Status, invalid)) {
  // Type: never - TypeScript knows this will never execute!
}
```

## Features

- 🎯 **Perfect Type Inference** - Literal union types, not generic `string[]` or `number[]`
- 🔍 **Exact Member Narrowing** - Type guards narrow to specific enum members, not just unions
- ⚡ **Zero Dependencies** - No external packages, just pure TypeScript
- 📦 **Tiny Bundle** - ~1KB minified, tree-shakeable
- 🛡️ **Type-Safe** - Works with single Enums as well as unions of Enums, ie: `typeof FirstEnum | typeof SecondEnum`
- ✅ **Compile-Time Proof** - TypeScript mathematically proves correctness
- 🔧 **Works Everywhere** - Numeric enums, string enums, and mixed enums

## Installation

```bash
npm install @castral/ts-enum
```

```bash
yarn add @castral/ts-enum
```

```bash
pnpm add @castral/ts-enum
```

## Quick Start

```typescript
import { Enum } from '@castral/ts-enum';

enum Priority {
  Low = 1,
  Medium = 2,
  High = 3
}

// Get enum keys with exact literal types
const keys = Enum.keys(Priority);
// Type: ("Low" | "Medium" | "High")[]
// Value: ["Low", "Medium", "High"]

// Get enum values with exact literal types
const values = Enum.values(Priority);
// Type: Priority[] (= (1 | 2 | 3)[])
// Value: [1, 2, 3]

// Type-safe validation
function handlePriority(value: unknown) {
  if (Enum.isValue(Priority, value)) {
    // value is narrowed to Priority
    console.log('Valid priority:', value);
  }
}
```

## API Reference

### `Enum.keys<E>(enum)`

Returns an array of enum keys with exact literal types.

```typescript
enum Status { Idle = 0, Running = 1 }

const keys = Enum.keys(Status);
// Type: ("Idle" | "Running")[]
// Not: string[] ❌
```

### `Enum.values<E>(enum)`

Returns an array of enum values with exact literal types.

```typescript
enum Status { Idle = 0, Running = 1 }

const values = Enum.values(Status);
// Type: Status[] (= (0 | 1)[])
// Not: (string | number)[] ❌
```

### `Enum.entries<E>(enum)`

Returns an array of `[key, value]` tuples with exact types.

```typescript
enum Status { Idle = 0, Running = 1 }

const entries = Enum.entries(Status);
// Type: [("Idle" | "Running"), Status][]
// Value: [["Idle", 0], ["Running", 1]]
```

### `Enum.isKey<E>(enum, key)`

Type guard that narrows to exact enum keys.

```typescript
enum Status { Idle = 0, Running = 1 }

function parse(key: unknown) {
  if (Enum.isKey(Status, key)) {
    const val = Status[key];
    console.log(`Status is ${key}: ${val}`);
  }
}

// Must exactly match enum key
const invalid = 'idle';
if (Enum.isKey(Status, invalid)) {
  // Type: never - this will never execute!
}
```

### `Enum.isValue<E>(enum, value)`

Type guard that narrows to exact enum values.

```typescript
enum Status { Idle = 0, Running = 1 }

function process(value: unknown) {
  if (Enum.isValue(Status, value)) {
    // value is narrowed to Status
    switch (value) {
      case Status.Idle:    // ✅ Type-safe
      case Status.Running: // ✅ Type-safe
    }
  }
}

const invalid = 99;
if (Enum.isValue(Status, invalid)) {
  // Type: never - this will never execute!
}
```

### `Enum.createIsKeyGuard<E>(enum)`

Creates a reusable key type guard with cached keys (O(1) lookup).

```typescript
enum Status { Idle = 0, Running = 1 }

const isStatus = Enum.createIsKeyGuard(Status);

// Use in hot paths for better performance
if (isStatus(key)) {
  // key is narrowed to Status
}
```

### `Enum.createIsValueGuard<E>(enum)`

Creates a reusable value type guard with cached values (O(1) lookup).

```typescript
enum Status { Idle = 0, Running = 1 }

const isStatus = Enum.createIsValueGuard(Status);

// Use in hot paths for better performance
if (isStatus(value)) {
  // value is narrowed to Status
}
```

### `Enum.map<E, T>(enum, fn)`

Transform enum entries with type-safe callback.

```typescript
enum Priority { Low = 1, Medium = 2, High = 3 }

const options = Enum.map(Priority, (key, value) => ({
  label: key,        // Type: "Low" | "Medium" | "High"
  value: value,      // Type: 1 | 2 | 3
  priority: value
}));
```

### `Enum.keyOf<E>(enum, value)`

Reverse lookup: get key from value.

```typescript
enum Status { Idle = 0, Running = 1 }

const key = Enum.keyOf(Status, 1);
// Type: ("Idle" | "Running") | undefined
// Value: "Running"
```

### `Enum.keyOfStrict<E>(enum, value)`

Strict reverse lookup: throws if value not found.

```typescript
enum Status { Idle = 0, Running = 1 }

const key = Enum.keyOfStrict(Status, 1);
// Type: "Idle" | "Running"
// Throws if value is not 0 or 1
```

### `Enum.keyOfValueToString<E>(enum, value)`

Convert enum value to string key.

```typescript
enum Status { Idle = 0, Running = 1 }

const str = Enum.keyOfValueToString(Status, Status.Idle);
// Type: string | undefined
// Value: "Idle"
```

### `Enum.valueOfKey<E>(enum, Key<E>)`

```typescript
enum Status { Idle = 0, Running = 1 }

const value = Enum.valueOfKey(Status, Enum.keys(Status)[1] ?? 'Idle');
// Type: Status
// Value: 1
```

### `Enum.get<E>(enum, key: unknown)`

```typescript
enum Status { Idle = 0, Running = 1 }

const currentStatus: string | undefined = 'Running';

const value = Enum.get(Status, currentStatus);
// Type: Status | undefined
// Value: 1
```

### `Enum.valueOfKeyFromString<E>(enum, string)`

Parse string to enum value (case-insensitive).

```typescript
enum Status { Idle = 0, Running = 1 }

const value = Enum.valueFromKeyString(Status, 'idle');
// Type: Status | undefined
// Value: 0
```

## Advanced Type Inference

### Exact Member Narrowing

Unlike other libraries, `ts-enum` narrows to **exact enum members**, not just the union type.

```typescript
enum Color { Red = 'red', Blue = 'blue' }

const literal = 'red';

if (Enum.isValue(Color, literal)) {
  // Other libraries: literal has type Color (= Color.Red | Color.Blue)
  // This library:    literal has type Color.Red
  
  const exact: Color.Red = literal;  // ✅ Works!
}
```

### Literal Type Preservation

TypeScript can prove compile-time value mappings.

```typescript
enum Status { Idle = 0, Running = 1 }

const value = 0;  // Literal type: 0

if (Enum.isValue(Status, value)) {
  // value is proven to be Status.Idle at compile time
  const idle: Status.Idle = value;  // ✅ No cast needed
}

const invalid = 99;  // Literal type: 99

if (Enum.isValue(Status, invalid)) {
  const x = invalid;  // Type: never
  // This code is unreachable!
}
```

### Type Helpers

Extract types from enums at compile time.

```typescript
enum Status { Idle = 0, Running = 1, Complete = 2 }

type StatusKey = Enum.Key<typeof Status>;
// = "Idle" | "Running" | "Complete"

type StatusValue = Enum.Value<typeof Status>;
// = Status.Idle | Status.Running | Status.Complete
// = 0 | 1 | 2
```

### vs. Native Object Methods

```typescript
enum Status { Idle = 0, Running = 1 }

// ❌ Object.keys() - loses type information
Object.keys(Status)     // string[] (includes "0", "1")
Object.values(Status)   // (string | number)[]

// ✅ Enum utilities - preserves exact types
Enum.keys(Status)       // ("Idle" | "Running")[]
Enum.values(Status)     // Status[] (= (0 | 1)[])
```

## Use Cases

### Compile-Time Configuration

```typescript
enum AgentPaths {
  dashboard = 'Agent Dashboard',
}

enum StreamPaths {
  overview = 'Stream Overview',
}

const Outlets = {
  agent: AgentPaths,
  stream: StreamPaths,
} as const;

interface Route<T extends keyof typeof Outlets> {
  component: any;
  outlet: T;
  path: Enum.Key<Enum.EnumLike<(typeof Outlets)[T]>>;
}

const ROUTES: (Route<'agent'> | Route<'stream'>)[] = [
  {
    component: AgentDashboard,
    outlet: 'agent',
    // Type is typeof AgentPaths
    path: 'dashboard', // Can't be 'overview'
  },
  {
    component: StreamOverview,
    outlet: 'stream',
    // Type is typeof StreamPaths
    path: 'overview', // Can't be 'dashboard'
  },
] as const;

const currentPath = 'dashboard';
Object.keys(Outlets).forEach((outlet) => {
  // Type is: typeof AgentPaths | typeof StreamPaths
  const titleEnum = Outlets[outlet as keyof typeof Outlets]; 
  const pageTitle = Enum.get(titleEnum, currentPath) ?? 'Unknown Page';
})
```

### Form Select Options

```typescript
enum Priority { Low = 1, Medium = 2, High = 3 }

const options = Enum.map(Priority, (key, value) => ({
  label: key,
  value: value,
  color: value === Priority.High ? 'red' : 'gray'
}));

// Type: { label: "Low" | "Medium" | "High", value: 1 | 2 | 3, color: string }[]
```

### API Validation

```typescript
enum HttpStatus {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404
}

const isHttpStatus = Enum.createIsValueGuard(HttpStatus);

function handleResponse(status: number) {
  if (isHttpStatus(status)) {
    // status is narrowed to HttpStatus
    console.log(`Status: ${Enum.keyOf(HttpStatus, status)}`);
  } else {
    console.error('Unknown status code');
  }
}
```

### Exhaustive Switching

```typescript
enum Action { Create = 'create', Update = 'update', Delete = 'delete' }

function handle(action: Action) {
  switch (action) {
    case Action.Create:
      return 'creating';
    case Action.Update:
      return 'updating';
    case Action.Delete:
      return 'deleting';
    // TypeScript enforces exhaustiveness - no default needed!
  }
}
```

### Runtime Validation

```typescript
enum Role { Admin = 'admin', User = 'user', Guest = 'guest' }

function parseRole(input: unknown): Role {
  if (Enum.isValue(Role, input)) {
    return input;  // Type: Role
  }
  throw new Error(`Invalid role: ${input}`);
}
```

## Works With All Enum Types

### Numeric Enums

```typescript
enum Status { Idle = 0, Running = 1, Complete = 2 }

Enum.keys(Status)    // ("Idle" | "Running" | "Complete")[]
Enum.values(Status)  // (0 | 1 | 2)[]
```

### String Enums

```typescript
enum Color { Red = 'red', Blue = 'blue', Green = 'green' }

Enum.keys(Color)    // ("Red" | "Blue" | "Green")[]
Enum.values(Color)  // ("red" | "blue" | "green")[]
```

### Mixed Enums

```typescript
enum Mixed { A = 1, B = 2, C = 'c', D = 'd' }

Enum.keys(Mixed)    // ("A" | "B" | "C" | "D")[]
Enum.values(Mixed)  // (1 | 2 | "c" | "d")[]
```

## TypeScript Configuration

For best results, use strict mode:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

## Why This Works

This library leverages TypeScript's type system correctly:

1. **No wrapper objects** - Direct enum access preserves type information
2. **Proper type predicates** - `v is E[keyof E & string]` enables narrowing
3. **Literal type preservation** - TypeScript can prove exact value mappings
4. **Control flow analysis** - Type guards work with TypeScript's narrowing

Other libraries fight the type system with runtime structures (WeakMaps, wrappers) and type assertions. This library works *with* TypeScript to let it prove correctness.

## Contributing

Contributions welcome! Please open an issue or PR.

## License

MIT © Cas Argilla

---

**Note:** This library does not work with `const enum` because const enums are compile-time only and have no runtime representation. Use regular enums instead.
