import { Link } from "react-router-dom";
import styles from './Menu.module.css'
import Search from "../../components/SearchInput/SearchInput";
import Header from "../../components/Header/Header";
import ProductCard from "../../components/ProductCard/ProductCard";


export default function Menu() {
    return (
        <>
            <div className={styles["head"]}>
                <Header>Меню</Header>
                <Search placeholder="Введите блюдо или состав" />
            </div>
            <div className={styles["product-list"]}>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </>
    );
}
