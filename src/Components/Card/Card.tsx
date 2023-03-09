import { Character } from '../../gql/graphql';
import styles from './Card.module.scss'
import backwardImage from '../../assets/backward.png'

type CardProps = Pick<Character, "name" | "image" | "species" | "status"> & {
	/** Active significa si la carta debe estar mostrando el frente o la parte de atrás,
	 * si active es true se mostrara el frente, sino se mostrara la parte de detrás.
	 */
	active: boolean;
    /** action when you click the Card */
	action?: React.MouseEventHandler<HTMLButtonElement>;
};

function CardContent({ active, image, status, species, name }: CardProps) {

    const statusCircle = {
        Alive: "🟢",
        Dead: "🔴",
        Unknown: "🟡",
    } as const;

    const statusAreCorrect = ["Alive", "Dead", "Unknown"].includes(
        status ?? ""
    );

    const circleStatus = statusAreCorrect
        ? statusCircle[status as "Alive" | "Dead" | "Unknown"]
        : "";

    return (
		<>
			<div
				className={
					styles[active ? "cardFront" : "cardBack"] +
					" " +
					styles[active ? "normal" : "reverse"]
				}
			>
				<img className={styles["cardImage"]} src={image ?? ""} alt="" />
				<h2 className={styles["cardTitle"]}> {name} </h2>
				<div>
					<p className={styles["cardDescription"]}>
						{circleStatus} {status} - {species}
					</p>
				</div>
			</div>
			<div
				className={`
                ${styles[active ? "cardBack" : "cardFront"]}
                ${styles[active ? "reverse" : "normal"]} 
                ${styles['backBackground']}
                `}
			>
				<img
					className={styles["cardImage"]}
					src={backwardImage}
					alt=""
				/>
			</div>
		</>
	);
}

function Card(cardProps: CardProps) {


	return (
		<button className={styles["card"]} onClick={cardProps.action}>
			<div className={styles["cardContent"]}>
				<CardContent {...cardProps} />
			</div>
		</button>
	);
}

export default Card;