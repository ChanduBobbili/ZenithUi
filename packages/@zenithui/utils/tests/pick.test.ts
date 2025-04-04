import { pick } from "../src/index";

describe("pick", () => {
	const user = {
		id: 1,
		name: "Alice",
		email: "alice@example.com",
		role: "admin",
	};

	it("picks specified keys from an object", () => {
		const result = pick(user, ["id", "name"]);
		expect(result).toEqual({ id: 1, name: "Alice" });
	});

	it("returns an empty object if no keys are passed", () => {
		const result = pick(user, []);
		expect(result).toEqual({});
	});

	it("ignores keys that don't exist in the object", () => {
		const result = pick(user, ["id", "nonexistent" as keyof typeof user]);
		expect(result).toEqual({ id: 1 }); // "nonexistent" is ignored
	});

	it("works with a single key", () => {
		const result = pick(user, ["email"]);
		expect(result).toEqual({ email: "alice@example.com" });
	});

	it("handles nested objects as values", () => {
		const obj = {
			a: 1,
			b: { nested: true },
			c: "test",
		};
		const result = pick(obj, ["b"]);
		expect(result).toEqual({ b: { nested: true } });
	});

	it("preserves types properly", () => {
		const obj = {
			id: 123,
			active: true,
		};

		const result = pick(obj, ["active"]);
		expect(result).toEqual({ active: true });
	});
});
