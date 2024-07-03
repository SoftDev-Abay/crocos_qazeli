import { useRouter } from "next/router";
import { UseUserStore } from "@/app/store/useUserStore";
import { useEffect, useState } from "react";

interface RequireAuthProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({
  allowedRoles,
  children,
}) => {
  const router = useRouter();
  const user = UseUserStore((state) => state.currentUser);

  const [rendered, setRendered] = useState(false);

  const role = user?.role?.slug;


  useEffect(() => {
    setRendered(true);
  }, []);

  useEffect(() => {
    if (rendered) {
      if (!role || !allowedRoles.includes(role)) {
        router.push("/auth/sign-in");
      }
    }
  }, [user, rendered]);

  const content = role && allowedRoles.includes(role) ? children : null;

  return <>{content}</>;
};

export default RequireAuth;
