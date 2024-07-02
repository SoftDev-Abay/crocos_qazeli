import React, { useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import Modal from "@/app/components/Modal/Modal";
// import "./styles.module.scss";
import styles from "./styles.module.scss";

interface ILocationModalProps {
  setCoordinates: (coordinates: number[]) => void;
  coordinates: number[];
  isShow: boolean;
  handleClose: Function;
}

const LocationModal = ({
  setCoordinates,
  coordinates,
  isShow,
  handleClose,
}: ILocationModalProps) => {
  const handleMapClick = (e) => {
    const coords = e.get("coords");
    setCoordinates(coords);
  };

  return (
    <Modal isShow={isShow} handleClose={handleClose} maxWidth={702}>
      <div>
        <h3 className={styles.heading}>Укажите место на карте</h3>
        <YMaps>
          <Map
            defaultState={{ center: [55.75, 37.57], zoom: 9 }}
            onClick={handleMapClick}
            width="100%"
            height="400px"
          >
            <Placemark geometry={coordinates} />
          </Map>
        </YMaps>
      </div>
    </Modal>
  );
};

export default LocationModal;
