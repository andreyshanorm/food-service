import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import type { ProductCardProps } from "./ProductCard.props";
import starIcon from "../../assets/star.svg";
import cartIcon from "../../assets/cartIcon.svg";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
import type { MouseEvent } from "react";

function ProductCard(props: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>()

	const addToCart = (e: MouseEvent) => {
		e.preventDefault();
    dispatch(cartActions.add(props.id))
	};

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
					<button
						className={styles["add-to-cart"]}
						onClick={addToCart}
					>
						<img src={cartIcon} alt="Добавить в корзину" />
					</button>
					<div className={styles["rating"]}>
						{props.rating}&nbsp;
						<img src={starIcon} alt="Иконка звезды" />
					</div>
				</div>
				<div className={styles["footer"]}>
					<div className={styles["title"]}>{props.name}</div>
					<div className={styles["description"]}>
						{props.description}
					</div>
				</div>
			</div>
		</Link>
	);
}

export default ProductCard;
