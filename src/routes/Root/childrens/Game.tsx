import { useEffect,useState } from 'react'
import { useNavigate,useOutletContext } from 'react-router-dom'
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

    const removedArray = cardStatus
    .map(getStatus('removed'))
    .filter((status) => (status === false ? false : true)) as number[]


        return {
            removedArray: removedArray,
            showArray: showArray,
            hiddenArray: hiddenArray,
            frozenArray: frozenArray,
        }
}

function Game() {
    const [cardStatus, setCardStatus] = useState<cardState[]>(
        new Array(12).fill('show')
    )
    const [aciertos, setAciertos] = useState<number>(0)
    const [turnos, setTurnos] = useState<number>(0)
    const navigate = useNavigate()
    const characters = useOutletContext<NonNullable<CharactersQuery['charactersByIds']>>()
    const gameDone = cardStatus.every( status => status === 'removed')

    /** Se encarga de esconder todas las cartas luego de 3 segundos la primera vez que cargas la página */
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCardStatus(new Array(12).fill('hide'))
        }, 3000)

        return () => clearTimeout(timeoutId)
    }, [])

    /** Cuando dos cartas estan dadas vuelta, se encarga de decidir si tienen que irse o quedarse */
    useEffect(() => {
        /** indices de las cartas visibles */
        const indices = getStatusArray(cardStatus)

        const endGame = indices.showArray.length === 2 && indices.removedArray.length === 10

        /** Significa que dio vuelta dos cartas */
        const turnEnd = indices.showArray.length === 2

        const array = [...cardStatus]

        /** Si terminaste el juego hago este camino con menos lógica para evitar que quede en un bucle de
         * dependencias
         */
        if (endGame){
            array[indices.showArray[0]] = 'removed'
            array[indices.showArray[1]] = 'removed'
            setCardStatus(array)
            setAciertos(aciertos + 1)
            return 
        }

        if (turnEnd) {
            /* Si no hay cartas frozen, tengo que frizarlas, si sacas esto se ejecutaria infinitamente el useEffect*/
            if (!array.some((status) => status === 'frozen')) {
                indices.hiddenArray.forEach(
                    (index) => (array[index] = 'frozen')
                )
                setCardStatus(array)
            }

            const areTheSame =
                characters[indices.showArray[0]]?.id ===
                characters[indices.showArray[1]]?.id

            const timeoutId = setTimeout(() => {
                /** Si son iguales los remuevo y aumento el contador de aciertos */
                if (areTheSame) {
                    array[indices.showArray[0]] = 'removed'
                    array[indices.showArray[1]] = 'removed'
                    setCardStatus(array)
                    setAciertos(aciertos + 1)
                }

                /** Si no son iguales, los escondo y además descongelo a los demás */
                if (!areTheSame) {
                    array[indices.showArray[0]] = 'hide'
                    array[indices.showArray[1]] = 'hide'
                    setCardStatus(array)
                }


                indices.frozenArray.forEach((index) => (array[index] = 'hide'))
            }, 1000)

            return () => clearTimeout(timeoutId)
        }
    }, [cardStatus, setCardStatus, aciertos, characters, turnos])

    if (gameDone){
        return <>
        <div> 
            Felicitaciones! Terminaste el juego
            <button onClick={() => navigate(0)}> Jugar de nuevo </button>
        </div>
        </>
    }
        return (
            <>
                <div className={styles['ContainerTitles']}>
                    <h2 className={styles['ContainerTitle']}>
                        Aciertos: {aciertos}
                    </h2>
                    <h2 className={styles['ContainerTitle']}>
                        {' '}
                        Turnos: {turnos}
                    </h2>
                </div>
                <div className={styles['CardContainer']}>
                    {characters?.map((card, index) => {
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
                                              const { showArray } =
                                                  getStatusArray(cardStatus)

                                              if (showArray.length === 1) {
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
