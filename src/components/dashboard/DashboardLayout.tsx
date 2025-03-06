import React from "react";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import ConversationView from "./ConversationView";
import ContactInfo from "./ContactInfo";

const DashboardLayout = () => {
  const [selectedChat, setSelectedChat] = React.useState<string | null>(
    "chat1",
  );
  const [showContactInfo, setShowContactInfo] = React.useState(true);

  return (
    <div className="flex h-[calc(100vh-56px)] w-full overflow-hidden bg-white">
      {/* Sidebar with chat list */}
      <Sidebar
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        className="w-[350px] border-r flex-shrink-0"
      />

      {/* Main conversation area */}
      <div className="flex-1 flex">
        <ConversationView
          chatId={selectedChat}
          onToggleContactInfo={() => setShowContactInfo(!showContactInfo)}
          className="flex-1"
        />

        {/* Contact info sidebar */}
        {showContactInfo && (
          <ContactInfo
            chatId={selectedChat}
            onClose={() => setShowContactInfo(false)}
            className="w-[320px] border-l flex-shrink-0"
          />
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
