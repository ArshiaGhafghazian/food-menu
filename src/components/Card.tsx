import { FastFoodListType } from "../types/FastFoodList.type"
import styles from "./Card.module.css"

type CardProps = FastFoodListType

function Card({ imageUrl, ingredients, name, price }: CardProps) {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={imageUrl} alt="pic"/>
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.ingredients}>
        {ingredients}
      </p>

      <p className={styles.price}>{`قیمت: ${price.toLocaleString()} تومان`}</p>
    </div>
  )
}

export default Card