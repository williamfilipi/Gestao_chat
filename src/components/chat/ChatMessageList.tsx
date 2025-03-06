import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  type: "user" | "ai";
  timestamp: string;
  isRead?: boolean;
}

interface ChatMessageListProps {
  messages?: Message[];
  isTyping?: boolean;
  onFeedback?: (messageId: string, isHelpful: boolean) => void;
}

const ChatMessageList = ({
  messages = [
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
    {
      id: "user-1",
      content: "I need help with my recent order.",
      type: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isRead: true,
    },
    {
      id: "ai-1",
      content:
        "I'd be happy to help with your order. Could you please provide your order number so I can look up the details?",
      type: "ai",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isRead: true,
    },
  ],
  isTyping = false,
  onFeedback = () => {},
}: ChatMessageListProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive or when typing indicator appears
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full w-full bg-white">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="flex flex-col space-y-2">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              type={message.type}
              timestamp={message.timestamp}
              isRead={message.isRead}
              onFeedback={(isHelpful) => onFeedback(message.id, isHelpful)}
            />
          ))}
          {isTyping && (
            <div className="mt-2">
              <TypingIndicator isTyping={isTyping} />
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatMessageList;
