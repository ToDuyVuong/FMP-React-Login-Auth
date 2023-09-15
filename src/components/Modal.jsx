/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, content, autoCloseTime }) => {
  useEffect(() => {
    if (isOpen && autoCloseTime) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen, onClose, autoCloseTime]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay bg-black opacity-50 inset-0"></div>
      <div className="modal max-w-lg p-4 mx-auto bg-blue-200 rounded-lg shadow-lg">
        <div className="modal-content">
          <div className="modal-header flex justify-between items-center mb-4">
            <h2 className="modal-title text-xl font-bold mx-auto">
              Thông Báo {title}
            </h2>
          
          </div>
          <div className="modal-body text-center whitespace-pre-wrap break-words">
            {content}
          </div>
          <div className="modal-footer mt-4 flex justify-center">
            <button
              onClick={onClose}
              className="modal-close-button bg-red-500 text-white px-2 py-1 rounded-sm hover:bg-purple-600 transition duration-300"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
