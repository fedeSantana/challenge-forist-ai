import { Outlet } from 'react-router-dom'
import styles from './Root.module.scss'
import header from '../../assets/header.png'

function Root() {

    return (
		<>
			<img className={styles['header']} src={header} alt='Juego de memoria de Rick y Morty!'/>
			<div className={styles["container"]}>
				<Outlet />
			</div>
		</>
	);
}

export default Root
