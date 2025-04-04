import { cloneDeep } from "../src/index";

describe("cloneDeep", () => {
	it("creates a deep clone of a simple object", () => {
		const original = { a: 1, b: { c: 2 } };
		const cloned = cloneDeep(original);

		expect(cloned).toEqual(original);
		expect(cloned).not.toBe(original);
		expect(cloned.b).not.toBe(original.b);
	});

	it("handles arrays properly", () => {
		const original = [1, 2, { a: 3 }];
		const cloned = cloneDeep(original);

		expect(cloned).toEqual(original);
		expect(cloned).not.toBe(original);
		expect(cloned[2]).not.toBe(original[2]);
	});

	it("removes functions", () => {
		const original = {
			a: 1,
			b: () => 42,
		};
		const cloned = cloneDeep(original);

		expect(cloned).toEqual({ a: 1 }); // functions are stripped
		expect("b" in cloned).toBe(false);
	});

	it("removes undefined values in objects", () => {
		const original = {
			a: 1,
			b: undefined,
		};
		const cloned = cloneDeep(original);

		expect(cloned).toEqual({ a: 1 }); // 'b' is removed
	});

	it("preserves null values", () => {
		const original = {
			a: null,
		};
		const cloned = cloneDeep(original);

		expect(cloned).toEqual(original);
	});

	it("does not support special types (Date, Map, Set, RegExp)", () => {
		const original = {
			date: new Date("2023-01-01"),
			map: new Map([["a", 1]]),
			set: new Set([1, 2]),
			regex: /abc/,
		};
		const cloned = cloneDeep(original);

		// Date becomes string, Map/Set disappear, RegExp becomes empty object
		expect(typeof cloned.date).toBe("string");
		expect(cloned.map).toBeUndefined();
		expect(cloned.set).toBeUndefined();
		expect(cloned.regex).toEqual({});
	});

	it("works with deeply nested structures", () => {
		const original = { a: { b: { c: [1, 2, 3] } } };
		const cloned = cloneDeep(original);

		expect(cloned).toEqual(original);
		expect(cloned.a.b.c).not.toBe(original.a.b.c);
	});
});
