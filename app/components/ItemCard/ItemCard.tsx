import React from "react";
import EditIcon from "@/app/icons/EditIcon";
import CloseCircleIcon from "@/app/icons/CloseCircleIcon";
import EyeIcon from "@/app/icons/EyeIcon";
import Card from "../Card/Card";

import "./style.scss";

interface ItemCardProps {
  data: {
    label: string;
    value: string;
  }[];
  actions: {
    edit: () => void;
    delete: () => void;
    view: () => void;
  };
}

const ItemCard: React.FC<ItemCardProps> = ({ data, actions }) => {
  return (
    <Card padding="padding-medium">
      <div className="item-card">
        <div className="info-wrapper">
          {data.map((item, index) => (
            <div className="data-item" key={index}>
              <p className="label">{item.label}</p>
              <p className="value">{item.value}</p>
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
          <div className="action" onClick={actions.delete}>
            <CloseCircleIcon color="#BE4646" width={20} height={20} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ItemCard;
