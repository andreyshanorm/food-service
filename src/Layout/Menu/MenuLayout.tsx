import { Link, NavLink, Outlet } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./MenuLayout.module.css";
import CartIcon from "../../assets/Pathcart.svg";
import MenuIcon from "../../assets/Documentmenu.svg";
import ExitIcon from "../../assets/exitIcon.svg";
import cn from "classNames";

export default function Layout() {
    return (
        <div className={styles["layout"]}>
            <div className={styles["sidebar"]}>
                <div className={styles["user"]}>
                    <img
                        className={styles["avatar"]}
                        src="./upavatar.png"
                        alt="Аватар пользователя"
                    />
                    <div className={styles["name"]}>Имgя</div>
                    <div className={styles["email"]}>Мыло</div>
                </div>
                <div className={styles["menu"]}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            cn(styles["menu--item"], {
                                [styles.active]: isActive,
                            })
                        }
                    >
                        <img src={MenuIcon} alt="Иконка меню" />
                        <span>Меню</span>
                    </NavLink>
                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            cn(styles["menu--item"], {
                                [styles.active]: isActive,
                            })
                        }
                    >
                        <img src={CartIcon} alt="Иконка корзины" />
                        <div>
                            <span>Корзина</span>
                            <span className={styles["cart-count"]}>2</span>
                        </div>{" "}
                    </NavLink>
                </div>
                <Button className={styles["exit"]}>
                    <img src={ExitIcon} alt="Иконка выхода" />
                    Выход
                </Button>
            </div>
            <div className={styles["content"]}>
                <Outlet />
            </div>
        </div>
    );
}
