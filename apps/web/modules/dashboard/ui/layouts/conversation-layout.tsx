import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@workspace/ui/components/resizable";
import { ConversationPanel } from "../components/conversation-panel";

export const ConversationsLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full flex-1">
      <ResizablePanel minSize={20} defaultSize={30} maxSize={30}>
        <ConversationPanel />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70} className="h-full">
        <main className="flex flex-1 flex-col">{children}</main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
