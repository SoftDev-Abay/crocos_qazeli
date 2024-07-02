import "./style.scss";
import RequireAuth from "@/app/components/RequireAuth/RequireAuth";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";

import { FC, ReactNode } from "react";
import Sidebar from "./Sidebar";
import { useLoadingContext } from "@/app/context/LoadingContext";
const AdminWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadingContext();
  return (
    <>
      {isLoading && <LoadingSpinner />}

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
