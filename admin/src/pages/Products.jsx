
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal"; 
import AddProductModal from "../components/AddProductModal"; 
// import EditProductModal from "../components/EditProductModal"; 

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4); 
  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    image: "",
    price: "",
    description: ""
  });
  const [editProduct, setEditProduct] = useState({
    id: null,
    title: "",
    image: "",
    price: "",
    description: ""
  });
  // const [productToEdit, setProductToEdit] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageEdit, setSelectedImageEdit] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/products/list");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/products/delete/${id}`);
      setProducts(products.filter(product => product.id !== id));
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const addProduct = async () => {
    try {
      
      const response = await axios.post("http://127.0.0.1:5000/products/add", newProduct);
      
      if (response.data.success) {
        setProducts([...products, { ...newProduct, id: response.data.id }]);
        closeAddModal();
      } else {
        console.error("Error adding product:", response.data.error);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/products/update/${editProduct.id}`, editProduct);
      if (response.data.success) {
        // Cập nhật thông tin sản phẩm trong danh sách sản phẩm
        const updatedProducts = products.map(product => {
          if (product.id === editProduct.id) {
            return { ...editProduct };
          }
          return product;
        });
        setProducts(updatedProducts);
        closeEditModal();
      } else {
        console.error("Error updating product:", response.data.error);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const openDeleteModal = (id) => {
    setShowModal(true);
    setProductIdToDelete(id);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setProductIdToDelete(null);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };
  const closeAddModal = () => {
    setShowAddModal(false);
    setNewProduct({
      title: "",
      image: "",
      price: "",
      description: ""
    });
  };
  // Hàm mở modal chỉnh sửa sản phẩm
  const openEditModal = (product) => {
    setEditProduct(product);
    setSelectedImageEdit(product.image);
    setShowEditModal(true);
  };

  // Hàm đóng modal chỉnh sửa sản phẩm
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditProduct({
      id: null,
      title: "",
      image: "",
      price: "",
      description: ""
    });
    setSelectedImageEdit(null);
  };
  


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewProduct({ ...newProduct, image: reader.result });
      setSelectedImage(reader.result);
    };
  };
  // Hàm xử lý thay đổi hình ảnh khi chỉnh sửa sản phẩm
  const handleImageEditChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setEditProduct({ ...editProduct, image: reader.result });
      setSelectedImageEdit(reader.result);
    };
  };

  return (
    <div className="container mx-auto py-8 px-5">
      <h1 className="text-3xl font-bold mb-4">Sản phẩm</h1>
      <div className="flex justify-end mb-4">  
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={openAddModal}
        >
          Thêm sản phẩm
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-800">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-800 px-4 py-2" style={{ width: "10%" }}>ID</th>
            <th className="border border-gray-800 px-4 py-2" style={{ width: "30%", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>Tên sản phẩm</th>
            <th className="border border-gray-800 px-4 py-2" style={{ width: "20%", maxWidth: "100px" }}>Ảnh</th>
            <th className="border border-gray-800 px-4 py-2" style={{ width: "20%" }}>Giá</th>
            <th className="border border-gray-800 px-4 py-2" style={{ width: "20%" }}>Xử lý</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td className="border border-gray-800 px-4 py-2 text-center">{product.id}</td>
              <td className="border border-gray-800 px-4 py-2 text-center" style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>{product.title}</td>
              <td className="border border-gray-800 px-4 py-2 text-center" style={{ maxWidth: "100px" }}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-20 h-20 max-w-full mx-auto"
                  style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "cover" }}
                />
              </td>
              <td className="border border-gray-800 px-4 py-2 text-center">{product.price}</td>
              <td className="border border-gray-800 px-4 py-2 text-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => openEditModal(product)}>Edit</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => openDeleteModal(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteConfirmationModal
        showModal={showModal}
        closeDeleteModal={closeDeleteModal}
        deleteProduct={deleteProduct}
        productIdToDelete={productIdToDelete}
      />
      <AddProductModal
        showAddModal={showAddModal}
        closeAddModal={closeAddModal}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        handleImageChange={handleImageChange}
        addProduct={addProduct}
      />
      {/* Modal xác nhận sửa phẩm */}
      {showEditModal && (
        <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50" onClick={closeEditModal}>
              <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path
                  d="M14.72 14.72a1 1 0 0 1-1.41 0L9 10.41l-4.31 4.31a1 1 0 0 1-1.41-1.41L7.59 9 3.28 4.69a1 1 0 1 1 1.41-1.41L9 7.59l4.31-4.3a1 1 0 0 1 1.41 1.41L10.41 9z"
                />
              </svg>
              <span className="text-sm">(Esc)</span>
            </div>

            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Chỉnh sửa sản phẩm</p>
                <div className="modal-close cursor-pointer z-50" onClick={closeEditModal}>
                  <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <path
                      d="M14.72 14.72a1 1 0 0 1-1.41 0L9 10.41l-4.31 4.31a1 1 0 0 1-1.41-1.41L7.59 9 3.28 4.69a1 1 0 1 1 1.41-1.41L9 7.59l4.31-4.3a1 1 0 0 1 1.41 1.41L10.41 9z"
                    />
                  </svg>
                </div>
              </div>

              <form>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Tên sản phẩm:</label>
                  <input type="text" id="title" value={editProduct.title} onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Hình ảnh:</label>
                  <input type="file" id="image" onChange={handleImageEditChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" />
                </div>
                {selectedImageEdit && (
                  <img src={selectedImageEdit} alt="Selected" className="w-20 h-20 max-w-full mx-auto mb-4" />
                )}
                <div className="mb-4">
                  <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Giá:</label>
                  <input type="number" id="price" value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Mô tả:</label>
                  <textarea id="description" value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"></textarea>
                </div>
                <div className="flex justify-end">
                  <button type="button" className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2" onClick={updateProduct}>
                    Cập nhật
                  </button>
                  <button type="button" className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400" onClick={closeEditModal}>
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* <EditProductModal
        showEditModal={showEditModal}
        closeEditModal={closeEditModal}
        productToEdit={productToEdit}
        setProductToEdit={setProductToEdit}
        editProduct={updateProduct}
        handleImageChange={handleImageChange}
      /> */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Products;
