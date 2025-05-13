import styles from "./Menu.module.css";
import Search from "../../components/SearchInput/SearchInput";
import Header from "../../components/Header/Header";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../../api/Api";
import type { Product } from "../../interfaces/product";
import { useEffect, useState, type ChangeEvent } from "react";
import { MenuList } from "./MenuList/MenuList";

export default function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isloading, setIsLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string>("");
	const [error, setError] = useState<string | undefined>();
	const [search, setSearchState] = useState<string>("");


  useEffect(() => {
		getMenuData(search);
  }, [search]);



	const getMenuData = async (name?: string) => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
				params: {
					name,
				},
			});
			setProducts(data);
      setSearchError("");
      if(data.length === 0){
        setSearchError('Не найдено блюд по запросу')
      }
			setIsLoading(false);
      
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) {
				setError(e.message);
        setSearchError("");
			}
			setIsLoading(false);
			return;
		}
	};

	const changeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchState(e.target.value)
  };

	
	// if (isloading) return <div>Идет загрузка....</div>;

	// if (error) return <div>Произошла ошибка</div>;

	return (
		<>
			<div className={styles["head"]}>
				<Header>Меню</Header>
				<Search
					placeholder="Введите блюдо или состав"
					onChange={changeFilter}
				/>
			</div>
			{error && <>{error}</>}
			{!isloading && products.length > 0 && (
				<MenuList products={products} />
			)}
			{isloading && <>Загружаем продукты...</>}
			{!isloading && products.length === 0 && <span>{searchError}</span>}
		</>
	);
}
