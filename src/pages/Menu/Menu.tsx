import { Link } from "react-router-dom";
import styles from "./Menu.module.css";
import Search from "../../components/SearchInput/SearchInput";
import Header from "../../components/Header/Header";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";
import { PREFIX } from "../../api/Api";
import type { Product } from "../../interfaces/product";
import { useEffect, useState } from "react";

export default function Menu() {
    const [products, setProducts] = useState<Product[]>([])

    const getMenuData = async () => {
        try {
            const { data } = await axios.get<Product[]>(`${PREFIX}/products`)
            setProducts(data)
        } catch (error) {
            console.error(error)
            return
        }
    }

    useEffect(() => {
        getMenuData()
    }, [])

    return (
        <>
            <div className={styles["head"]}>
                <Header>Меню</Header>
                <Search placeholder="Введите блюдо или состав" />
            </div>
            <div className={styles["product-list"]}>
                {
                    products.map((item) => (
                        <ProductCard
                        key={item.id}
                          id={item.id}
                          name={item.name}
                          description={item.ingredients.join(', ')}
                          price={item.price}
                          rating={item.rating}
                          image={item.image}
                        />
                    ))
                }
                
            </div>
        </>
    );
}
