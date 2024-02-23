import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { callAPI } from '../utils/CallApi';


const ProductPage = () => {
  //  This line uses the useParams hook to extract the parameters from the URL. If a URL template like /product/:id is defined, this hook allows you to access the id parameter.
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = () => {

    callAPI(`data/products.json`)
      .then((productResults) => {

        setProduct(productResults[id]);

      });

  };

  useEffect(() => {
    getProduct();
  }, []);

  if (!product?.title) return <h1>Loading Product...</h1>;


  return (product &&
    <div>
      ProductPage {product.title}
    </div>
  )
}

export default ProductPage
