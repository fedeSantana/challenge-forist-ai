import { useEffect, useState } from 'react'

/** return if scroll is diferent from 0 */
export const useScrollHandler = () => {
    // setting initial value to true
    const [scroll, setScroll] = useState(true)

    // running on mount
    useEffect(() => {
        const onScroll = () => {
            const scrollCheck = window.scrollY < 10
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck)
            }
        }

        // setting the event handler from web API
        document.addEventListener('scroll', onScroll)

        // cleaning up from the web API
        return () => {
            document.removeEventListener('scroll', onScroll)
        }
    }, [scroll, setScroll])

    return scroll
}
