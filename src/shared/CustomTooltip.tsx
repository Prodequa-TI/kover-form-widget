import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';

interface CustomTooltipProps {
  message: string;
  className?: string;
  iconClassName?: string;
  contentClassName?: string;
  maxWidth?: string;
  onClick?: () => void;
}

export const CustomTooltip = ({
  message,
  iconClassName,
  contentClassName,
  onClick,
}: CustomTooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Info
          onClick={onClick}
          className={cn(
            'size-4 text-gray-400 ml-1 cursor-pointer hover:text-gray-600 transition-colors',
            iconClassName
          )}
        />
      </TooltipTrigger>
      <TooltipContent
        className={cn(
          'p-2 text-xs',
          contentClassName
        )}
      >
        <p className="mx-auto max-w-[200px] whitespace-normal">{message}</p>
      </TooltipContent>
    </Tooltip>
  );
};
