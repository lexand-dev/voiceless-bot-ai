"use client";

import { useVapi } from "@/modules/widget/hooks/use-vapi";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const {
    endCall,
    startCall,
    isConnected,
    isConnecting,
    isSpeaking,
    transcript
  } = useVapi();

  return (
    <div className="flex flex-col items-center justify-center min-h-svh max-w-md mx-auto w-full">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Voice Widget</h1>
        <Button
          onClick={isConnected ? endCall : startCall}
          disabled={isConnecting}
        >
          {isConnected ? "End Call" : "Start Call"}
        </Button>
        {isSpeaking && <p className="text-green-500">Speaking...</p>}
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          {isConnected ? "You are connected." : "Click to start a call."}
        </p>
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          {isConnecting ? "Connecting..." : ""}
        </p>
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          {isSpeaking ? "You are speaking." : ""}
        </p>
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          {transcript
            ? JSON.stringify(transcript, null, 2)
            : "No transcript available."}
        </p>
      </div>
    </div>
  );
}
