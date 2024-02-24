import React from "react";

const AddProductModal = ({ showAddModal, closeAddModal, newProduct, setNewProduct, handleImageChange, addProduct }) => {
  return (
    showAddModal && (
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
                <input type="file" id="imageAdd" onChange={handleImageChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" />
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
                <button type="button" className="px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400" onClick={addProduct}>
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default AddProductModal;
