import ProductCard from "../../../components/ProductCard/ProductCard";
import type { MenuListProps } from "./MenuList.props";
import styles from "./MenuList.module.css";

export function MenuList({ products }: MenuListProps) {
  return (
    <div className={styles.productList}>
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          name={p.name}
          description={p.ingredients.join(", ")}
          rating={p.rating}
          price={p.price}
          image={p.image}
        />
      ))}
    </div>
  );
}
