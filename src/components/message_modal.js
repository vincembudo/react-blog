import React, { useEffect, useState } from 'react';

const MessageModal = ({ show, message }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(show);
    if (show) {
      setTimeout(() => {
        setIsOpen(false);
      }, 2000); 
    }
  }, [show]);

  return (
    <div className={`modal fade ${isOpen ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
      <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Alert</h5>
      </div>
      <div class="modal-body">
        <p className='mb-3'>{message}</p>
      </div>
    </div>
  </div>
    </div>
  );
};

export default MessageModal;
