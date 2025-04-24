import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import {ThreadListItemPrimitive} from "@assistant-ui/react";
import { ThreadList } from "../compositions/components/assistant-ui/thread-list.tsx";
import { Thread } from "../compositions/components/assistant-ui/thread.tsx";

export const Test = () => {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="grid h-dvh grid-cols-[200px_1fr] gap-x-2 px-4 py-4">
        <ThreadList />
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
};