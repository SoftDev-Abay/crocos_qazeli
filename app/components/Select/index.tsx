import React from "react";
import { ChangeHandler } from "react-hook-form";
import Select, { components } from "react-select";
import { Controller, useForm } from "react-hook-form";
import ArrowDownIcon from "@/app/icons/ArrowDownIcon";
import CloseIcon from "@/app/icons/CloseIcon";
import InputErrorText from "../InputErrorText/InputErrorText";

const CustomMultiValueRemove = (props: any) => {
  const { innerProps, innerRef } = props;
  return (
    <div {...innerProps} ref={innerRef}>
      <span className="custom-remove-button" onClick={props.onClick}>
        <CloseIcon width={16} height={16} color="" />
      </span>
    </div>
  );
};

type Props = {
  register: {
    onChange: ChangeHandler;
    onBlur: ChangeHandler;
    ref: React.Ref<any>;
    name: string;
  };
  options: any[] | undefined;
  control: any;
  backgroundColor?: string;
  border?: string;
  placeholder?: string;
  name?: string;
  forNotification?: boolean;
  handleSelect?: Function;
  defaultValue?: any;
  selectedOptions?: any[];
  icon?: React.ReactElement;
  notSearchable?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  noOptionMessage?: string;
  error?: string;
  isLoading?: boolean;
};

const AdminSelect: React.FC<Props> = ({
  register,
  selectedOptions,
  handleSelect,
  defaultValue,
  name,
  options,
  control,
  backgroundColor,
  border,
  placeholder,
  forNotification,
  icon,
  notSearchable,
  multiple,
  noOptionMessage,
  disabled = false,
  isLoading,
  error,
}) => {
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      outline: "none",
      width: "100%",
      borderRadius: "10px",
      backgroundColor: "white",
      color: "#26333d",
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "normal",
      border: state.isFocused ? "1px solid #26333D" : "1px solid #26333D",
      boxShadow: state.isFocused ? 0 : 0,
      "&:hover": {
        border: state.isFocused ? "1px solid #26333D" : "1px solid #26333D",
      },
      "&:disabled": {
        color: "#26333d",
      },
    }),

    valueContainer: (provided: any) =>
      icon
        ? {
            ...provided,

            padding: "12px 15px 12px 38px",
            "&:focus": { border: "none", outline: "none" },
          }
        : {
            ...provided,

            padding: "11px 15px ",
            "&:focus": { border: "none", outline: "none" },
          },
    placeholder: (provided: any) => ({
      ...provided,
      color: "#26333D",
    }),
    input: (provided: any) => ({
      ...provided,
      color: "#26333D",
      margin: 0,
      padding: 0,
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      backgroundColor: "none",
    }),

    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "#26333D",
      paddingRight: "10px",
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 3,
      borderRadius: "10px",
      padding: "0",
    }),
    option: (provided: any) => ({
      ...provided,
      "&:first-child": { borderRadius: "5px 5px 0 0", marginTop: "-4px" },
      "&:last-child": { borderRadius: " 0 0 5px 5px", marginBottom: "-4px" },
      "&:focus": { backgroundColor: "#156cbd" },
    }),
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <Controller
          name={name || register?.name}
          control={control}
          render={({ field: { value, onChange, onBlur, ref } }) => {
            return (
              <Select
                isLoading={isLoading}
                styles={customStyles}
                ref={ref}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 4,
                  colors: {
                    ...theme.colors,
                    primary: "#00a2e4",
                  },
                })}
                closeMenuOnScroll={true}
                value={
                  multiple
                    ? options?.filter((option) => value?.includes(option.value))
                    : options?.filter((item) =>
                        defaultValue
                          ? defaultValue === item.value
                          : value === item.value
                      )
                }
                isClearable
                isSearchable={notSearchable ? false : true}
                defaultValue={options?.filter(
                  (item) => defaultValue === item.value
                )}
                isDisabled={disabled}
                onChange={
                  multiple
                    ? (options) => {
                        onChange(options?.map((option: any) => option.value));
                      }
                    : (item) => {
                        onChange(item?.value);
                      }
                }
                getOptionValue={(option) => `${option["value"]}`}
                getOptionLabel={(label) => `${label["label"]}`}
                placeholder={placeholder}
                noOptionsMessage={() =>
                  noOptionMessage ? noOptionMessage : `Совпадении не найдено`
                }
                options={options}
                isMulti={multiple ? multiple : false}
                components={{
                  DropdownIndicator: () => (
                    <div
                      style={{
                        padding: "8px 8px 8px 0px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ArrowDownIcon width={20} height={20} />
                    </div>
                  ),
                }}
              />
            );
          }}
        />
        {icon ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "14px",
              transform: "translateY(-50%)",
            }}
          >
            {icon}
          </div>
        ) : (
          <></>
        )}
      </div>
      {error && <InputErrorText error={error} />}
    </div>
  );
};

export default AdminSelect;
