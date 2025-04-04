import { throttle } from "../src/index"

jest.useFakeTimers()

describe("throttle", () => {
  it("calls the function immediately on first call", () => {
    const fn = jest.fn()
    const throttled = throttle(fn, 500)

    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it("ignores calls within the throttle limit", () => {
    const fn = jest.fn()
    const throttled = throttle(fn, 1000)

    throttled()
    throttled() // should be ignored
    throttled() // should be ignored

    expect(fn).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(999)
    throttled() // still within limit
    expect(fn).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(1)
    throttled() // now allowed
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it("calls function only once per interval", () => {
    const fn = jest.fn()
    const throttled = throttle(fn, 300)

    throttled() // call 1
    jest.advanceTimersByTime(100)
    throttled() // skipped
    jest.advanceTimersByTime(100)
    throttled() // skipped
    jest.advanceTimersByTime(100) // 300ms passed
    throttled() // call 2

    expect(fn).toHaveBeenCalledTimes(2)
  })

  it("preserves arguments passed to throttled function", () => {
    const fn = jest.fn()
    const throttled = throttle(fn, 500)

    throttled("a", 123)
    expect(fn).toBeCalledWith("a", 123)
  })

  it("works independently across multiple instances", () => {
    const fn1 = jest.fn()
    const fn2 = jest.fn()

    const throttled1 = throttle(fn1, 200)
    const throttled2 = throttle(fn2, 400)

    throttled1()
    throttled2()

    jest.advanceTimersByTime(200)
    throttled1()
    throttled2() // still throttled

    expect(fn1).toHaveBeenCalledTimes(2)
    expect(fn2).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(200)
    throttled2() // now allowed

    expect(fn2).toHaveBeenCalledTimes(2)
  })
})
