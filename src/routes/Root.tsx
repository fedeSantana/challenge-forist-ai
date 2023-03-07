import { forwardRef } from 'react'
import { Outlet } from 'react-router-dom'
import './Root.css'
import { getCharacters } from '../services/queries'

function Root() {

    const characters = getCharacters()

    return (
        <div className="relative block h-full bg-white dark:bg-black">
                <Outlet />
        </div>
    )
}

export default Root
