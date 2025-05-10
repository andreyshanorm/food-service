
import { useLoaderData, useParams } from "react-router-dom";
import type { Product } from "../../interfaces/product";

export default function Product() {

    const data = useLoaderData() as Product
    return <div>
        {data.name}
    </div>
}
