"use client"

import { CountDownTimer } from "@zenithui/time-picker"
import { toast } from "@zenithui/toast"
import CodePreview from "../code-preview"

const BasicCountDown = () => {
  return (
    <CodePreview
      code={{
        code: `
import { CountDownTimer } from "@zenithui/time-picker";

<CountDownTimer
  startTime={new Date().toISOString()}
  onExpired={(isExpire) => console.log("Timer expired:", isExpire)}
/>
        `,
        language: "jsx",
      }}
    >
      <CountDownTimer
        startTime={new Date().toISOString()}
        onExpired={() => toast.info("The time is expired")}
      />
    </CodePreview>
  )
}

const CountDownWithDescription = () => {
  return (
    <CodePreview
      code={{
        code: `
import { CountDownTimer } from "@zenithui/time-picker";

<CountDownTimer
  startTime={new Date().toISOString()}
  description="until the event starts"
  descriptionClassName="text-gray-500"
/>
        `,
        language: "jsx",
      }}
    >
      <CountDownTimer
        startTime={new Date().toISOString()}
        description="until the event starts"
        descriptionClassName="text-red-500"
      />
    </CodePreview>
  )
}

const CountDownWithLabel = () => {
  return (
    <CodePreview
      code={{
        code: `
import { CountDownTimer } from "@zenithui/time-picker";

<CountDownTimer
  startTime={new Date().toISOString()}
  format="with-names"
/>
        `,
        language: "jsx",
      }}
    >
      <CountDownTimer
        startTime={new Date().toISOString()}
        format="with-names"
      />
    </CodePreview>
  )
}

export { BasicCountDown, CountDownWithDescription, CountDownWithLabel }
