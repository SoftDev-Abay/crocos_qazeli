import "./style.scss";
import Navbar from "./Navbar";

import { FC, ReactNode } from "react";

const AuthWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="wrapper-auth">
      <div className="container">
        <Navbar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default AuthWrapper;
