import React, { useState, useEffect } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Số sản phẩm trên mỗi trang
  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    image: "",
    price: "",
    description: ""
  });
  const [selectedImage, setSelectedImage] = useState(null);

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

  // Tính toán index của sản phẩm đầu tiên và cuối cùng trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Tính tổng số trang
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Hàm chuyển trang tiếp theo
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Hàm chuyển trang trước đó
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Hàm xóa sản phẩm
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/products/delete/${id}`);
      setProducts(products.filter(product => product.id !== id)); // Cập nhật danh sách sản phẩm sau khi xóa
      closeDeleteModal(); // Đóng modal sau khi xóa thành công
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  // Hàm thêm sản phẩm
  const addProduct = async () => {
    try {
      // Gửi yêu cầu POST đến API để thêm sản phẩm mới
      const response = await axios.post("http://127.0.0.1:5000/products/add", newProduct);
      
      // Nếu thêm sản phẩm thành công, cập nhật danh sách sản phẩm và đóng modal
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

  // Mở modal xác nhận xóa sản phẩm
  const openDeleteModal = (id) => {
    setShowModal(true);
    setProductIdToDelete(id);
  };

  // Đóng modal
  const closeDeleteModal = () => {
    setShowModal(false);
    setProductIdToDelete(null);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };
  
  const closeAddModal = () => {
    setShowAddModal(false);
    // Đặt lại dữ liệu sản phẩm mới về trạng thái mặc định
    setNewProduct({
      title: "",
      image: "",
      price: "",
      description: ""
    });
  };
  // Hàm xử lý thay đổi hình ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewProduct({ ...newProduct, image: reader.result });
      setSelectedImage(reader.result);
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
              <td className="border border-gray-800 px-4 py-2" style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>{product.title}</td>
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
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => openDeleteModal(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal xác nhận xóa sản phẩm */}
      {showModal && (
        <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50" onClick={closeDeleteModal}>
              <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path
                  d="M14.72 14.72a1 1 0 0 1-1.41 0L9 10.41l-4.31 4.31a1 1 0 0 1-1.41-1.41L7.59 9 3.28 4.69a1 1 0 1 1 1.41-1.41L9 7.59l4.31-4.3a1 1 0 0 1 1.41 1.41L10.41 9z"
                />
              </svg>
              <span className="text-sm">(Esc)</span>
            </div>

            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Xác nhận xóa</p>
                <div className="modal-close cursor-pointer z-50" onClick={closeDeleteModal}>
                  <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <path
                      d="M14.72 14.72a1 1 0 0 1-1.41 0L9 10.41l-4.31 4.31a1 1 0 0 1-1.41-1.41L7.59 9 3.28 4.69a1 1 0 1 1 1.41-1.41L9 7.59l4.31-4.3a1 1 0 0 1 1.41 1.41L10.41 9z"
                    />
                  </svg>
                </div>
              </div>

              <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>

              <div className="flex justify-end pt-2">
                <button className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2" onClick={() => deleteProduct(productIdToDelete)}>
                  Xác nhận
                </button>
                <button className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400" onClick={closeDeleteModal}>
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showAddModal && (
        <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50" onClick={closeAddModal}>
              <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path
                  d="M14.72 14.72a1 1 0 0 1-1.41 0L9 10.41l-4.31 4.31a1 1 0 0 1-1.41-1.41L7.59 9 3.28 4.69a1 1 0 1 1 1.41-1.41L9 7.59l4.31-4.3a1 1 0 0 1 1.41 1.41L10.41 9z"
                />
              </svg>
              <span className="text-sm">(Esc)</span>
            </div>

            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Thêm sản phẩm mới</p>
                <div className="modal-close cursor-pointer z-50" onClick={closeAddModal}>
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
                  <input type="text" id="title" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Hình ảnh:</label>
                  <input type="file" id="image" onChange={handleImageChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" />
                  {newProduct.image && <p className="mt-2 text-xs text-gray-500 truncate w-full">{newProduct.image}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Giá:</label>
                  <input type="text" id="price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Mô tả:</label>
                  <textarea id="description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" rows="4"></textarea>
                </div>
                <div className="flex justify-end pt-2">
                  <button type="button" className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2" onClick={closeAddModal}>
                    Hủy
                  </button>
                  <button type="submit" className="px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400" onClick={addProduct}>
                    Thêm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Phân trang */}
      <div className="flex justify-center mt-4">
        <button
          className="px-3 py-1 rounded-md mr-2 hover:bg-blue-300"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Back
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-400"}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 rounded-md ml-2 hover:bg-blue-300"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;