import React, { useEffect } from "react";
import InputMask from "react-input-mask";
import LocationModal from "@/app/pages/AdminPanel/shared/LocationModal";
import Input from "../Input/Input";
import InputErrorText from "../InputErrorText/InputErrorText";

interface ILocationInputProps {
  longitude: number;
  latitude: number;
  onChangeLatitude: Function;
  onChangeLongitude: Function;
  error?: string;
}

const LocationInput = ({
  longitude,
  latitude,
  onChangeLatitude,
  onChangeLongitude,
  error,
}: ILocationInputProps) => {
  const mask = "55.75, 37.57";

  const [coordinates, setCoordinates] = React.useState<number[]>([
    55.75, 37.57,
  ]);
  const [isShow, setIsShow] = React.useState(false);

  const handleShowLocationModal = () => {
    setIsShow(true);
  };

  const handleCloseLocationModal = () => {
    setIsShow(false);
  };

  const formattCoordinates = (coordinates: number[]) => {
    return coordinates.map((coordinate) => coordinate.toFixed(3)).join(", ");
  };

  useEffect(() => {
    onChangeLatitude(coordinates[0]);
    onChangeLongitude(coordinates[1]);
  }, [latitude, longitude]);

  return (
    <div>
      <Input
        type="text"
        className="admin-panel-input"
        placeholder={mask}
        value={formattCoordinates(coordinates)}
        // disabled
        onClick={handleShowLocationModal}
      />
      {error && <InputErrorText error={error} />}
      <LocationModal
        setCoordinates={setCoordinates}
        coordinates={coordinates}
        isShow={isShow}
        handleClose={handleCloseLocationModal}
      />
    </div>
  );
};

export default LocationInput;
