"use client";
import { useUsers } from "@/lib/store/users";
import Image from "next/image";
import { useUser } from "@/lib/store/user";
import { room, useRooms } from "@/lib/store/rooms";
import { useMessage } from "@/lib/store/messages";

function Friend({ room, index }: { room: room; index: number }) {
  const { setCurrentRoom, setRoomMessages, currentRoom, setIsTyping } =
    useRooms();
  const { messages } = useMessage();
  const lastMessage = messages?.findLast(
    (message) => message.room_id === room.id
  );
  const { users } = useUsers();
  const { user } = useUser();
  const currentUser = users?.find((u) => u?.id === user?.id);
  const user2 = users?.find((u) => u?.id === room.user2_id);
  const user1 = users?.find((u) => u?.id === room.user1_id);
  let contact;
  if (currentUser === user2) contact = user1;
  else contact = user2;

  const handleFriendClick = () => {
    setCurrentRoom(room);
    setRoomMessages(messages?.filter((message) => message.room_id === room.id));
    setIsTyping(false);
    document.getElementById("close-drawer")?.click();
    document.getElementById("arrow-down")?.click();
  };

  return (
    <div
      className={`flex items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 py-3 px-2 rounded-md ${
        room.id === currentRoom?.id ? `bg-gray-200 dark:bg-gray-700` : ``
      } ${index === 0 ? `border-y` : `border-b`}`}
      onClick={() => handleFriendClick()}
    >
      <Image
        src={contact?.avatar_url!}
        alt={contact?.display_name!}
        width={40}
        height={40}
        className="rounded-full ring-2 mr-5"
      />
      <div>
        <p className="text-sm font-semibold">{contact?.display_name}</p>
        <p className="text-xs text-gray-600 dark:text-gray-300">
          {lastMessage?.text.length! >= 15
            ? lastMessage?.text.slice(0, 14) + "..."
            : lastMessage?.text}
        </p>
      </div>
    </div>
  );
}

export default Friend;
