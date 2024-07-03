import React, { useState, FC } from "react";
import ChevroletDownIcon from "@/app/icons/ChevroletDownIcon";
import ChevroletUpIcon from "@/app/icons/ChevroletUpIcon";

import Link from "next/link";
import { usePathname } from "next/navigation";

import "./style.scss";

interface NestedLinksBoxProps {
  title: string;
  url: string;
  icon: React.ReactNode;
  nestedLinks?: { title: string; url: string }[];
}

const NestedLinksBox: FC<NestedLinksBoxProps> = ({
  title,
  url,
  nestedLinks,
  icon,
  ...rest
}) => {
  const [nestedOpen, setNestedOpen] = useState(true);
  const pathname = usePathname();

  const handleNestedOpen = () => {
    if (nestedLinks) {
      setNestedOpen((prev) => !prev);
    } else {
      // Router.push(url);
    }
  };

  const isActive = (url: string) => pathname === url;

  return (
    <div>
      <div
        className={`link ${nestedLinks ? "link_with_icon" : ""}`}
        onClick={handleNestedOpen}
        {...rest}
      >
        <div className="icon-text-wrapper">
          {icon}

          <p>{title}</p>
        </div>

        {nestedLinks ? (
          nestedOpen ? (
            <ChevroletUpIcon width={20} height={20} />
          ) : (
            <ChevroletDownIcon width={20} height={20} />
          )
        ) : null}
      </div>
      {nestedLinks && nestedOpen && (
        <div className="nested-links-container">
          {nestedLinks.map((link, index) => (
            <Link
              href={link.url}
              className={`link ${isActive(link.url) && "active"}`}
              key={url + index}
            >
              <p>{link.title}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NestedLinksBox;
