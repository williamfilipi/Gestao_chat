import React from "react";
import { cn } from "@/lib/utils";
import { X, Clock, Tag, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactInfoProps {
  chatId: string | null;
  onClose: () => void;
  className?: string;
}

const ContactInfo = ({ chatId, onClose, className }: ContactInfoProps) => {
  if (!chatId) return null;

  return (
    <div className={cn("flex flex-col h-full bg-white", className)}>
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Contact Information</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Contact details */}
      <div className="p-4 overflow-y-auto flex-1">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marc"
            alt="Marc Jacobs"
            className="w-20 h-20 rounded-full mb-2"
          />
          <h3 className="text-lg font-medium">Marc Jacobs</h3>
          <p className="text-sm text-gray-500">+33 7 73 27 52 97</p>
          <Button
            variant="outline"
            className="mt-4 w-full flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            <span>Block Contact</span>
          </Button>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Tags</h4>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
              <span>Urgent</span>
              <X className="h-3 w-3 cursor-pointer" />
            </div>
            <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              <span>Shipping</span>
              <X className="h-3 w-3 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Active since */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Active Since</h4>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>2 hours ago</span>
          </div>
        </div>

        {/* Contact note */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Contact Note</h4>
          <textarea
            className="w-full p-2 border rounded-md text-sm h-24 resize-none"
            placeholder="You can use this field to add information about this contact"
          ></textarea>
        </div>

        {/* Custom actions */}
        <div>
          <h4 className="text-sm font-medium mb-2">Custom Actions</h4>
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 mb-2 bg-teal-500 text-white hover:bg-teal-600"
          >
            <Download className="h-4 w-4" />
            <span>Send Chat Transcript</span>
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 bg-teal-500 text-white hover:bg-teal-600"
          >
            <Download className="h-4 w-4" />
            <span>Download Transcript</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
