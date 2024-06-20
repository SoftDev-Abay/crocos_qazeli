import React, { useEffect } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { Controller, useController } from "react-hook-form";

type FormInputCheckboxProps = {
  name: string;
  control: any;
  label: React.ReactNode;
};

export const FormInputCheckbox: React.FC<FormInputCheckboxProps> = ({
  name,
  control,
  label,
}) => {
  return (
    <>
      <FormControl size="small" variant="outlined">
        <FormControlLabel
          control={
            <Controller
              name={name}
              render={({ field, fieldState: { error }, formState }) => (
                <>
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    sx={{
                      color: error ? "#f44336" : "#33333333",
                      "&.Mui-checked": {
                        color: "#6EB63C",
                      },
                    }}
                  />
                </>
              )}
              control={control}
            />
          }
          label={label}
        />
      </FormControl>
      {/* <FormHelperText error={!!error} sx={{ color: "#f44336" }}>
        {error ? error.message : null}
      </FormHelperText> */}
    </>
  );
};
