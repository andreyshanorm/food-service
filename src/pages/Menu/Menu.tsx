
import styles from "./Menu.module.css";
import Search from "../../components/SearchInput/SearchInput";
import Header from "../../components/Header/Header";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../../api/Api";
import type { Product } from "../../interfaces/product";
import { useEffect, useState } from "react";
import { MenuList } from "./MenuList/MenuList";

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const getMenuData = async () => {

    const req = axios.get<Product[]>(`${PREFIX}/products`);
    setIsLoading(true);
    req
      .then((res) => {
        const data = res.data;
        setProducts(data);
      })
      .catch((e) => {
        console.error(e);
        if (e instanceof AxiosError) {
          setError(e.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    // try {
    //     setIsLoading(true)
    //     const { data } = await axios.get<Product[]>(`${PREFIX}/products`)
    //     setProducts(data)
    //     setIsLoading(false)
    // } catch (error) {
    //     console.error(error)
    //     if (error instanceof AxiosError) {
    //         setError(error.message);
    //     }

    //     setIsLoading(false);
    //     return
    // }
  };

  useEffect(() => {
    getMenuData();
  }, []);

  if (isloading) return <div>Идет загрузка....</div>;

  if (error) return <div>Произошла ошибка</div>;

  return (
    <>
      <div className={styles["head"]}>
        <Header>Меню</Header>
        <Search placeholder="Введите блюдо или состав" />
      </div>
      <div className={styles["product-list"]}>
        {!isloading && <MenuList products={products}/>}
      </div>
    </>
  );
}
