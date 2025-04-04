import { capitalize } from "../src/index"

describe("capitalize", () => {
  it("capitalizes a single lowercase word", () => {
    expect(capitalize("hello")).toBe("Hello")
  })

  it("capitalizes each word in a multi-word string", () => {
    expect(capitalize("hello world")).toBe("Hello World")
  })

  it("handles uppercase input", () => {
    expect(capitalize("HELLO WORLD")).toBe("Hello World")
  })

  it("handles mixed case input", () => {
    expect(capitalize("hELLo WoRLd")).toBe("Hello World")
  })

  it("handles empty string", () => {
    expect(capitalize("")).toBe("")
  })

  it("preserves spacing between words", () => {
    expect(capitalize("  hello   world  ")).toBe("  Hello   World  ")
  })

  it("handles single letter words", () => {
    expect(capitalize("a b c")).toBe("A B C")
  })

  it("handles non-alphabetic characters", () => {
    expect(capitalize("hello-world")).toBe("Hello-world") // hyphen untouched
  })
})
