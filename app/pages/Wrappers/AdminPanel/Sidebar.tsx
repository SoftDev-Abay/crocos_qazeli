import React from "react";
import "./style.scss";
import Image from "next/image";
import LogoutCurveIcon from "@/app/icons/LogoutCurveIcon";
import EditIcon from "@/app/icons/EditIcon";
import Link from "next/link";
import NestedLinksBox from "./NestedLinksBox";
import HouseIcon from "@/app/icons/HouseIcon";
import BookmarkIcon from "@/app/icons/BookmarkIcon";
import NotificationLink from "./NotificationLink";

const links = {
  nestedLinks: [
    {
      title: "Ваш отель",
      url: "/admin-panel/hotel",
      icon: <HouseIcon color="#156CBD" width={20} height={20} />,
      nestedLinks: [
        {
          title: "Номера",
          url: "/admin-panel/hotel/rooms",
        },
        {
          title: "Места размещения",
          url: "/admin-panel/hotel/accommodations",
        },

        {
          title: "Тип номеров",
          url: "/admin-panel/hotel/room-type",
        },
        {
          title: "Цены и предложения",
          url: "/admin-panel/hotel/prices",
        },
        {
          title: "Данные места размещений",
          url: "/admin-panel/hotel/accommodation",
        },
      ],
    },
  ],
  singleLinks: [],
  notificationLinks: [
    {
      title: "Уведомления",
      url: "/admin-panel/notifications",
      icon: <BookmarkIcon color="#156CBD" width={20} height={20} />,
    },
  ],
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="header">
        <Image
          src="/imgs/logo.png"
          alt="Logo"
          width={115}
          height={39}
          className="logo"
        />
        <div className="logout">
          <LogoutCurveIcon color="#156CBD" width={17} height={17} />
          <span>Logout</span>
        </div>
      </div>
      <div className="profile-container">
        <div className="info">
          <div className="icon-wrapper">
            <span>3</span>
          </div>
          <div className="text">
            <p>SENATOR Hotel</p>
            <span>hotel@mail.kz</span>
          </div>
        </div>
        <EditIcon color="#156CBD" width={20} height={20} />
      </div>
      <nav>
        {links.nestedLinks.map((link, index) => (
          <NestedLinksBox
            title={link.title}
            url={link.url}
            icon={link.icon}
            nestedLinks={link.nestedLinks}
            key={index}
          />
        ))}

        {links.notificationLinks.map((link, index) => (
          <NotificationLink
            title={link.title}
            url={link.url}
            icon={link.icon}
            key={index}
          />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
