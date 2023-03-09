import { useNavigate } from "react-router-dom";
import { useGetCharacters } from "../../../../services/queries";
import Card from "../../../../Components/Card/Card";
import styles from './home.module.scss'

function Home() {

        const characters = useGetCharacters()
        const navigate = useNavigate();

        if (characters.isLoading){
            return <div> CARGANDO </div>
        }

        if (characters.isSuccess && characters.data){
        return (
			<>
				<h1 className={styles["ContainerTitle"]}>Personajes</h1>
				<div className={styles["CardContainer"]}>
					{characters.data.charactersByIds?.map((card) => (
						<Card
							key={card?.id}
							name={card?.name}
							image={card?.image}
							species={card?.species}
							status={card?.status}
							active={true}
						/>
					))}
					{characters.data.charactersByIds?.map((card) => (
						<Card
							key={card?.id}
							name={card?.name}
							image={card?.image}
							species={card?.species}
							status={card?.status}
							active={true}
						/>
					))}
				</div>
				<button onClick={() => navigate("/game")}> Jugar </button>
			</>
		);
        }

        return <div>
            Something was wrong
        </div>
}

export default Home
