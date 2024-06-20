import React from "react";
import { ChangeHandler } from "react-hook-form";
import Select, { components } from "react-select";
import { Controller, useForm } from "react-hook-form";
import ArrowDownIcon from "@/app/icons/ArrowDownIcon";

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
};

const InputSelect: React.FC<Props> = ({
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
}) => {
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      outline: "none",
      width: "100%",
      borderRadius: "10px",
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "normal",
      border: state.isFocused ? "1px solid #156CBD" : "1px solid #a8b7c7",
      boxShadow: state.isFocused ? 0 : 0,
      "&:hover": {
        border: state.isFocused ? "1px solid #156CBD" : "1px solid #a8b7c7",
      },
    }),

    valueContainer: (provided: any) =>
      icon
        ? {
            ...provided,
            padding: "17px 15px 17px 43px",
            "&:focus": { border: "none", outline: "none" },
          }
        : {
            ...provided,
            padding: "17px 15px ",
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
      paddingRight: "22px",
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 3,
      borderRadius: "10px",
      padding: "0",
      overflow: "hidden",
    }),
    option: (provided: any) => ({
      ...provided,
      "&:first-child": { borderRadius: "10px 10px 0 0", marginTop: "-4px" },
      "&:last-child": { borderRadius: " 0 0 10px 10px", marginBottom: "-4px" },
      "&:focus": { backgroundColor: "#156cbd" },
    }),
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <Controller
          name={name || register?.name}
          control={control}
          render={({ field: { value, onChange, onBlur, ref } }) => {
            return (
              <Select
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
                value={options?.filter((item) =>
                  defaultValue
                    ? defaultValue === item.value
                    : value === item.value
                )}
                isSearchable={notSearchable ? false : true}
                defaultValue={options?.filter(
                  (item) => defaultValue === item.value
                )}
                onChange={(item) => onChange(item?.value)}
                getOptionValue={(option) => `${option["value"]}`}
                getOptionLabel={(label) => `${label["label"]}`}
                placeholder={placeholder}
                noOptionsMessage={() => "Совпадении не найдено"}
                options={options}
                components={{
                  DropdownIndicator: () => (
                    <div
                      style={{
                        paddingRight: "22px",
                        // top: "50%"
                        // transform: "transitionY(-50%)"
                      }}
                    >
                      <ArrowDownIcon />
                    </div>
                  ),
                }}
              />
            );
          }}
        />
        {icon ? (
          <div style={{ position: "absolute", top: "15px", left: "15px" }}>
            {icon}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default InputSelect;
