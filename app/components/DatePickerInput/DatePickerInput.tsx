import React from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import InputErrorText from "../InputErrorText/InputErrorText";

interface Props {
  control: any;
  name: string;
  inputError?: string;
}

const DatePickerInput = ({ control, name }: Props) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              timeIntervals={15}
              timeCaption="Date"
              className="date-picker-custom-input"
            />

            {error && error.message && <InputErrorText error={error.message} />}
          </>
        )}
      />
    </div>
  );
};

export default DatePickerInput;
