import { useRouter } from "next/router";
import { useUserStore } from "@/app/store/useUserStore";
import { useEffect } from "react";

interface RequireAuthProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({
  allowedRoles,
  children,
}) => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const role = user?.role?.slug;

  useEffect(() => {
    if (user || !role) {
      router.push("/auth/sign-in");
    }
  }, [role]);

  const content = allowedRoles.includes(role) ? children : null;

  return <>{content}</>;
};

export default RequireAuth;
