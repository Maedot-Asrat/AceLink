import React from 'react';
import './PopupForm.css';

const AddGroupModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Group Information</h2>
        <form>
          <div>
            <label>Group Name</label>
            <input type="text" />
          </div>
          <div>
            <label>Description</label>
            <input type="text" />
          </div>
          <div>
            <label>Subject</label>
            <input type="text" />
          </div>
          <div>
            <label>Grade Level</label>
            <input type="text" />
          </div>
          <div>
            <label>Upload a Resource</label>
            <input type="file" />
          </div>
          <div>
            <label>Thumbnail</label>
            <input type="file" />
          </div>
          <div>
            <button type="button" onClick={onClose}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGroupModal;
