import { omit } from "../src/index"

describe("omit", () => {
  const user = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    role: "admin",
  }

  it("omits specified keys from an object", () => {
    const result = omit(user, ["email", "role"])
    expect(result).toEqual({ id: 1, name: "Alice" })
  })

  it("returns the same object if no keys are omitted", () => {
    const result = omit(user, [])
    expect(result).toEqual(user)
  })

  it("ignores keys that do not exist in the object", () => {
    const result = omit(user, ["nonexistent" as keyof typeof user])
    expect(result).toEqual(user)
  })

  it("works with a single key", () => {
    const result = omit(user, ["id"])
    expect(result).toEqual({
      name: "Alice",
      email: "alice@example.com",
      role: "admin",
    })
  })

  it("does not mutate the original object", () => {
    const copy = { ...user }
    omit(copy, ["id"])
    expect(copy).toEqual(user) // Ensure original is unchanged
  })

  it("handles empty object input", () => {
    const result = omit({}, [])
    expect(result).toEqual({})
  })

  it("handles nested object values correctly (but does not deep omit)", () => {
    const obj = {
      a: 1,
      b: { nested: true },
      c: "hello",
    }

    const result = omit(obj, ["b"])
    expect(result).toEqual({ a: 1, c: "hello" })
  })
})
