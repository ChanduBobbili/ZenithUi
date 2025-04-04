import { uniqueByKey } from "../src/index";

type User = {
	id: number;
	name: string;
	email?: string;
};

describe("uniqueByKey", () => {
	const users: User[] = [
		{ id: 1, name: "Alice", email: "a@example.com" },
		{ id: 2, name: "Bob", email: "b@example.com" },
		{ id: 1, name: "Alice", email: "a2@example.com" },
		{ id: 4, name: "Charlie", email: "c@example.com" },
		{ id: 5, name: "Bob", email: "b2@example.com" },
	];

	it('removes duplicates based on the "name" key', () => {
		const result = uniqueByKey(users, "name");
		expect(result).toHaveLength(3);
		expect(result.map((u) => u.name)).toEqual(["Alice", "Bob", "Charlie"]);
	});

	it('removes duplicates based on the "id" key', () => {
		const result = uniqueByKey(users, "id");
		expect(result).toHaveLength(4); // 1, 2, 4, 5
		expect(result.map((u) => u.id)).toEqual([1, 2, 4, 5]);
	});

	it('removes duplicates based on the "name" key', () => {
		const result = uniqueByKey(users, "name");
		expect(result).toHaveLength(3); // Alice, Bob, Charlie
		expect(result.map((u) => u.name)).toEqual(["Alice", "Bob", "Charlie"]);
	});

	it("returns an empty array when given an empty array", () => {
		expect(uniqueByKey([], "id")).toEqual([]);
	});

	it("returns same array when all keys are unique", () => {
		const input = [
			{ id: 1, name: "A" },
			{ id: 2, name: "B" },
			{ id: 3, name: "C" },
		];
		const result = uniqueByKey(input, "id");
		expect(result).toEqual(input);
	});

	it("handles undefined key values correctly", () => {
		const input: User[] = [
			{ id: 1, name: "A" },
			{ id: 2, name: "B", email: undefined },
			{ id: 3, name: "C", email: undefined },
		];
		const result = uniqueByKey(input, "email");
		expect(result).toHaveLength(1); // one with undefined, one with defined
	});

	it("preserves the first occurrence", () => {
		const result = uniqueByKey(users, "id");
		expect(result.find((u) => u.id === 1)?.name).toBe("Alice");
		expect(result.find((u) => u.id === 2)?.name).toBe("Bob");
	});
});
