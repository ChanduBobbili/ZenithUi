import { sortByKey } from "../src/index"

type User = {
  id: number
  name: string
  age: number
}

describe("sortByKey", () => {
  const users: User[] = [
    { id: 3, name: "Alice", age: 30 },
    { id: 1, name: "Charlie", age: 25 },
    { id: 2, name: "Bob", age: 35 },
  ]

  it("sorts by numeric key in ascending order", () => {
    const sorted = sortByKey(users.slice(), "id", "asc")
    expect(sorted.map((u) => u.id)).toEqual([1, 2, 3])
  })

  it("sorts by numeric key in descending order", () => {
    const sorted = sortByKey(users.slice(), "id", "desc")
    expect(sorted.map((u) => u.id)).toEqual([3, 2, 1])
  })

  it("sorts by string key in ascending order", () => {
    const sorted = sortByKey(users.slice(), "name", "asc")
    expect(sorted.map((u) => u.name)).toEqual(["Alice", "Bob", "Charlie"])
  })

  it("sorts by string key in descending order", () => {
    const sorted = sortByKey(users.slice(), "name", "desc")
    expect(sorted.map((u) => u.name)).toEqual(["Charlie", "Bob", "Alice"])
  })

  it("sorts by age ascending", () => {
    const sorted = sortByKey(users.slice(), "age", "asc")
    expect(sorted.map((u) => u.age)).toEqual([25, 30, 35])
  })

  it("sorts by age descending", () => {
    const sorted = sortByKey(users.slice(), "age", "desc")
    expect(sorted.map((u) => u.age)).toEqual([35, 30, 25])
  })

  it("keeps order for equal values", () => {
    const data = [
      { id: 1, score: 100 },
      { id: 2, score: 100 },
      { id: 3, score: 100 },
    ]
    const sorted = sortByKey(data.slice(), "score", "asc")
    expect(sorted.map((d) => d.id)).toEqual([1, 2, 3])
  })

  it("returns a new sorted array (does not mutate input)", () => {
    const input = users.slice()
    sortByKey(input, "name", "asc")
    expect(input).toEqual(users) // unchanged
  })

  it("handles empty array", () => {
    expect(sortByKey([], "id")).toEqual([])
  })
})
