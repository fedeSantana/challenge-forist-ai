import { Outlet } from 'react-router-dom'
import header from '../../assets/header.png'
import { useGetCharacters } from '../../services/queries'
import shuffle from '../../utils/shuffle'
import styles from './Root.module.scss'

function Root() {
    const characters = useGetCharacters({
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        select(characters) {
            if (!characters) {
                return []
            }

            return shuffle([characters, characters].flat())
        },
    })

    if (
        characters.isLoading ||
        characters.data === null ||
        characters.data === undefined
    ) {
        return <div>CARGANDO</div>
    }

    return (
        <div className={styles['rootContainer']}>
            <img
                className={styles['header']}
                src={header}
                alt="Juego de memoria de Rick y Morty!"
            />
            <div className={styles['container']}>
                <Outlet context={characters.data} />
            </div>
        </div>
    )
}

export default Root
