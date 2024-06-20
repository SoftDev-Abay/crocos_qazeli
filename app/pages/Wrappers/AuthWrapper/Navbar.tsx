import React from "react";
import Image from "next/image";
import "./style.scss";
import { FC, ReactNode } from "react";
import ProfileIcon from "@/app/icons/ProfileIcon";
import InputSelect from "@/app/components/Select";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <div className="item item-1">
          <Image
            src="/imgs/logo.png"
            alt="Logo"
            priority
            width="115"
            height="39"
          />
          <select name="" id="">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        <div className="item item-2">
          <select name="" id="">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
          <div className="icon-wrapper">
            <ProfileIcon width={24} height={24} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
