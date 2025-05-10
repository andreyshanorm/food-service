import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import type { ProductCardProps } from "./ProductCard.props";
import starIcon from '../../assets/star.svg'
import cartIcon from "../../assets/cartIcon.svg";


function ProductCard() {
    return (
        <Link to={'/'} className={styles["link"]}>
            <div className={styles["card"]}>
                <div
                    className={styles["head"]}
                    style={{
                        backgroundImage: `url('../../assets/temp.png')`,
                    }}
                >
                    <div className={styles["price"]}>
                        {/* {props.price}&nbsp; */}250
                        <span className={styles["currency"]}>₽</span>
                    </div>
                    <button className={styles["add-to-cart"]}>
                        <img src={cartIcon} alt="Добавить в корзину" />
                    </button>
                    <div className={styles["rating"]}>
                        {/* {props.rating}&nbsp; */}4.5
                        <img src={starIcon} alt="Иконка звезды" />
                    </div>
                </div>
                <div className={styles["footer"]}>
                    <div className={styles["title"]}>Пицца</div>
                    <div className={styles["description"]}>
                        Хорошая пицца
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
