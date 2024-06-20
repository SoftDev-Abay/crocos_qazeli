import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

type FormInputProps = {
  name: string;
  control: any;
  label: string;
};

const FormInputText = ({ name, control, label }: FormInputProps) => {
  const t = useTranslations();
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          id="outlined-basic"
          onChange={onChange}
          helperText={
            error
              ? t(`pages.contact_us.contact_form.errors.${error.message}`)
              : null
          }
          error={!!error}
          value={value}
          label={label}
          variant="standard"
          InputLabelProps={{ shrink: true }}
          placeholder={label}
        />
      )}
    />
  );
};

export default FormInputText;
