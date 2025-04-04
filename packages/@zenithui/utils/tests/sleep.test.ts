import { sleep } from "../src/index"

describe("sleep", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("resolves after the specified delay", async () => {
    const promise = sleep(1000)

    // Fast-forward time
    jest.advanceTimersByTime(1000)

    await expect(promise).resolves.toBeUndefined()
  })

  it("can sleep for 0ms", async () => {
    const promise = sleep(0)
    jest.advanceTimersByTime(0)
    await expect(promise).resolves.toBeUndefined()
  })

  it("can be awaited", async () => {
    const spy = jest.fn()

    const run = async () => {
      await sleep(500)
      spy()
    }

    run()
    expect(spy).not.toHaveBeenCalled()

    jest.advanceTimersByTime(500)
    await Promise.resolve() // <-- flush pending microtasks
    expect(spy).toHaveBeenCalled()
  })
})
