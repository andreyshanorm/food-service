
import Header from "../../components/Header/Header";
import Search from "../../components/SearchInput/SearchInput";
import styles from './Cart.module.css'


export default function Cart() {
    return (
        <>
            <div className={styles["head"]}>
                <Header>Карзина</Header>
                <Search placeholder="Введите блюдо или состав" />
            </div>
        </>
    );
}
