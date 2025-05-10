import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.props";
import cn from 'classNames';



export default function Button({ children, className, appearence = 'small', ...props }: ButtonProps) {
    return (
        <button
            className={(cn(styles['button'], styles['accent'], className, {
				[styles['small']]: appearence === 'small',
				[styles['big']]: appearence === 'big',
			}))}
            {...props}
        >
            {children}
        </button>
    );
}
