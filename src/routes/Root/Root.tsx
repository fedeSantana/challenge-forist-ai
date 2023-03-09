import { Outlet } from 'react-router-dom'
import header from '../../assets/header.png'
import { useGetCharacters } from '../../services/queries'
import styles from './Root.module.scss'

function Root() {
    const characters = useGetCharacters()

    if (characters.isLoading || !characters.data) {
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
