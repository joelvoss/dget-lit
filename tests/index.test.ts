import { describe, expect, test } from 'vitest';
import { dget } from '../src/index';

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
	test(`as dot-notated string`, () => {
		expect(dget(obj, 'a.two')).toStrictEqual(obj.a.two);
		expect(dget(obj, 'a.arr.2')).toStrictEqual(obj.a.arr[2]);
		expect(dget(obj, 'a.arr[1]')).toStrictEqual(obj.a.arr[1]);
	});
	test(`as array`, () => {
		expect(dget(obj, ['a', 'two'])).toStrictEqual(obj.a.two);
	});
});

describe('no default', () => {
	test(`dget(obj, '')`, () => {
		expect(dget(obj, '')).toStrictEqual(undefined);
	});
	test(`dget(obj, 'undef')`, () => {
		expect(dget(obj, 'undef')).toStrictEqual(obj.undef);
	});
	test(`dget(obj, 'zero')`, () => {
		expect(dget(obj, 'zero')).toStrictEqual(obj.zero);
	});
	test(`dget(obj, 'one')`, () => {
		expect(dget(obj, 'one')).toStrictEqual(obj.one);
	});
	test(`dget(obj, 'one.two')`, () => {
		expect(dget(obj, 'one.two')).toStrictEqual(undefined);
	});
	test(`dget(obj, 'a')`, () => {
		expect(dget(obj, 'a')).toStrictEqual(obj.a);
	});
	test(`dget(obj, 'a.two')`, () => {
		expect(dget(obj, 'a.two')).toStrictEqual(obj.a.two);
	});
	test(`dget(obj, 'a.b')`, () => {
		expect(dget(obj, 'a.b')).toStrictEqual(obj.a.b);
	});
	test(`dget(obj, 'a.b.three')`, () => {
		expect(dget(obj, 'a.b.three')).toStrictEqual(obj.a.b.three);
	});
	test(`dget(obj, 'a.b.c')`, () => {
		expect(dget(obj, 'a.b.c')).toStrictEqual(obj.a.b.c);
	});
	test(`dget(obj, 'a.b.c.four')`, () => {
		expect(dget(obj, 'a.b.c.four')).toStrictEqual(obj.a.b.c.four);
	});
	test(`dget(obj, 'n')`, () => {
		expect(dget(obj, 'n')).toStrictEqual(obj.n);
	});
	test(`dget(obj, 'n.badkey')`, () => {
		expect(dget(obj, 'n.badkey')).toStrictEqual(undefined);
	});
	test(`dget(obj, 'f')`, () => {
		expect(dget(obj, 'f')).toStrictEqual(false);
	});
	test(`dget(obj, 'f.badkey')`, () => {
		expect(dget(obj, 'f.badkey')).toStrictEqual(undefined);
	});
});

describe('with default', () => {
	test(`dget(obj, '', 'foo')`, () => {
		expect(dget(obj, '', 'foo')).toStrictEqual('foo');
	});
	test(`dget(obj, 'undef', 'foo')`, () => {
		expect(dget(obj, 'undef', 'foo')).toStrictEqual('foo');
	});
	test(`dget(obj, 'zero', 'foo')`, () => {
		expect(dget(obj, 'zero', 'foo')).toStrictEqual(obj.zero);
	});
	test(`dget(obj, 'one', 'foo')`, () => {
		expect(dget(obj, 'one', 'foo')).toStrictEqual(obj.one);
	});
	test(`dget(obj, 'one.two', 'foo')`, () => {
		expect(dget(obj, 'one.two', 'foo')).toStrictEqual('foo');
	});
	test(`dget(obj, 'a', 'foo')`, () => {
		expect(dget(obj, 'a', 'foo')).toStrictEqual(obj.a);
	});
	test(`dget(obj, 'a.two', 'foo')`, () => {
		expect(dget(obj, 'a.two', 'foo')).toStrictEqual(obj.a.two);
	});
	test(`dget(obj, 'a.b', 'foo')`, () => {
		expect(dget(obj, 'a.b', 'foo')).toStrictEqual(obj.a.b);
	});
	test(`dget(obj, 'a.b.three', 'foo')`, () => {
		expect(dget(obj, 'a.b.three', 'foo')).toStrictEqual(obj.a.b.three);
	});
	test(`dget(obj, 'a.b.c', 'foo')`, () => {
		expect(dget(obj, 'a.b.c', 'foo')).toStrictEqual(obj.a.b.c);
	});
	test(`dget(obj, 'a.b.c.four', 'foo')`, () => {
		expect(dget(obj, 'a.b.c.four', 'foo')).toStrictEqual(obj.a.b.c.four);
	});
	test(`dget(obj, 'n', 'foo')`, () => {
		expect(dget(obj, 'n', 'foo')).toStrictEqual(obj.n);
	});
	test(`dget(obj, 'n.badkey', 'foo')`, () => {
		expect(dget(obj, 'n.badkey', 'foo')).toStrictEqual('foo');
	});
	test(`dget(obj, 'f', 'foo')`, () => {
		expect(dget(obj, 'f', 'foo')).toStrictEqual(false);
	});
	test(`dget(obj, 'f.badkey', 'foo')`, () => {
		expect(dget(obj, 'f.badkey', 'foo')).toStrictEqual('foo');
	});
});

describe('throws', () => {
	test(`dget(obj, undefined)`, () => {
		// @ts-expect-error - Testing for error
		expect(() => dget(obj, undefined)).toThrow(TypeError);
	});
	test(`dget(obj, undefined, 'foo')`, () => {
		// @ts-expect-error - Testing for error
		expect(() => dget(obj, undefined, 'foo')).toThrow(TypeError);
	});
});

describe(`check undefined obj doesn't throw errors and uses default`, () => {
	test(`dget(undefined, 'one')`, () => {
		// @ts-expect-error - Testing for error
		expect(dget(undefined, 'one')).toStrictEqual(undefined);
	});
	test(`dget(undefined, 'one', 'foo')`, () => {
		// @ts-expect-error - Testing for error
		expect(dget(undefined, 'one', 'foo')).toStrictEqual('foo');
	});
});
