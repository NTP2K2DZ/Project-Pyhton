import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';
function ProductDetails() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  // Lấy thông tin chi tiết của một sản phẩm
  const product = products.find(item => {
    return item.id === id;
  })
  // Nếu không tìm thấy sản phẩm
  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">Loading...</section>
    )
  }

  const {title, price, description, image} = product;
  return (
    <section className="pt-32 pb-12 lg:py-32 h-screen items-center">
      <div className="container mx-auto"></div>
        <div className="flex flex-col lg:flex-row items-center">
          <div className=" flex flex-1 justify-center items-center mb-8 lb:mb-0 ">
            <img className="max-w-[200px] lg:max-w-sm:" src={image} alt=''/>
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">{title}</h1>
            <div className="text-xl text-red-500 font-medium mb-6"> {price}VND</div>
            <p className="mb-8">{description}</p>
            <button onClick={()=> addToCart(product, product.id)} className="bg-blue-400 py-4 px-8 text-white">Add to cart</button>
          </div>
        </div>
    </section>
  )
}

export default ProductDetails
