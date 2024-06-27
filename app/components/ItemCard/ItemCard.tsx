import React, { useState } from "react";
import EditIcon from "@/app/icons/EditIcon";
import CloseCircleIcon from "@/app/icons/CloseCircleIcon";
import EyeIcon from "@/app/icons/EyeIcon";
import Card from "../Card/Card";
import { getPropByString } from "@/app/utils/helpers";
import ConfirmActionModal from "../ConfirmActionModal/ConfirmActionModal";
import Modal from "../Modal/Modal";
import "./style.scss";

interface ItemCardProps {
  item: any;
  labelPaths: {
    labelPath: string;
    label: string;
  }[];
  actions: {
    edit: () => void;
    delete: () => void;
    view: () => void;
  };
}

const getLabelFromPath = (path: string) => {
  const parts = path.split(".");
  return parts[parts.length - 1];
};

const ItemCard: React.FC<ItemCardProps> = ({ item, labelPaths, actions }) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleClose = () => {
    setIsShow(false);
  };

  const handleConfirm = async () => {
    await actions.delete();
    setIsShow(false);
  };

  const handleOpen = () => {
    setIsShow(true);
  };

  const correctFormat = labelPaths.map(({ labelPath, label }) => {
    const object = {
      label: label || getLabelFromPath(labelPath),
      value: getPropByString(item, labelPath),
    };

    return object;
  });

  return (
    <>
      <Card padding="padding-medium">
        <div className="item-card">
          <div className="info-wrapper">
            {correctFormat.map(({ label, value }, index) => (
              <div className="data-item" key={index}>
                <p className="label">{label}</p>
                <p className="value">{value}</p>
              </div>
            ))}
          </div>
          <div className="actions-wrapper">
            <div className="action" onClick={actions.view}>
              <EyeIcon color="#156CBD" width={20} height={20} />
            </div>
            <div className="action" onClick={actions.edit}>
              <EditIcon color="#58D072" width={20} height={20} />
            </div>
            <div className="action" onClick={handleOpen}>
              <CloseCircleIcon color="#BE4646" width={20} height={20} />
            </div>
          </div>
        </div>
      </Card>

      <ConfirmActionModal
        isShow={isShow}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        actionType="delete"
        itemName={item.name}
      />
    </>
  );
};

export default ItemCard;
