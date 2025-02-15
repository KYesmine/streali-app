import { motion } from 'framer-motion';
import { ChatMessage } from '~/components/chat/chat-message/chat-message';
import { generateTwitchMessage } from '~/utils/chat/generate-chat-message';
import type { ChatTheme, TwitchMessage } from '~/types/schemas/chat';

export interface ChatDemoProps {
  settings: Omit<ChatTheme, 'user_id' | 'id'> | ChatTheme;
}

export const ChatDemo = (props: ChatDemoProps) => {
  const { settings } = props;
  const [messages, setMessages] = useState<TwitchMessage[]>([]);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setMessages((d) => {
          if (d.length >= 50) d.shift();
          const newMessage = generateTwitchMessage();
          return [...d, newMessage];
        }),
      1250
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {messages.map((message: TwitchMessage) => (
        <motion.div
          key={message.id}
          className="w-full"
          layout={settings.global.animation !== 'none'}
        >
          <ChatMessage settings={settings} message={message} />
        </motion.div>
      ))}
    </>
  );
};
