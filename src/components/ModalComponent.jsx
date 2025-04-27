// @components/ModalComponent.jsx
import React from 'react';
import { IoClose } from "react-icons/io5";


const ModalComponent = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal_overlay">
      <div className="modal_content">
        <div className="modal_header">
          <h2>{title}</h2>
          <button onClick={onClose}><IoClose /></button>
        </div>
        <div className="modal_body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
