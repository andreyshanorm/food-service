import { Outlet } from "react-router-dom";
import styles from "./Auth.module.css";
import LogoIcon from '../../../assets/logo.svg'

export function AuthLayout() {
  return (
    <div className={styles["layout"]}>
      <div className={styles["logo"]}>
        <img src={LogoIcon} alt="Логотип компании" />
      </div>
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
}
