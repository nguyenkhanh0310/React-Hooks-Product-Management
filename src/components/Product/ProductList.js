import { useEffect, useState } from "react";
import "./Product.scss";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { getProductList } from "../../services/productsService";

function ProductList(props) {
    const { reload } = props;
    const [data, setData] = useState([]);
    const [editReload, setEditReload] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getProductList();
            const products = result.products;
            setData(products.reverse());
        }
        fetchApi();
    }, [reload, editReload]);

    const handleReload = () => {
        setEditReload(!editReload);
    }

    // console.log(data);

    return (
        <>
            <div className="product__list">
                {data.map(item => (
                    <div className="product__item" key={item.id}>
                        <div className="product__image">
                            <img src={item.thumbnail} alt={item.title}></img>
                        </div>
                        <h4 className="product__title">{item.title}</h4>
                        <p className="product__price">{item.price}$</p>
                        <p className="product__discount">{item.discountPercentage}%</p>
                        <EditProduct item={item} onReload={handleReload} />
                        <DeleteProduct item={item} onReload={handleReload} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default ProductList;
