import React from 'react'
import styles from './CartItem.module.css'
import type { CartItemProps } from './CartItem.props';
import plusIcon from '../../assets/plus.svg'
import minusIcon from "../../assets/minus.svg";
import circleIcon from "../../assets/circle.svg";
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

export const CartItem = (props: CartItemProps) => {

    const dispatch = useDispatch<AppDispatch>()

    const decrease = () => {
        dispatch(cartActions.remove(props.id));
    }

    const increase = () => {
        dispatch(cartActions.add(props.id))
    };

    const remove = () => {
        dispatch(cartActions.delete(props.id));
    };

  return (
		<div className={styles["item"]}>
			<div
				className={styles["image"]}
				style={{ backgroundImage: `url('${props.image}')` }}
			></div>
			<div className={styles["description"]}>
				<div className={styles["name"]}>{props.name}</div>
				<div className={styles["price"]}>{props.price}&nbsp;₽</div>
			</div>
			<div className={styles["actions"]}>
				<button className={styles["minus"]} onClick={decrease}>
					<img src={minusIcon} alt="Удалить из корзины" />
				</button>
				<div className={styles["number"]}>{props.count}</div>
				<button className={styles["plus"]} onClick={increase}>
					<img src={plusIcon} alt="Добавить в корзину" />
				</button>
				<button className={styles["remove"]} onClick={remove}>
					<img src={circleIcon} alt="Удалить все" />
				</button>
			</div>
		</div>
  );
}
