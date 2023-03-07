import { useEffect, useState } from 'react'

/**
 * https://dev.to/reedbarger/how-to-create-a-custom-usedevicedetect-react-hook-56l1
 * @returns if the device is a mobile or not
 */
function useDeviceDetect() {
    const [isMobile, setMobile] = useState(false)

    useEffect(() => {
        const userAgent =
            typeof window.navigator === 'undefined' ? '' : navigator.userAgent
        const mobile = Boolean(
            userAgent.match(
                /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
            )
        )
        setMobile(mobile)
    }, [])

    return { isMobile }
}

export default useDeviceDetect
