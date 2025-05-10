import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import type { ProductCardProps } from "./ProductCard.props";
import starIcon from '../../assets/star.svg'
import cartIcon from "../../assets/cartIcon.svg";


function ProductCard(props : ProductCardProps) {
    return (
      <Link to={`/product/${props.id}`} className={styles["link"]}>
        <div className={styles["card"]}>
          <div
            className={styles["head"]}
            style={{ backgroundImage: `url('${props.image}')` }}
          >
            <div className={styles["price"]}>
              {props.price}&nbsp;
              <span className={styles["currency"]}>₽</span>
            </div>
            <button className={styles["add-to-cart"]}>
              <img src={cartIcon} alt="Добавить в корзину" />
            </button>
            <div className={styles["rating"]}>
              {props.rating}&nbsp;
              <img src={starIcon} alt="Иконка звезды" />
            </div>
          </div>
          <div className={styles["footer"]}>
            <div className={styles["title"]}>{props.name}</div>
            <div className={styles["description"]}>{props.description}</div>
          </div>
        </div>
      </Link>
    );
}

export default ProductCard;
