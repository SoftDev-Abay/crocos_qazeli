import React, { InputHTMLAttributes } from "react";
import { ChangeHandler } from "react-hook-form";
import classNames from "classnames";
import styles from "./styles.module.scss";
import InputMask from "react-input-mask";
import EyeIcon from "../../icons/EyeIcon";
import EyeClose from "../../icons/EyeClose";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  type?: string;
  name?: string;
  defaultPhone?: string;
  register?: {
    onChange: ChangeHandler;
    onBlur: ChangeHandler;
    ref: React.Ref<any>;
    name: string;
  };
  onChange?: Function;
  onBlur?: ChangeHandler;
  ref?: string;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  icon?: React.ReactElement;
  code?: boolean;
  underline?: boolean;
  border?: boolean;
  checkbox?: boolean;
  changeType?: any;
  placeholder?: string;
  disabled?: boolean;
  borderFocus?: boolean;
  style?: any;
  borderFilterRoomTop?: boolean;
  error?: string | undefined;
};

const Input: React.FC<Props> = ({
  className,
  type,
  code = false,
  register,
  name,
  iconLeft,
  iconRight,
  onChange,
  ref,
  onBlur,
  icon,
  defaultPhone,
  underline,
  checkbox,
  changeType,
  placeholder,
  border,
  borderFocus,
  disabled = false,
  style,
  borderFilterRoomTop = false,
  error = false,
  ...props
}) => {
  return (
    <div>
      <div
        className={classNames(styles.inputGroup, {
          [styles.inputGroupLeft]: iconLeft,
        })}
        style={checkbox ? { height: 20 } : {}}
      >
        {iconLeft ?? null}
        {type !== "phone" && type !== "password" && code === false && (
          <input
            type={type || "text"}
            name={name || register?.name}
            className={`${
              underline
                ? classNames(styles.input_underline, styles.input, className, {
                    [styles.inputIcon]: iconLeft || iconRight,
                    [styles.inputIconLeft]: iconLeft,
                    [styles.inputIconRight]: iconRight,
                    [styles.inputError]: error,
                  })
                : border
                ? classNames(styles.input, styles.inputBorder, className, {
                    [styles.inputIcon]: iconLeft || iconRight,
                    [styles.inputIconLeft]: iconLeft,
                    [styles.inputIconRight]: iconRight,
                    [styles.inputError]: error,
                  })
                : borderFocus
                ? classNames(styles.input, styles.inputBorderFocus, className, {
                    [styles.inputIcon]: iconLeft || iconRight,
                    [styles.inputIconLeft]: iconLeft,
                    [styles.inputIconRight]: iconRight,
                    [styles.inputError]: error,
                  })
                : classNames(styles.input, className, {
                    [styles.inputIcon]: iconLeft || iconRight,
                    [styles.inputIconLeft]: iconLeft,
                    [styles.inputIconRight]: iconRight,
                    [styles.inputError]: error,
                  })
            }
             ${
               borderFilterRoomTop ? classNames(styles.borderFilterRoomTop) : ""
             }`}
            ref={ref || register?.ref}
            onChange={onChange || register?.onChange}
            onBlur={onBlur || register?.onBlur}
            placeholder={placeholder}
            style={style && style}
            {...props}
          />
        )}
        <div
          className={classNames(
            styles.inputRightIcon,
            border ? "activeArrow" : "initialArrow"
          )}
        >
          {icon ? icon : null}
        </div>
        {disabled ? <div className={styles.disabledDiv}></div> : <></>}

        {type === "phone" && (
          <InputMask
            name={name || register?.name}
            onChange={register?.onChange}
            onBlur={register?.onBlur}
            mask="+7 (999) 999 99 99"
            alwaysShowMask
            className={`${
              underline
                ? classNames(styles.input_underline, styles.input, className, {
                    [styles.inputIcon]: iconLeft || iconRight,
                    [styles.inputIconLeft]: iconLeft,
                    [styles.inputError]: error,
                  })
                : classNames(styles.input, className, {
                    [styles.inputIcon]: iconLeft || iconRight,
                    [styles.inputIconLeft]: iconLeft,
                    [styles.inputError]: error,
                  })
            }
              ${checkbox ? classNames(styles.input_checkbox) : ""}`}
            ref={register?.ref}
            {...props}
          />
        )}
        {type === "password" && (
          <>
            <input
              type={type}
              name={name || register?.name}
              className={`${classNames(
                styles.input,
                className,
                styles.inputIconRight,
                styles.inputIcon,
                { [styles.inputIconLeft]: iconLeft, [styles.inputError]: error }
              )}
            ${checkbox ? classNames(styles.input_checkbox) : ""}`}
              ref={ref || register?.ref}
              onChange={onChange || register?.onChange}
              onBlur={onBlur || register?.onBlur}
              placeholder={placeholder}
              {...props}
            />
            <div
              className={styles.inputRightIcon}
              onClick={() => changeType("text")}
            >
              <EyeClose />
            </div>
          </>
        )}
        {changeType && type !== "password" ? (
          <div
            className={styles.inputRightIcon}
            onClick={() => changeType("password")}
          >
            <EyeIcon />
          </div>
        ) : null}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Input;
