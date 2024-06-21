import React, { FC } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

import "./style.scss";

interface ConfirmActionProps {
  isShow: boolean;
  handleClose: Function;
  handleConfirm: Function;
  actionType: "delete" | "update";
  itemName?: string;
}

const ConfirmActionModal: FC<ConfirmActionProps> = ({
  isShow,
  handleClose,
  handleConfirm,
  actionType,
  itemName,
}) => {
  return (
    <>
      <Modal isShow={isShow} handleClose={handleClose} maxWidth={702}>
        <div className="confirm-action">
          <h3>{actionType === "delete" ? "Удаление" : "Обновление"}</h3>

          <h2 className="title">
            {`Вы уверены что хотите ${
              actionType === "delete" ? "удалить" : "обновить"
            } ${itemName || "this item"}?`}
          </h2>
          <div className="actions">
            <Button size="sm" color="danger" onClick={() => handleConfirm()}>
              Подтвердить
            </Button>
            <Button size="sm" color="dark" onClick={() => handleClose()}>
              Отмена
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmActionModal;
