import { Character } from '../../gql/graphql';
import styles from './Card.module.scss'
import backwardImage from '../../assets/backward.png'

type CardProps = Pick<Character, "name" | "image" | "species" | "status"> & {
    /** Es si la carta empieza mostrando la información o no */
    startPosition: 'front' | 'back'
    /** Is flipped nos habla de si la carta debe estar al revés que su posición inicial */
    isFlipped: boolean;
    /** action when you click the Card */
	action?: React.MouseEventHandler<HTMLButtonElement>;
    /** Si la tarjeta ha sido removida */
    removed?: boolean
};

function CardContent({
	startPosition,
	image,
	status,
	species,
	name,
}: CardProps) {
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
				className={`
					${styles["cardFront"]}
                    ${styles[startPosition === "front" ? "normal" : "reverse"]}
                    `}
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
                ${styles["cardBack"]}
                ${styles["backBackground"]}
                ${
                    styles[
                        startPosition === "front"
                            ? "reverse"
                            : "normal"
                    ]
                }

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
		<button
			className={`
        ${styles["card"]}
        ${cardProps.removed ? styles["removed"] : ""}`}
			onClick={cardProps.action}
		>
			<div
				className={`${styles["cardContent"]} ${
					cardProps.isFlipped ? styles["reverse"] : ""
				}`}
			>
				<CardContent {...cardProps} />
			</div>
		</button>
	);
}

export default Card;