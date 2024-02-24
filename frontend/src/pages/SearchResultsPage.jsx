import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { BsPlus, BsEyeFill} from 'react-icons/bs'
import { CartContext } from '../contexts/CartContext'

function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('title');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/products/search?title=${searchQuery}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error occurred while fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 
          lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm
          mx-auto md:max-w-none md:mx-0">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <div key={product.id} className="p-8">
                <div className="border border- [#e4e4e4] h-[300px] mb-4
                  relative overflow-hidden group transition">
                    <div className="w-full h-full flex justify-center items-center">
                      {/* image*/}
                      <div className="w-[200px] mx-auto flex justify-center items-center">
                        <img className="max-h-[160px] group-hover:scale-110 translate duration-300" src={product.image} alt=''/>
                      </div>
                    </div>
                    {/* button */}
                    <div className="absolute top-6 right-11 group-hover:right-5 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 
                    group-hover:opacity-100 transition-all duration-300">
                      <button onClick={() => addToCart(product, product.id)}> 
                        <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500" >
                          <BsPlus className="text-3xl" />
                        </div>
                      </button>
                      <Link to={`/product/${product.id}`} className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"> <BsEyeFill/></Link>
                    </div>
                  </div>

                  {/* category and title */}
                  <div className="flex flex-col text-left">
                    <Link to={`/product/${product.id}`}>
                      <h2 className="font-semibold mb-1">{product.title}</h2>
                    </Link>
                    <div className="font-semibold">{product.price} VND</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xl font-semibold text-red-500 py-10">Không tìm thấy sản phẩm.</div>
            )}
        </div>
      </div>
    </section>
  );
}

export default SearchResultsPage;
