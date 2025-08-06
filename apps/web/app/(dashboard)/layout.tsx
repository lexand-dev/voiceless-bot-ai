import { DashboardLayout } from "@/modules/dashboard/ui/layouts/dahsboard-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
