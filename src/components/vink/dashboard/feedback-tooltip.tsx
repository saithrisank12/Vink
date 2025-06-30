'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const CustomPopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 8, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-64 rounded-lg border border-primary bg-gray-900/90 p-3 text-cyan-200 shadow-md outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        'backdrop-blur-sm text-sm font-medium',
        className
      )}
      style={{
        boxShadow: '0 0 15px hsl(var(--primary) / 0.5)',
      }}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
CustomPopoverContent.displayName = 'CustomPopoverContent';

type FeedbackTooltipProps = {
  children: React.ReactNode;
  message: string;
};

export function FeedbackTooltip({ children, message }: FeedbackTooltipProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <CustomPopoverContent>
        {message}
      </CustomPopoverContent>
    </Popover>
  );
}
