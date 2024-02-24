import { createContext, useState, useEffect } from 'react'

// Tao context
export const ProductContext = createContext();
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const featchProduct = async () => {
      const response = await fetch('http://127.0.0.1:5000/products/list');
      const data = await response.json();
      setProducts(data);
    };
    featchProduct();
  }, [])

  return <ProductContext.Provider value={{ products }}>
            {children}
          </ProductContext.Provider>;
}

export default ProductProvider;
