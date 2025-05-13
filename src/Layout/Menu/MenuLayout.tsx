import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./MenuLayout.module.css";
import CartIcon from "../../assets/Pathcart.svg";
import MenuIcon from "../../assets/Documentmenu.svg";
import ExitIcon from "../../assets/exitIcon.svg";
import cn from "classNames";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { getProfile, login, userActions } from "../../store/user.slice";
import { useEffect } from "react";

export default function Layout() {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const logout = () => {
        dispatch(userActions.logout())
        navigate('/auth/login')
    }
    const { jwt, name, email } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if(jwt){
            dispatch(getProfile(jwt))
        }
    }, [jwt])

    return (
        <div className={styles["layout"]}>
            <div className={styles["sidebar"]}>
                <div className={styles["user"]}>
                    <img
                        className={styles["avatar"]}
                        src="./upavatar.png"
                        alt="Аватар пользователя"
                    />
                    <div className={styles["name"]}>{name}</div>
                    <div className={styles["email"]}>{email}</div>
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
                <Button className={styles["exit"]} onClick={logout}>
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
