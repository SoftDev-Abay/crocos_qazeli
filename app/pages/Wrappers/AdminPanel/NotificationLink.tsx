import React, { FC } from "react";
import { usePathname } from "next/navigation";

interface NotificationLinkProps {
  title: string;
  url: string;
  icon: React.ReactNode;
}

const NotificationLink: FC<NotificationLinkProps> = ({
  title,
  url,
  icon,
  ...rest
}) => {
  const pathname = usePathname();
  const isActive = pathname === url;

  const staticNumber = 3;
  return (
    <div className={`link  link_with_icon ${isActive && "active"}`} {...rest}>
      <div className="icon-text-wrapper">
        {icon}
        <p>{title}</p>
      </div>
      <div className="notification-number-badge">
        <span>{staticNumber}</span>
      </div>
    </div>
  );
};

export default NotificationLink;
