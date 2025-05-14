import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import type { Product } from "../../interfaces/product";
import styles from "./Product.module.css";
import Header from "../../components/Header/Header";
import crossIcon from "../../assets/cross.svg";
import Button from "../../components/Button/Button";
import starIcon from "../../assets/star.svg"
import cartIcon from "../../assets/cartIcon.svg"
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

export default function Product() {
	const data = useLoaderData() as Product;
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleCartClick = () => {
        dispatch(cartActions.add(data.id))
    }

    const handlePreviousClick = () => {
        navigate('/')
    }

	return (
		<>
			<div className={styles["header"]}>
				<button
					onClick={handlePreviousClick}
					className={styles["cross-icon"]}
				>
					<img src={crossIcon} alt="" />
				</button>
				<Header>{data.name}</Header>
				<Button
					onClick={handleCartClick}
					className={styles["cart-button"]}
					appearence="big"
				>
					<span>В корзину</span>
				</Button>
			</div>
			<div className={styles["content"]}>
				<div
					className={styles["image"]}
					style={{ backgroundImage: `url('${data.image}')` }}
				></div>
				<div className={styles["info"]}>
					<div className={styles["price"]}>
						<span>Цена</span>
						<span>{data.price} $</span>
					</div>
					<div className={styles["rating"]}>
						<span>Рейтинг</span>
						<div className={styles["rating-value"]}>
							<span>{data.rating}</span>
							<img src={starIcon} alt="" />
						</div>
					</div>
					<div className={styles["structure"]}>
						<span>Состав</span>
						<ul className={styles["structure-list"]}>
							{data.ingredients.map((item) => (
								<li>{item}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
