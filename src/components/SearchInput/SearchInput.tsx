import { forwardRef } from "react";
import styles from "./SearchInput.module.css";
import cn from "classNames";
import type { SearchInputProps } from "./SearchInput.props";
import SearchIcon from '../../assets/search.svg'


const Search = forwardRef<HTMLInputElement, SearchInputProps>(function Input(
    { isValid = true, className, ...props },
    ref
) {
    return (
        <div className={styles["input-wrapper"]}>
            <input
                ref={ref}
                className={cn(styles["input"], className, {
                    [styles["invalid"]]: isValid,
                })}
                {...props}
            />
            <img
                className={styles["icon"]}
                src={SearchIcon}
                alt="Иконка лупы"
            />
        </div>
    );
});

export default Search;
