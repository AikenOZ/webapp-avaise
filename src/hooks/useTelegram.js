import { useState, useEffect, useCallback, createElement } from 'react';
import { notifications } from '@mantine/notifications';
import { IconSparkles } from '@tabler/icons-react';

export const useTelegram = () => {
  const [user, setUser] = useState(null);
  const [webApp, setWebApp] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      setWebApp(tg);
      setUser(tg.initDataUnsafe?.user || {
        id: 123456789,
        first_name: "Пользователь",
        username: "user"
      });
      
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#0a0a0f');
      tg.setBackgroundColor('#0a0a0f');
    } else {
      setUser({
        id: 123456789,
        first_name: "Иван", 
        last_name: "Петров",
        username: "ivanpetrov"
      });
    }
  }, []);

  const hapticFeedback = useCallback((type = 'light') => {
    if (webApp?.HapticFeedback) {
      webApp.HapticFeedback.impactOccurred(type);
    }
  }, [webApp]);

  const showAlert = useCallback((message) => {
    notifications.show({
      title: '✨ Уведомление',
      message: message,
      color: 'violet',
      icon: createElement(IconSparkles, { size: 18 }),
      autoClose: 5000,
      styles: {
        root: {
          background: 'rgba(39, 39, 42, 0.95)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.25)',
        }
      }
    });
  }, []);

  return { user, webApp, hapticFeedback, showAlert };
};