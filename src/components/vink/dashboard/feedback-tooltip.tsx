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
        'z-50 w-72 rounded-lg border border-[#00F5FF] bg-gray-900/90 p-4 text-[#A8F6FF] shadow-md outline-none animate-in fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'backdrop-blur-sm text-[15px] font-medium',
        className
      )}
      style={{
        boxShadow: '0 0 15px #00F5FF',
      }}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
CustomPopoverContent.displayName = 'CustomPopoverContent';

type FeedbackTooltipProps = {
  children: React.ReactNode;
  message: string | string[];
};

export function FeedbackTooltip({ children, message }: FeedbackTooltipProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [displayMessage, setDisplayMessage] = React.useState('');

  const pickMessage = React.useCallback(() => {
    if (Array.isArray(message)) {
      const randomIndex = Math.floor(Math.random() * message.length);
      setDisplayMessage(message[randomIndex]);
    } else {
      setDisplayMessage(message);
    }
  }, [message]);


  React.useEffect(() => {
    if (isOpen) {
      pickMessage();
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, pickMessage]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <CustomPopoverContent>{displayMessage}</CustomPopoverContent>
    </Popover>
  );
}
