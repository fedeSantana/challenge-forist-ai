import { useNavigate, useOutletContext } from 'react-router-dom'
import Card from '../../../../Components/Card/Card'
import { CharactersQuery } from '../../../../gql/graphql'
import styles from './home.module.scss'

function Home() {
    const navigate = useNavigate()
    const characters = useOutletContext<CharactersQuery>()

    return (
        <>
            <h1 className={styles['ContainerTitle']}>Personajes</h1>
            <div className={styles['CardContainer']}>
                {characters.charactersByIds?.map((card) => (
                    <Card
                        key={card?.id}
                        name={card?.name}
                        image={card?.image}
                        species={card?.species}
                        status={card?.status}
                        isFlipped={false}
                        startPosition="front"
                    />
                ))}
                {characters.charactersByIds?.map((card) => (
                    <Card
                        key={card?.id}
                        name={card?.name}
                        image={card?.image}
                        species={card?.species}
                        status={card?.status}
                        isFlipped={false}
                        startPosition="front"
                    />
                ))}
            </div>
            <button onClick={() => navigate('/game')}> Jugar </button>
        </>
    )
}

export default Home
