import { useGetCharacters } from "../../../services/queries";
import styles from '../childrens/Home/home.module.scss'
import Card from "../../../Components/Card/Card";
import { useState } from "react";
function Game() {
    const characters = useGetCharacters();
    const [cardStatus, setCardStatus] = useState(false)

	if (characters.isLoading) {
		return <div> CARGANDO </div>;
	}


	if (characters.isSuccess && characters.data) {
		return (
			<>
				<div className={styles["ContainerTitles"]}>
					<h2 className={styles["ContainerTitle"]}> Aciertos: 0</h2>
					<h2 className={styles["ContainerTitle"]}> Turnos: 0</h2>
				</div>
				<div className={styles["CardContainer"]}>
					{characters.data.charactersByIds?.map((card) => (
						<Card
							key={card?.id}
							name={card?.name}
							image={card?.image}
							species={card?.species}
							status={card?.status}
							active={cardStatus}
						/>
					))}
					{characters.data.charactersByIds?.map((card) => (
						<Card
							key={card?.id}
							name={card?.name}
							image={card?.image}
							species={card?.species}
							status={card?.status}
							active={cardStatus}
						/>
					))}
				</div>
				<button onClick={() => setCardStatus(!cardStatus)}>
					{" "}
					PUSH ME{" "}
				</button>
			</>
		);
	}

	return <div>Something was wrong</div>;
}

export default Game