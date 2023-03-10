import { useEffect,useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Card from '../../../Components/Card/Card'
import { CharactersQuery } from '../../../gql/graphql'
import styles from '../childrens/Home/home.module.scss'

type cardState = 'hide' | 'show' | 'frozen' | 'removed'

function getStatus(statusToCompare : cardState){
    return (status: cardState, index: number) =>
        status === statusToCompare ? index : false
}

function getStatusArray(cardStatus : cardState[]) {
    const showArray = cardStatus
        .map(getStatus('show'))
        .filter((status) => (status === false ? false : true)) as number[]
    
    const hiddenArray = cardStatus
        .map(getStatus('hide'))
        .filter((status) => (status === false ? false : true)) as number[]

    const frozenArray = cardStatus
        .map(getStatus('frozen'))
        .filter((status) => (status === false ? false : true)) as number[]

        return {
            showArray: showArray,
            hiddenArray: hiddenArray,
            frozenArray: frozenArray,
        }
}

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
        const indices = getStatusArray(cardStatus)
        /** Significa que dio vuelta dos cartas */
        const turnEnd = indices.showArray.length === 2

        const array = [...cardStatus]

        if (turnEnd) {

             if (!array.some((status) => status === 'frozen')) {
                 indices.hiddenArray.forEach((index) => (array[index] = 'frozen'))
                 setCardStatus(array)
             }

            const areTheSame =
                desorderCharacters &&
                desorderCharacters[indices.showArray[0]]?.id ===
                    desorderCharacters[indices.showArray[1]]?.id


            const timeoutId = setTimeout(() => {
                if (areTheSame) {
                    array[indices.showArray[0]] = 'removed'
                    array[indices.showArray[1]] = 'removed'
                    indices.frozenArray.forEach(
                        (index) => (array[index] = 'hide')
                    )
                    setCardStatus(array)
                    setAciertos(aciertos + 1)
                }

                if (!areTheSame) {
                    array[indices.showArray[0]] = 'hide'
                    array[indices.showArray[1]] = 'hide'
                    console.info('indices.frozenArray', indices.frozenArray)
                    indices.frozenArray.forEach((index) => (array[index] = 'hide'))
                    setCardStatus(array)
                }
            }, 1000)

            return () => clearTimeout(timeoutId)
        }
    }, [cardStatus, setCardStatus, aciertos, desorderCharacters, turnos])

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
                            action={
                                cardStatus[index] === 'frozen' ||
                                cardStatus[index] === 'removed' ||
                                cardStatus[index] === 'show'
                                    ? undefined
                                    : () => {
                                          const showIds = cardStatus
                                              .map((status, index) => {
                                                  return status === 'show'
                                                      ? index
                                                      : false
                                              })
                                              .filter((status) =>
                                                  status === false
                                                      ? false
                                                      : true
                                              ) as number[]

                                          if (showIds.length === 1) {
                                              setTurnos(turnos + 1)
                                          }

                                          const array = [...cardStatus]
                                          array[index] =
                                              array[index] === 'hide'
                                                  ? 'show'
                                                  : 'hide'
                                          setCardStatus(array)
                                      }
                            }
                        />
                    )
                })}
            </div>
        </>
    )
}

export default Game
