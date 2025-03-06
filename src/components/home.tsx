import React, { useState } from "react";
import { cn } from "@/lib/utils";
import ChatInterface from "./chat/ChatInterface";
import DashboardLayout from "./dashboard/DashboardLayout";

const Home = () => {
  const [view, setView] = useState<"chat" | "dashboard">("dashboard");
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setIsChatOpen(false);
  };

  const handleMinimize = () => {
    // Implementation for minimizing the chat
    console.log("Chat minimized");
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleSendMessage = (message: string) => {
    console.log("Message sent:", message);
    // Here you would typically send the message to your backend
  };

  const handleAttachFile = (file: File) => {
    console.log("File attached:", file.name);
    // Here you would typically upload the file to your backend
  };

  const handleRequestHumanAgent = () => {
    setIsLoading(true);
    console.log("Human agent requested");

    // Simulate a delay for the handoff process
    setTimeout(() => {
      setIsLoading(false);
      // Here you would typically initiate a handoff to a human agent
    }, 2000);
  };

  const handleMessageFeedback = (messageId: string, isHelpful: boolean) => {
    console.log(
      `Feedback for message ${messageId}: ${isHelpful ? "helpful" : "unhelpful"}`,
    );
    // Here you would typically send the feedback to your backend
  };

  // Toggle between views
  const toggleView = () => {
    setView(view === "chat" ? "dashboard" : "chat");
  };

  if (view === "dashboard") {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex justify-between items-center p-3 border-b">
          <h1 className="text-xl font-bold">WhatsApp Business Dashboard</h1>
          <button
            onClick={toggleView}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Switch to Chat View
          </button>
        </div>
        <DashboardLayout />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Customer Support
          </h1>
          <p className="text-gray-500 mt-2">
            Get help from our AI assistant or connect with a human agent
          </p>
          <button
            onClick={toggleView}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Switch to Dashboard View
          </button>
        </div>

        <div className="flex flex-col items-center justify-center">
          {isChatOpen ? (
            <ChatInterface
              title="Customer Support AI"
              onClose={handleClose}
              onMinimize={handleMinimize}
              onMaximize={handleMaximize}
              isMaximized={isMaximized}
              onSendMessage={handleSendMessage}
              onAttachFile={handleAttachFile}
              onRequestHumanAgent={handleRequestHumanAgent}
              onMessageFeedback={handleMessageFeedback}
              isLoading={isLoading}
              className={cn(
                isMaximized
                  ? "w-full h-[80vh] max-w-4xl"
                  : "w-[400px] h-[600px]",
              )}
            />
          ) : (
            <div className="text-center p-8 border rounded-lg shadow-sm bg-white">
              <p className="mb-4">Chat is currently closed</p>
              <button
                onClick={() => setIsChatOpen(true)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Open Chat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
