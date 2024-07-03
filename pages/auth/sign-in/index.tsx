import React, { use, useState } from "react";
import AuthWrapper from "@/app/pages/Wrappers/AuthWrapper/Wrapper";
import "./style.scss";
import Image from "next/image";
import Input from "@/app/components/Input/Input";
import ChieldIcon from "@/app/icons/ChieldIcon";
import ProfileIcon from "@/app/icons/ProfileIcon";
import Button from "@/app/components/Button/Button";
import { SignInSchema, SignInType } from "@/app/utils/validation";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { ObjectSchema, AnyObject } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAxios } from "@/app/context/AxiosContext";
import { UseUserStore } from "@/app/store/useUserStore";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const Page = () => {
  const [passwordType, setPasswordType] = useState("password");

  const axios = useAxios();
  const router = useRouter();

  const changePasswordType = (type: string) => {
    setPasswordType(type);
  };

  const { currentUser } = UseUserStore.getState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit: SubmitHandler<SignInType> = async (data) => {
    try {
      const response = await axios.post("/api/v1/login", data);

      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;
      const user = response.data.data;

      UseUserStore.getState().setCurrentUser(user);

      Cookies.set("access_token", access_token);
      Cookies.set("refresh_token", refresh_token);

      toast.success("Авторизация прошла успешно!");

      router.push("/admin-panel");
    } catch (error) {
      console.log(error);

      if (
        error instanceof AxiosError &&
        error.response?.data &&
        error.response?.data.errors
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Произошла ошибка при авторизации!");
      }
    }
  };

  return (
    <AuthWrapper>
      <>
        <div className="auth-card">
          <div className="header">
            <Image
              src="/imgs/logo_white.png"
              alt="Logo"
              priority
              width="115"
              height="39"
            />
          </div>
          <div className="body">
            <h3>Login</h3>
            <div className="inputs">
              <Input
                type="text"
                placeholder="Email"
                className="input"
                iconLeft={
                  <ProfileIcon width={17} height={17} color="#26333D" />
                }
                register={register("email")}
                error={errors.email?.message}
              />
              <Input
                type={passwordType}
                changeType={changePasswordType}
                placeholder="Password"
                className="input"
                iconLeft={<ChieldIcon color="#26333D" width={17} height={17} />}
                register={register("password")}
                error={errors.password?.message}
              />
            </div>
            <div className="actions">
              <Button
                color="primary"
                size="lg"
                style={{ width: "100%" }}
                onClick={handleSubmit(onSubmit)}
              >
                Login
              </Button>
              <a href="#">Forgot password?</a>
            </div>

            <div className="separator"></div>

            <div className="button-change">
              <Button color="highlight" size="lg" style={{ width: "100%" }}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </>
    </AuthWrapper>
  );
};

export default Page;
