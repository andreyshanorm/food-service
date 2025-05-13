
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import type { RootState } from "../../store/store";
import styles from './Cart.module.css'
import axios from "axios";
import type { Product } from "../../interfaces/product";
import { PREFIX } from "../../api/Api";
import { useEffect, useState } from "react";
import { CartItem } from "../../components/CartItem/CartItem";


export default function Cart() {
    const [cartProducts, setCartProducts] = useState<Product[]>([])
    const items = useSelector((state: RootState) => state.cart.items)

    useEffect(() => {
        loadAllItems()
    }, [])

    const getItem = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async () => {
		const res = await Promise.all(items.map((i) => getItem(i.id)));
		setCartProducts(res);
	};

    const total = items
		.map((i) => {
			const product = cartProducts.find((p) => p.id === i.id);
			if (!product) {
				return 0;
			}
            
			return i.count * product.price;
		})
		.reduce((acc, i) => (acc += i), 0);


    return (
		<>
			<div className={styles["head"]}>
				<Header>Корзина</Header>
				<div className={styles["product-list"]}>
					{items.map((item) => {
						const productInCart = cartProducts.find(
							(p) => p.id === item.id
						);
						if (!productInCart) {
							return;
						}
						return (
							<CartItem
								key={productInCart.id}
								count={item.count}
								{...productInCart}
							/>
						);
					})}
				</div>
                <div className={styles["total-price"]}>
					{total}
				</div>
			</div>
		</>
	);
}
