import { useEffect, useRef, useState } from "react";

/**
 * Stores the previous value of a state or prop.
 *
 * @template T - The type of the value.
 * @param value - The current value.
 * @returns The previous value.
 */
export function usePrevious<T>(value: T): T | undefined {
	const ref = useRef<T>(value);
	useEffect(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
}

/**
 * Debounces a value, delaying updates until after a specified time.
 *
 * @template T - The type of the value.
 * @param value - The value to debounce.
 * @param delay - The delay in milliseconds.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(handler);
	}, [value, delay]);

	return debouncedValue;
}

/**
 * A custom React hook that manages a state with a default fallback value.
 *
 * @template T - The type of the state value.
 * @param {T} initialValue - The initial value for the state.
 * @param {T} defaultValue - The default value to use if the state is `undefined` or `null`.
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} A tuple containing the current state
 * and a function to update the state. If the state is `undefined` or `null`, the default value
 * is returned as the current state.
 */
export function useDefault<T>(
	initialValue: T,
	defaultValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [state, setState] = useState<T>(initialValue);

	if (typeof state === "undefined" || state === null) {
		return [defaultValue, setState];
	}

	return [state, setState];
}

/**
 * A custom React hook that sets the document's title to the specified value.
 * @param title - The string to set as the document's title.
 * @example
 * ```tsx
 * useDocumentTitle("My App - Home");
 * ```
 */
export function useDocumentTitle(title: string) {
	useEffect(() => {
		document.title = title;
	}, [title]);
}

/**
 * A custom React hook to dynamically update the favicon of the document.
 * @param url - The URL of the favicon to be set. This can be an absolute or relative path to the favicon image.
 * @example
 * ```tsx
 * useFavicon('/path/to/favicon.ico');
 * ```
 */
export function useFavicon(url: string) {
	useEffect(() => {
		let link = document.querySelector(
			`link[rel~="icon"]`,
		) as HTMLLinkElement | null;

		if (!link) {
			link = document.createElement("link") as HTMLLinkElement;
			link.type = "image/x-icon";
			link.rel = "icon";
			link.href = url;
			document.head.appendChild(link);
		} else {
			link.href = url;
		}
	}, [url]);
}
