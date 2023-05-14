import Image from "next/image";
import * as Emoji from "../EmojiPicker/EmojiPicker";
import SmileLey from "../../../public/smiley.svg";
import { useState } from "react";
import { ReplyIcon, MoreHorizontal } from "lucide-react";

const ActionReactMessage = () => {
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [icon, setIcon] = useState<string>("");

  return (
    <div className="flex gap-2">
      <div className="cursor-pointer">
        <ReplyIcon />
      </div>
      <div className="cursor-pointer">
        <Emoji.Popover open={emojiOpen} onOpenChange={setEmojiOpen}>
          <Emoji.PopoverTrigger asChild>
            <Image src={SmileLey} width={20} height={20} alt="" />
          </Emoji.PopoverTrigger>
          <Emoji.PopoverContent
            className="flex items-center space-x-2"
            onEmojiSelect={(emoji) => {
              // editor?.chain().insertContent(emoji.native).focus().run();
              // console.log("check emoji: ", emoji.native);
              setIcon(emoji.native);
              setEmojiOpen(false);
            }}
          />
        </Emoji.Popover>
      </div>
      <div className="cursor-pointer">
        <MoreHorizontal />
      </div>
    </div>
  );
};
export default ActionReactMessage;
