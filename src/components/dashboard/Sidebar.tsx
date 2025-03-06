import React from "react";
import { cn } from "@/lib/utils";
import {
  Search,
  Filter,
  Users,
  MessageSquare,
  RefreshCw,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SidebarProps {
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
  className?: string;
}

interface ChatItem {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: boolean;
  status: "assigned" | "waiting" | "bot";
  assignedTo?: string;
  tags?: string[];
}

const mockChats: ChatItem[] = [
  {
    id: "chat1",
    name: "Marc Jacobs",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marc",
    lastMessage: "Order number: O5658HHJJ876",
    time: "2 hours ago",
    status: "assigned",
    assignedTo: "me",
    tags: ["Urgent", "Shipping"],
  },
  {
    id: "chat2",
    name: "Robert J. Fiz",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    lastMessage: "When will my order arrive?",
    time: "2 days ago",
    status: "assigned",
    assignedTo: "Paula Villa",
    tags: ["B2B"],
  },
  {
    id: "chat3",
    name: "Hernan Machaca",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hernan",
    lastMessage: "I need help with my account",
    time: "26/09/2021",
    status: "assigned",
    assignedTo: "me",
    tags: ["VIP", "cliente"],
  },
  {
    id: "chat4",
    name: "Carl Zukrizenberg",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carl",
    lastMessage: "Thanks for your help",
    time: "24/08/2021",
    status: "assigned",
    assignedTo: "Frank",
    tags: ["Follow up"],
  },
  {
    id: "chat5",
    name: "Eduardo Leon Acuña",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eduardo",
    lastMessage: "Will attend the webinar",
    time: "25/07/2021",
    status: "assigned",
    assignedTo: "Antonelle",
    tags: ["Webinar 20/04/23"],
  },
];

const Sidebar = ({ selectedChat, onSelectChat, className }: SidebarProps) => {
  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Tabs */}
      <div className="p-3 border-b">
        <Tabs defaultValue="all">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              All (Commercial)
            </TabsTrigger>
            <TabsTrigger value="my" className="flex-1">
              My Chats
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-2 mt-3">
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="p-3 border-b">
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Users className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {mockChats.map((chat) => (
          <div
            key={chat.id}
            className={cn(
              "p-3 border-b cursor-pointer hover:bg-gray-50",
              selectedChat === chat.id && "bg-gray-100",
            )}
            onClick={() => onSelectChat(chat.id)}
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-10 h-10 rounded-full"
                />
                {chat.status === "assigned" && (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    <MessageSquare className="h-3 w-3" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-sm truncate">{chat.name}</h3>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {chat.status === "assigned" && (
                    <div className="flex items-center gap-1 mb-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span>Assigned To {chat.assignedTo}</span>
                    </div>
                  )}
                  <p className="truncate">{chat.lastMessage}</p>
                </div>
                {chat.tags && chat.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {chat.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={cn(
                          "text-xs px-2 py-0.5 rounded",
                          tag === "Urgent" && "bg-red-100 text-red-800",
                          tag === "Shipping" && "bg-blue-100 text-blue-800",
                          tag === "B2B" && "bg-yellow-100 text-yellow-800",
                          tag === "VIP" && "bg-purple-100 text-purple-800",
                          tag === "cliente" && "bg-orange-100 text-orange-800",
                          tag === "Follow up" &&
                            "bg-indigo-100 text-indigo-800",
                          tag.includes("Webinar") &&
                            "bg-green-100 text-green-800",
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
