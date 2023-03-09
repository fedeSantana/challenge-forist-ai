import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Card from '../../../Components/Card/Card'
import { CharactersQuery } from '../../../gql/graphql'
import styles from '../childrens/Home/home.module.scss'

type cardState = 'hide' | 'show' | 'frozen' | 'removed'

function Game() {
    const [cardStatus, setCardStatus] = useState<cardState[]>(
        new Array(12).fill('hide')
    )
    const [aciertos, setAciertos] = useState<number>(0)
    const [turnos, setTurnos] = useState<number>(0)
    const characters = useOutletContext<CharactersQuery>()

    const desorderCharacters = characters
        ? [characters.charactersByIds, characters.charactersByIds].flat()
        : undefined

    useEffect(() => {
        /** indices de las cartas visibles */
        const showIds = cardStatus
            .map((status, index) => {
                return status === 'show' ? index : false
            })
            .filter((status) => (status === false ? false : true)) as number[]

        /** Indices de las cartas no visibles */
        const hideIds = cardStatus
            .map((status, index) => {
                return status === 'hide' ? index : false
            })
            .filter((status) => (status === false ? false : true)) as number[]

        /** Significa que dio vuelta dos cartas */
        const turnEnd = showIds.length === 2

        if (turnEnd) {
            setTurnos(turnos + 1)

            const areTheSame =
                desorderCharacters &&
                desorderCharacters[showIds[0]]?.id ===
                    desorderCharacters[showIds[1]]?.id

            const array = [...cardStatus]

            hideIds.forEach((index) => array[index] === 'frozen')
            setCardStatus(array)

            const timeoutId = setTimeout(() => {
                if (areTheSame) {
                    array[showIds[0]] = 'removed'
                    array[showIds[1]] = 'removed'
                    setCardStatus(array)
                    setAciertos(aciertos + 1)
                }

                if (!areTheSame) {
                    array[showIds[0]] = 'hide'
                    array[showIds[1]] = 'hide'
                    setCardStatus(array)
                }
            }, 1000)

            return () => clearTimeout(timeoutId)
        }
    }, [cardStatus, setCardStatus])

    return (
        <>
            <div className={styles['ContainerTitles']}>
                <h2 className={styles['ContainerTitle']}>
                    Aciertos: {aciertos}
                </h2>
                <h2 className={styles['ContainerTitle']}> Turnos: {turnos}</h2>
            </div>
            <div className={styles['CardContainer']}>
                {desorderCharacters?.map((card, index) => {
                    return (
                        <Card
                            key={`${card?.id}_${index}`}
                            name={card?.name}
                            image={card?.image}
                            species={card?.species}
                            status={card?.status}
                            isFlipped={
                                cardStatus[index] === 'show' ? true : false
                            }
                            startPosition="back"
                            removed={cardStatus[index] === 'removed'}
                            action={() => {
                                const array = [...cardStatus]
                                array[index] =
                                    array[index] === 'show' ? 'hide' : 'show'
                                setCardStatus(array)
                            }}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default Game
