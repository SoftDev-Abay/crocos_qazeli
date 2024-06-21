import "./style.scss";
import RequireAuth from "@/app/components/RequireAuth/RequireAuth";

import { FC, ReactNode } from "react";
import Sidebar from "./Sidebar";
const AdminWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <RequireAuth allowedRoles={["hotel"]}>
        <div className="wrapper-admin-panel">
          <Sidebar />
          <div className="content">{children}</div>
        </div>
      </RequireAuth>
    </>
  );
};

export default AdminWrapper;
