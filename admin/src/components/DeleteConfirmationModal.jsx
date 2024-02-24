import React from "react";

const DeleteConfirmationModal = ({ showModal, closeDeleteModal, deleteProduct, productIdToDelete }) => {
  return (
    showModal && (
      <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
        {/* Phần overlay */}
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

        {/* Phần container của modal */}
        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          {/* Phần nút đóng modal */}
          <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50" onClick={closeDeleteModal}>
            <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path
                d="M14.72 14.72a1 1 0 0 1-1.41 0L9 10.41l-4.31 4.31a1 1 0 0 1-1.41-1.41L7.59 9 3.28 4.69a1 1 0 1 1 1.41-1.41L9 7.59l4.31-4.3a1 1 0 0 1 1.41 1.41L10.41 9z"
              />
            </svg>
            <span className="text-sm">(Esc)</span>
          </div>

          {/* Phần nội dung của modal */}
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
              {/* Nút xác nhận xóa */}
              <button className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2" onClick={() => deleteProduct(productIdToDelete)}>
                Xác nhận
              </button>
              {/* Nút hủy bỏ */}
              <button className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400" onClick={closeDeleteModal}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteConfirmationModal;
