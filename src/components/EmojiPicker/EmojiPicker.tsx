import EmojiPicker from "@emoji-mart/react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { forwardRef } from "react";
import { type EmojiData } from "./types";
import classcat from "classcat";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

type EmojiPickerProps = {
  onEmojiSelect?: (emoji: EmojiData) => void;
};
type Props = PopoverPrimitive.PopoverContentProps & EmojiPickerProps;

export const PopoverContent = forwardRef<HTMLDivElement, Props>(
  ({ onEmojiSelect, ...props }, forwardedRef) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        {...props}
        className={classcat([props.className, "z-10"])}
        ref={forwardedRef}
      >
        <EmojiPicker
          autoFocus
          dynamicWidth
          theme="light"
          previewPosition="none"
          skinTonePosition="none"
          emojiButtonRadius="6px"
          onEmojiSelect={onEmojiSelect}
        />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
);

PopoverContent.displayName = "PopoverContent";
