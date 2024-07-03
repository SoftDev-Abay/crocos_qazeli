import { useRouter } from "next/router";
import React, { useRef } from "react";
import { toast } from "react-toastify";

const BUTTON_ACTIONS = ["save", "sameMore"];

interface IUseFormSuccessAction {
  reset: () => void;
  toastText: string;
  fallBackUrl: string;
}

const useFormSuccessAction = ({
  reset,
  toastText,
  fallBackUrl,
}: IUseFormSuccessAction) => {
  const buttonTypeRef = useRef<string | null>(null);
  const router = useRouter();

  const setButtonAction = (buttonType: string) => {
    buttonTypeRef.current = buttonType;
  };

  const handleSuccessAction = () => {
    switch (buttonTypeRef.current) {
      case "save":
        toast.success(toastText);

        router.push(fallBackUrl);
        break;
      case "saveMore":
        toast.success(toastText);
        reset();
        break;
      default:
        // toast.success(toastText);

        // router.push(fallBackUrl);
        break;
    }
  };

  return {
    setButtonAction,
    handleSuccessAction,
  };
};

export default useFormSuccessAction;
