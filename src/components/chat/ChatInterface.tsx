import React, { useState } from "react";
import { cn } from "@/lib/utils";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatInputArea from "./ChatInputArea";
import HumanHandoffButton from "./HumanHandoffButton";

interface Message {
  id: string;
  content: string;
  type: "user" | "ai";
  timestamp: string;
  isRead?: boolean;
}

interface ChatInterfaceProps {
  initialMessages?: Message[];
  title?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
  onSendMessage?: (message: string) => void;
  onAttachFile?: (file: File) => void;
  onRequestHumanAgent?: () => void;
  onMessageFeedback?: (messageId: string, isHelpful: boolean) => void;
  isLoading?: boolean;
  className?: string;
}

const ChatInterface = ({
  initialMessages = [
    {
      id: "welcome",
      content: "Hello! How can I help you today?",
      type: "ai",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isRead: true,
    },
  ],
  title = "Customer Support",
  onClose = () => {},
  onMinimize = () => {},
  onMaximize = () => {},
  isMaximized = false,
  onSendMessage = () => {},
  onAttachFile = () => {},
  onRequestHumanAgent = () => {},
  onMessageFeedback = () => {},
  isLoading = false,
  className = "",
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (content: string) => {
    // Add user message to chat
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      type: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isRead: true,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    // Call the parent handler
    onSendMessage(content);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: "Thank you for your message. I'm processing your request.",
        type: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isRead: true,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiMessage]);
    }, 2000);
  };

  const handleFeedback = (messageId: string, isHelpful: boolean) => {
    // Call the parent handler
    onMessageFeedback(messageId, isHelpful);
  };

  const handleAttachFile = (file: File) => {
    // Call the parent handler
    onAttachFile(file);

    // Add a message indicating a file was attached
    const fileMessage: Message = {
      id: `file-${Date.now()}`,
      content: `File attached: ${file.name}`,
      type: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isRead: true,
    };

    setMessages((prev) => [...prev, fileMessage]);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-[600px] w-[400px] border rounded-lg shadow-lg overflow-hidden bg-white",
        className,
      )}
    >
      <ChatHeader
        title={title}
        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        isMaximized={isMaximized}
      />

      <div className="flex-1 overflow-hidden">
        <ChatMessageList
          messages={messages}
          isTyping={isTyping}
          onFeedback={handleFeedback}
        />
      </div>

      <HumanHandoffButton onClick={onRequestHumanAgent} isLoading={isLoading} />

      <ChatInputArea
        onSendMessage={handleSendMessage}
        onAttachFile={handleAttachFile}
        isDisabled={isLoading}
      />
    </div>
  );
};

export default ChatInterface;
