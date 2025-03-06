import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserRound } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HumanHandoffButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
  label?: string;
}

const HumanHandoffButton = ({
  onClick = () => {},
  isLoading = false,
  isDisabled = false,
  className = "",
  label = "Connect with a human agent",
}: HumanHandoffButtonProps) => {
  return (
    <div className={cn("flex justify-center w-full py-2 bg-white", className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-dashed"
              onClick={onClick}
              disabled={isDisabled || isLoading}
            >
              <UserRound className="h-4 w-4" />
              {isLoading ? "Connecting..." : label}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Request assistance from a human support agent</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default HumanHandoffButton;
