import { groupBy } from "../src/index";

type User = {
	id: number;
	role: string;
	name: string;
};

describe("groupBy", () => {
	const users: User[] = [
		{ id: 1, name: "Alice", role: "admin" },
		{ id: 2, name: "Bob", role: "user" },
		{ id: 3, name: "Charlie", role: "admin" },
		{ id: 4, name: "David", role: "user" },
	];

	it("groups by string key", () => {
		const grouped = groupBy(users, "role");
		expect(Object.keys(grouped)).toEqual(["admin", "user"]);
		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		expect(grouped["admin"].length).toBe(2);
		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		expect(grouped["user"].length).toBe(2);
	});

	it("groups by numeric key", () => {
		const grouped = groupBy(users, "id");
		expect(Object.keys(grouped)).toEqual(["1", "2", "3", "4"]);
		expect(grouped["1"][0].name).toBe("Alice");
	});

	it("returns empty object for empty array", () => {
		const grouped = groupBy([], "role");
		expect(grouped).toEqual({});
	});

	it("handles single item array", () => {
		const grouped = groupBy([{ id: 1, name: "Alice", role: "admin" }], "role");
		expect(grouped).toEqual({
			admin: [{ id: 1, name: "Alice", role: "admin" }],
		});
	});

	it("groups correctly with duplicate key values", () => {
		const data = [
			{ name: "a", value: 1 },
			{ name: "b", value: 1 },
			{ name: "c", value: 2 },
		];
		const grouped = groupBy(data, "value");
		expect(grouped["1"].length).toBe(2);
		expect(grouped["2"].length).toBe(1);
	});

	it("coerces keys to string (e.g., undefined/null)", () => {
		const data = [
			{ name: "a", group: undefined },
			{ name: "b", group: null },
			{ name: "c", group: "sales" },
		] as { name: string; group: string | null | undefined }[];
		const grouped = groupBy(data, "group");
		expect(Object.keys(grouped)).toEqual(["undefined", "null", "sales"]);
	});
});
