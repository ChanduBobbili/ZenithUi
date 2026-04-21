import { useEffect, useRef } from "react"

export default function useSSE<T>(
  url: string,
  onMessageCallback?: (data: T) => void,
  onErrorCallback?: (error: Event) => void,
): EventSource | null {
  const eventSourceRef = useRef<EventSource | null>(null)

  useEffect(() => {
    eventSourceRef.current = new EventSource(url)

    eventSourceRef.current.onmessage = (event) => {
      if (onMessageCallback) {
        onMessageCallback(JSON.parse(event.data) as T)
      }
    }

    eventSourceRef.current.onerror = (error) => {
      if (onErrorCallback) {
        onErrorCallback(error)
      }
    }

    return () => {
      eventSourceRef.current?.close()
    }
  }, [url, onMessageCallback, onErrorCallback])

  return eventSourceRef.current
}
