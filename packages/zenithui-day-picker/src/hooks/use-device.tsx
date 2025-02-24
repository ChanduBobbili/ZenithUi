import { useEffect, useState } from "react"

type DeviceType = "smallMobile" | "largeMobile" | "tablet" | "desktop"

export function useDeviceType(): DeviceType {
  const getDeviceType = (): DeviceType => {
    const width = window.innerWidth

    if (width < 480) return "smallMobile"
    if (width >= 480 && width < 768) return "largeMobile"
    if (width >= 768 && width < 1024) return "tablet"
    return "desktop"
  }

  const [deviceType, setDeviceType] = useState<DeviceType>(getDeviceType)

  useEffect(() => {
    const handleResize = () => setDeviceType(getDeviceType)
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return deviceType
}
