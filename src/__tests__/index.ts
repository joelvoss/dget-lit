import { dget } from '../index';

const obj = {
  undef: undefined,
  zero: 0,
  one: 1,
  n: null,
  f: false,
  a: {
    two: 2,
    b: {
      three: 3,
      c: {
        four: 4,
      },
    },
    arr: [5, 6, 'seven'],
  },
};

describe('key notation', () => {
  it(`as dot-notated string`, () => {
    expect(dget(obj, 'a.two')).toStrictEqual(obj.a.two);
    expect(dget(obj, 'a.arr.2')).toStrictEqual(obj.a.arr[2]);
    expect(dget(obj, 'a.arr[1]')).toStrictEqual(obj.a.arr[1]);
  });
  it(`as array`, () => {
    expect(dget(obj, ['a', 'two'])).toStrictEqual(obj.a.two);
  });
});

describe('no default', () => {
  it(`dget(obj, '')`, () => {
    expect(dget(obj, '')).toStrictEqual(undefined);
  });
  it(`dget(obj, 'undef')`, () => {
    expect(dget(obj, 'undef')).toStrictEqual(obj.undef);
  });
  it(`dget(obj, 'zero')`, () => {
    expect(dget(obj, 'zero')).toStrictEqual(obj.zero);
  });
  it(`dget(obj, 'one')`, () => {
    expect(dget(obj, 'one')).toStrictEqual(obj.one);
  });
  it(`dget(obj, 'one.two')`, () => {
    expect(dget(obj, 'one.two')).toStrictEqual(undefined);
  });
  it(`dget(obj, 'a')`, () => {
    expect(dget(obj, 'a')).toStrictEqual(obj.a);
  });
  it(`dget(obj, 'a.two')`, () => {
    expect(dget(obj, 'a.two')).toStrictEqual(obj.a.two);
  });
  it(`dget(obj, 'a.b')`, () => {
    expect(dget(obj, 'a.b')).toStrictEqual(obj.a.b);
  });
  it(`dget(obj, 'a.b.three')`, () => {
    expect(dget(obj, 'a.b.three')).toStrictEqual(obj.a.b.three);
  });
  it(`dget(obj, 'a.b.c')`, () => {
    expect(dget(obj, 'a.b.c')).toStrictEqual(obj.a.b.c);
  });
  it(`dget(obj, 'a.b.c.four')`, () => {
    expect(dget(obj, 'a.b.c.four')).toStrictEqual(obj.a.b.c.four);
  });
  it(`dget(obj, 'n')`, () => {
    expect(dget(obj, 'n')).toStrictEqual(obj.n);
  });
  it(`dget(obj, 'n.badkey')`, () => {
    expect(dget(obj, 'n.badkey')).toStrictEqual(undefined);
  });
  it(`dget(obj, 'f')`, () => {
    expect(dget(obj, 'f')).toStrictEqual(false);
  });
  it(`dget(obj, 'f.badkey')`, () => {
    expect(dget(obj, 'f.badkey')).toStrictEqual(undefined);
  });
});

describe('with default', () => {
  it(`dget(obj, '', 'foo')`, () => {
    expect(dget(obj, '', 'foo')).toStrictEqual('foo');
  });
  it(`dget(obj, 'undef', 'foo')`, () => {
    expect(dget(obj, 'undef', 'foo')).toStrictEqual('foo');
  });
  it(`dget(obj, 'zero', 'foo')`, () => {
    expect(dget(obj, 'zero', 'foo')).toStrictEqual(obj.zero);
  });
  it(`dget(obj, 'one', 'foo')`, () => {
    expect(dget(obj, 'one', 'foo')).toStrictEqual(obj.one);
  });
  it(`dget(obj, 'one.two', 'foo')`, () => {
    expect(dget(obj, 'one.two', 'foo')).toStrictEqual('foo');
  });
  it(`dget(obj, 'a', 'foo')`, () => {
    expect(dget(obj, 'a', 'foo')).toStrictEqual(obj.a);
  });
  it(`dget(obj, 'a.two', 'foo')`, () => {
    expect(dget(obj, 'a.two', 'foo')).toStrictEqual(obj.a.two);
  });
  it(`dget(obj, 'a.b', 'foo')`, () => {
    expect(dget(obj, 'a.b', 'foo')).toStrictEqual(obj.a.b);
  });
  it(`dget(obj, 'a.b.three', 'foo')`, () => {
    expect(dget(obj, 'a.b.three', 'foo')).toStrictEqual(obj.a.b.three);
  });
  it(`dget(obj, 'a.b.c', 'foo')`, () => {
    expect(dget(obj, 'a.b.c', 'foo')).toStrictEqual(obj.a.b.c);
  });
  it(`dget(obj, 'a.b.c.four', 'foo')`, () => {
    expect(dget(obj, 'a.b.c.four', 'foo')).toStrictEqual(obj.a.b.c.four);
  });
  it(`dget(obj, 'n', 'foo')`, () => {
    expect(dget(obj, 'n', 'foo')).toStrictEqual(obj.n);
  });
  it(`dget(obj, 'n.badkey', 'foo')`, () => {
    expect(dget(obj, 'n.badkey', 'foo')).toStrictEqual('foo');
  });
  it(`dget(obj, 'f', 'foo')`, () => {
    expect(dget(obj, 'f', 'foo')).toStrictEqual(false);
  });
  it(`dget(obj, 'f.badkey', 'foo')`, () => {
    expect(dget(obj, 'f.badkey', 'foo')).toStrictEqual('foo');
  });
});

describe('throws', () => {
  it(`dget(obj, undefined)`, () => {
    // @ts-ignore
    expect(() => dget(obj, undefined)).toThrow(TypeError);
  });
  it(`dget(obj, undefined, 'foo')`, () => {
    // @ts-ignore
    expect(() => dget(obj, undefined, 'foo')).toThrow(TypeError);
  });
});

describe(`check undefined obj doesn't throw errors and uses default`, () => {
  it(`dget(undefined, 'one')`, () => {
    // @ts-ignore
    expect(dget(undefined, 'one')).toStrictEqual(undefined);
  });
  it(`dget(undefined, 'one', 'foo')`, () => {
    // @ts-ignore
    expect(dget(undefined, 'one', 'foo')).toStrictEqual('foo');
  });
});
