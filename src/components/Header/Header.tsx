import styles from "./Header.module.css";
import cn from "classNames";
import type { HeaderProps } from "./Header.props";

function Header({ children, className, ...props }: HeaderProps) {
    return (
        <h1 className={cn(className, styles["h1"])} {...props}>
            {children}
        </h1>
    );
}

export default Header;
