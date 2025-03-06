import React from "react";
import { cn } from "@/lib/utils";
import { Send, Paperclip, Smile, MoreVertical, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ChatMessage from "../chat/ChatMessage";
import TypingIndicator from "../chat/TypingIndicator";

interface ConversationViewProps {
  chatId: string | null;
  onToggleContactInfo: () => void;
  className?: string;
}

interface Message {
  id: string;
  content: string;
  type: "user" | "ai";
  timestamp: string;
  isRead?: boolean;
}

const mockMessages: Record<string, Message[]> = {
  chat1: [
    {
      id: "1",
      content: "Order number: O5658HHJJ876",
      type: "user",
      timestamp: "10:27",
      isRead: true,
    },
    {
      id: "2",
      content:
        "Lulu Heart Paper: Fantastic 📦 the courier is on its way to your address ⚡ : could you share your location with us?",
      type: "ai",
      timestamp: "10:29",
      isRead: true,
    },
    {
      id: "3",
      content:
        "Thank you, the express courier will be with you in less than 5 minutes ⚡",
      type: "ai",
      timestamp: "10:32",
      isRead: true,
    },
  ],
  chat2: [
    {
      id: "1",
      content: "When will my order arrive?",
      type: "user",
      timestamp: "09:15",
      isRead: true,
    },
    {
      id: "2",
      content:
        "Your order #B2B-7789 is scheduled for delivery tomorrow between 9am and 12pm.",
      type: "ai",
      timestamp: "09:17",
      isRead: true,
    },
  ],
  chat3: [
    {
      id: "1",
      content: "I need help with my account",
      type: "user",
      timestamp: "14:22",
      isRead: true,
    },
    {
      id: "2",
      content:
        "Of course, I'd be happy to help. What specific issue are you experiencing with your account?",
      type: "ai",
      timestamp: "14:23",
      isRead: true,
    },
  ],
};

const ConversationView = ({
  chatId,
  onToggleContactInfo,
  className,
}: ConversationViewProps) => {
  const [message, setMessage] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);

  const messages = chatId && mockMessages[chatId] ? mockMessages[chatId] : [];

  const handleSendMessage = () => {
    if (!message.trim() || !chatId) return;

    // In a real app, you would send the message to your backend
    console.log("Sending message:", message);

    // Clear the input
    setMessage("");

    // Show typing indicator
    setIsTyping(true);

    // Simulate response after delay
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  if (!chatId) {
    return (
      <div className={cn("flex items-center justify-center h-full", className)}>
        <div className="text-center">
          <User className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">Select a conversation</h3>
          <p className="mt-2 text-sm text-gray-500">
            Choose a chat from the sidebar to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Chat header */}
      <div className="flex items-center justify-between p-3 border-b bg-white">
        <div className="flex items-center gap-3">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marc"
            alt="Marc Jacobs"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium">Marc Jacobs</h3>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-xs text-gray-500">Assigned To me</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onToggleContactInfo}>
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Conversation status */}
      <div className="bg-green-50 text-green-700 text-sm p-2 text-center">
        This conversation is assigned to me
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            content={msg.content}
            type={msg.type}
            timestamp={msg.timestamp}
            isRead={msg.isRead}
            onFeedback={() => {}}
          />
        ))}

        {/* Map location message */}
        {chatId === "chat1" && (
          <div className="flex justify-center my-4">
            <img
              src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?w=800&q=80"
              alt="Map location"
              className="rounded-lg max-w-[80%] h-auto"
            />
          </div>
        )}

        {isTyping && <TypingIndicator />}
      </div>

      {/* Input area */}
      <div className="p-3 border-t bg-white">
        <div className="flex items-end gap-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="min-h-[40px] max-h-[120px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <div className="flex gap-1">
            <Button variant="outline" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Smile className="h-4 w-4" />
            </Button>
            <Button type="button" size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationView;
