import React from "react";
import { TextField } from "@mui/material";
import InputMask from "react-input-mask";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

type FormInputProps = {
  name: string;
  control: any;
  label: string;
};

const FormInputPhone = ({ name, control, label }: FormInputProps) => {
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
        <InputMask
          mask="+7 (999) 999-99-99"
          value={value}
          onChange={onChange}
          disabled={false}
          clearMaskOnLostFocus={false}
          error={!!error}
        >
          {() => (
            <TextField
              id="outlined-basic"
              label={label}
              variant="standard"
              InputLabelProps={{ shrink: true }}
              placeholder="+7 (___) ___-__-__"
              helperText={
                error
                  ? t(`pages.contact_us.contact_form.errors.${error.message}`)
                  : null
              }
              error={!!error}
            />
          )}
        </InputMask>
      )}
    />
  );
};

export default FormInputPhone;
