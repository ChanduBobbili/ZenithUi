import { useCallback, useState } from "react"
import useIsomorphicLayoutEffect from "./use-isomorphic-layout-effect"

type DeviceType = "smallMobile" | "largeMobile" | "tablet" | "desktop"

export default function useDeviceType(): DeviceType {
  const getDeviceType = useCallback((): DeviceType => {
    const width = window.innerWidth

    if (width < 480) return "smallMobile"
    if (width >= 480 && width < 768) return "largeMobile"
    if (width >= 768 && width < 1024) return "tablet"
    return "desktop"
  }, [])

  const [deviceType, setDeviceType] = useState<DeviceType>("smallMobile")

  useIsomorphicLayoutEffect(() => {
    const handleResize = () => setDeviceType(getDeviceType)
    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [getDeviceType])

  return deviceType
}
