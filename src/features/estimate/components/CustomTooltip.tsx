import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export const CustomTooltip = ({ message }: { message: string }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="w-4 h-4 text-gray-400 inline-block ml-1 cursor-pointer hover:text-gray-600" />
      </TooltipTrigger>
      <TooltipContent className="p-2 text-sm w-70"> { /* bg-[#002169] */}
        <p>{message}</p>
      </TooltipContent>
    </Tooltip>
  );
};