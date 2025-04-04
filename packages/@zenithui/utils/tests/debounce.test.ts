import { debounce } from "../src/index";

jest.useFakeTimers();

describe("debounce", () => {
	it("calls the function after the specified delay", () => {
		const mockFn = jest.fn();
		const debounced = debounce(mockFn, 500);

		debounced();
		expect(mockFn).not.toHaveBeenCalled();

		jest.advanceTimersByTime(499);
		expect(mockFn).not.toHaveBeenCalled();

		jest.advanceTimersByTime(1);
		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it("resets the timer if called again before delay", () => {
		const mockFn = jest.fn();
		const debounced = debounce(mockFn, 300);

		debounced();
		jest.advanceTimersByTime(100);

		debounced();
		jest.advanceTimersByTime(100);

		debounced();
		jest.advanceTimersByTime(300);

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it("passes arguments to the original function", () => {
		const mockFn = jest.fn();
		const debounced = debounce(mockFn, 200);

		debounced("hello", 42);
		jest.advanceTimersByTime(200);

		expect(mockFn).toHaveBeenCalledWith("hello", 42);
	});

	it("handles multiple independent debounced functions", () => {
		const fn1 = jest.fn();
		const fn2 = jest.fn();

		const debounced1 = debounce(fn1, 100);
		const debounced2 = debounce(fn2, 200);

		debounced1();
		debounced2();

		jest.advanceTimersByTime(100);
		expect(fn1).toHaveBeenCalledTimes(1);
		expect(fn2).not.toHaveBeenCalled();

		jest.advanceTimersByTime(100);
		expect(fn2).toHaveBeenCalledTimes(1);
	});
});
