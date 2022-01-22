import React, { useContext } from "react";
import { appContext } from "../context/AppContext";

export const ConfirmDeletion = (props) => {
  const { setOkToDelete, setShowDeleteConfirm, setDeletePressed } =
    useContext(appContext);

  const confirmDelete = () => {
    setShowDeleteConfirm(false);
    setDeletePressed(false);
    setOkToDelete(true);
  };

  const cancelDelete = () => {
    setDeletePressed(false);
    setShowDeleteConfirm(false);
    setOkToDelete(false);
  };

  return (
    <div className="popup-container">
      <div className="popup-bg" />
      <div className="popup-message">
        <h2>Confirmás eliminar este Tweet?</h2>
        <div className="popup-buttons">
          <button onClick={confirmDelete}>OK</button>
          <button onClick={cancelDelete}>CANCEL</button>
        </div>
      </div>
    </div>
  );
};
