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

//  "check_in": "2025-01-01T15:00:00",
//  should only show time picker

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
              className="date-picker-custom-input"
              showTimeSelect
              showTimeSelectOnly
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="h:mm aa"
            />

            {error && error.message && <InputErrorText error={error.message} />}
          </>
        )}
      />
    </div>
  );
};

export default DatePickerInput;
