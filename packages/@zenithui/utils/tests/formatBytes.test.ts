import { formatBytes } from "../src/index";

describe("formatBytes", () => {
	it("returns '0 Bytes' for 0", () => {
		expect(formatBytes(0)).toBe("0 Bytes");
	});

	it("formats bytes to Bytes", () => {
		expect(formatBytes(512)).toBe("512 Bytes");
	});

	it("formats bytes to KB", () => {
		expect(formatBytes(1024)).toBe("1 KB");
		expect(formatBytes(1536)).toBe("1.5 KB");
	});

	it("formats bytes to MB", () => {
		expect(formatBytes(1048576)).toBe("1 MB");
	});

	it("formats bytes to GB", () => {
		expect(formatBytes(1073741824)).toBe("1 GB");
	});

	it("formats bytes to TB", () => {
		expect(formatBytes(1099511627776)).toBe("1 TB");
	});

	it("uses default 2 decimals", () => {
		expect(formatBytes(1234)).toBe("1.21 KB");
	});

	it("respects custom decimal precision", () => {
		expect(formatBytes(1234, 3)).toBe("1.205 KB");
		expect(formatBytes(1234, 0)).toBe("1 KB");
	});

	it("handles large numbers with precision", () => {
		const result = formatBytes(12345678901234);
		expect(result).toMatch(/^\d+(\.\d+)? TB$/);
	});
});
