import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Paperclip, Send } from "lucide-react";

interface ChatInputAreaProps {
  onSendMessage?: (message: string) => void;
  onAttachFile?: (file: File) => void;
  isDisabled?: boolean;
  placeholder?: string;
}

const ChatInputArea = ({
  onSendMessage = () => {},
  onAttachFile = () => {},
  isDisabled = false,
  placeholder = "Type your message here...",
}: ChatInputAreaProps) => {
  const [message, setMessage] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (message.trim() && !isDisabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onAttachFile(files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col w-full p-3 border-t bg-white">
      <div className="flex items-end gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isDisabled}
          className={cn(
            "min-h-[40px] max-h-[120px] resize-none",
            isDisabled && "opacity-50 cursor-not-allowed",
          )}
        />
        <div className="flex gap-1">
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={triggerFileInput}
            disabled={isDisabled}
            className="flex-shrink-0"
            aria-label="Attach file"
          >
            <Paperclip className="h-4 w-4" />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              disabled={isDisabled}
            />
          </Button>
          <Button
            type="button"
            size="icon"
            onClick={handleSendMessage}
            disabled={isDisabled || !message.trim()}
            className="flex-shrink-0"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInputArea;
