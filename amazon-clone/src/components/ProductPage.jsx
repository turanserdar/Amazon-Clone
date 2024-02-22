import { useParams} from 'react-router-dom'

const ProductPage = () => {
//  This line uses the useParams hook to extract the parameters from the URL. If a URL template like /product/:id is defined, this hook allows you to access the id parameter.
  const {id} =useParams();
  return (
    <div>
      ProductPage {id}
    </div>
  )
}

export default ProductPage
