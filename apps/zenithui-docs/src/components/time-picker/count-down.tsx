"use client"

import { CountDownTimer } from "zenithui-time-picker"

export default function CountDownDemo() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <h4>Basic Countdown</h4>
        <CountDownTimer
          startTime={new Date().toISOString()}
          onExpired={(isExpire) => console.log("Timer expired:", isExpire)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h4>Countdown with Description</h4>
        <CountDownTimer
          startTime={new Date().toISOString()}
          description="until the event starts"
          descriptionClassName="text-gray-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h4>Countdown with Labels</h4>
        <CountDownTimer
          startTime={new Date().toISOString()}
          format="with-names"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h4>Custom Styling</h4>
        <CountDownTimer
          startTime={new Date().toISOString()}
          className="font-bold text-blue-500"
        />
      </div>
    </div>
  )
}
