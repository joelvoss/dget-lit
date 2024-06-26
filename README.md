# dget-lit

Safely get a value from a nested object via a dot-notated path.
In addition you have the ability to provide a fallback value to be returned
if the full key path does not exists or the value is undefined.

## Install

```bash
# Using npm
$ npm install dget-lit

# Using yarn
$ yarn add dget-lit
```

## Example

```ts
import { dget } from 'dget-lit';

let obj = {
  a: {
    two: 2,
    b: {
      three: undefined,
      c: [3, 4, 5],
    },
  },
};

// use string dot notation for keys
dget(obj, 'a.two'); // 2

// or use an array key
dget(obj, ['a', 'two']); // 2

// use a default
dget(obj, 'a.b.three', 'my-default'); // 'my-default'

// to get a value from an array, use `.<index>` or `[<index>]`
dget(obj, 'a.b.c.2'); // 5
dget(obj, 'a.b.c[2]'); // 5
```

## Development

(1) Install dependencies

```bash
# Using npm
$ npm install

# Using yarn
$ yarn
```

(2) Validate setup

```bash
$ ./Taskfile.sh validate
```

(3) Start development by running tests in watch-mode

```bash
$ ./Taskfile.sh test -w
```

---

[node+npm]: https://nodejs.org
