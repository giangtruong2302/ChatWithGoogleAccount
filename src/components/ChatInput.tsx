"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import SmileLey from "../../public/smiley.svg";
import axios from "axios";
import { FC, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import Button from "./ui/Button";
import * as Emoji from "./EmojiPicker/EmojiPicker";
import Image from "next/image";

interface ChatInputProps {
  chatPartner: User;
  chatId: string;
}

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const sendMessage = async () => {
    if (!input) return;
    setIsLoading(true);

    try {
      await axios.post("/api/message/send", { text: input, chatId });
      setInput("");
      textareaRef.current?.focus();
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  const [emojiOpen, setEmojiOpen] = useState(false);
  // const editor = useEditor({
  //   autofocus: true,
  //   editable: true,
  //   editorProps: {
  //     attributes: {
  //       class: "focus:outline-none max-h-[150px] overflow-y-auto",
  //     },
  //   },
  //   extensions: [
  //     // StarterKit.configure({
  //     //   paragraph: {
  //     //     HTMLAttributes: {
  //     //       class: "text-sm",
  //     //     },
  //     //   },
  //     // }),
  //     // EnterHook,
  //   ],
  // });
  return (
    <div className="flex gap-2 border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <Emoji.Popover open={emojiOpen} onOpenChange={setEmojiOpen}>
        <Emoji.PopoverTrigger asChild>
          <Image src={SmileLey} width={20} height={20} alt="" />
        </Emoji.PopoverTrigger>
        <Emoji.PopoverContent
          className="flex items-center space-x-2"
          onEmojiSelect={(emoji) => {
            // editor?.chain().insertContent(emoji.native).focus().run();
            // console.log("check emoji: ", emoji);
            setEmojiOpen(false);
          }}
        />
      </Emoji.Popover>
      <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${chatPartner.name}`}
          className="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
        />

        <div
          onClick={() => textareaRef.current?.focus()}
          className="py-2"
          aria-hidden="true"
        >
          <div className="py-px">
            <div className="h-9" />
          </div>
        </div>

        <div className="absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
          <div className="flex-shrin-0">
            <Button isLoading={isLoading} onClick={sendMessage} type="submit">
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
