import { Outlet } from 'react-router-dom'
import header from '../../assets/header.png'
import { useGetCharacters } from '../../services/queries'
import shuffle from '../../utils/shuffle'
import styles from './Root.module.scss'

function Root() {
    const characters = useGetCharacters({
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    })
    const desorderCharacters = shuffle(
        [characters.data?.charactersByIds, characters.data?.charactersByIds].flat()
    )


    if (characters.isLoading || desorderCharacters === null || desorderCharacters === undefined) {
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
                <Outlet context={desorderCharacters} />
            </div>
        </div>
    )
}

export default Root
