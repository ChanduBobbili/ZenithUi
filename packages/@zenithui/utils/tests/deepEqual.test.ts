import { deepEqual } from "../src/index";

describe("deepEqual", () => {
	// --- Primitives ---
	it("returns true for identical primitives", () => {
		expect(deepEqual(1, 1)).toBe(true);
		expect(deepEqual("a", "a")).toBe(true);
		expect(deepEqual(true, true)).toBe(true);
		expect(deepEqual(null, null)).toBe(true);
		expect(deepEqual(undefined, undefined)).toBe(true);
	});

	it("returns false for different primitives", () => {
		expect(deepEqual(1, 2)).toBe(false);
		expect(deepEqual("a", "b")).toBe(false);
		expect(deepEqual(true, false)).toBe(false);
		expect(deepEqual(null, undefined)).toBe(false);
	});

	// --- NaN handling ---
	it("returns false for NaN compared to NaN (by ===)", () => {
		expect(deepEqual(Number.NaN, Number.NaN)).toBe(false); // as per your current logic
	});

	// --- Objects ---
	it("returns true for shallow equal objects", () => {
		expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true);
	});

	it("returns false for shallow unequal objects", () => {
		expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
	});

	it("returns false for objects with different keys", () => {
		expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false);
	});

	it("returns true for deeply equal nested objects", () => {
		const obj1 = { a: { b: { c: 3 } } };
		const obj2 = { a: { b: { c: 3 } } };
		expect(deepEqual(obj1, obj2)).toBe(true);
	});

	it("returns false for deeply unequal nested objects", () => {
		const obj1 = { a: { b: { c: 3 } } };
		const obj2 = { a: { b: { c: 4 } } };
		expect(deepEqual(obj1, obj2)).toBe(false);
	});

	// --- Arrays ---
	it("returns true for equal arrays", () => {
		expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
	});

	it("returns false for unequal arrays", () => {
		expect(deepEqual([1, 2], [2, 1])).toBe(false);
	});

	it("returns true for nested arrays and objects", () => {
		const a = { x: [1, { y: 2 }], z: 3 };
		const b = { x: [1, { y: 2 }], z: 3 };
		expect(deepEqual(a, b)).toBe(true);
	});

	// --- Arrays vs Objects ---
	it("returns false when comparing object to array", () => {
		expect(deepEqual({}, [])).toBe(false);
		expect(deepEqual([], {})).toBe(false);
	});

	// --- Dates ---
	it("returns true for Date objects with the same time", () => {
		expect(deepEqual(new Date("2020-01-01"), new Date("2020-01-01"))).toBe(
			true,
		);
	});

	// --- Functions ---
	it("returns false for function references even if same logic", () => {
		const fn1 = () => 1;
		const fn2 = () => 1;
		expect(deepEqual(fn1, fn2)).toBe(false);
	});

	// --- Mixed Types ---
	it("returns false for number vs string with same value", () => {
		expect(deepEqual(1, "1")).toBe(false);
	});

	// --- Identical reference ---
	it("returns true when both values are the same reference", () => {
		const obj = { a: 1 };
		expect(deepEqual(obj, obj)).toBe(true);
	});
});
