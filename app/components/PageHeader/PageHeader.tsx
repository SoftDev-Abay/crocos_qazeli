import React from "react";

interface PageHeaderProps {
  buttons?: React.ReactNode[];
  title: string;
  goBack?: boolean;
}
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import { popOneRouteFromPath } from "@/app/utils/helpers";
import { usePathname, useRouter } from "next/navigation";
import "./style.scss";

const PageHeader = ({ buttons, title, goBack }: PageHeaderProps) => {
  const pathname = usePathname(); // get current path
  const router = useRouter();

  const handleGoBack = () => {
    if (!pathname) return;
    const newPath = popOneRouteFromPath(pathname);
    router.push(newPath);
  };

  return (
    <div className="page-header">
      <div className="header">
        <h1>{title}</h1>
        <div className="buttons-wrapper">{buttons}</div>
      </div>
      {goBack && (
        <div className="go-back-wrapper" onClick={handleGoBack}>
          <ArrowLeftIcon width={17} height={17} />
          <span>Назад</span>
        </div>
      )}
    </div>
  );
};

export default PageHeader;
