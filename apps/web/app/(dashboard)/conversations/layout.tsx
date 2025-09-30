import { ConversationsLayout } from "@/modules/dashboard/ui/layouts/conversation-layout";

function Layout({ children }: { children: React.ReactNode }) {
  return <ConversationsLayout>{children}</ConversationsLayout>;
}

export default Layout;
