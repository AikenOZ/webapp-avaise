import { useState, useEffect, useCallback } from 'react';

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
      // Мок данные для разработки
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

  // Простая замена для showAlert без внешних зависимостей
  const showAlert = useCallback((message) => {
    if (webApp?.showAlert) {
      webApp.showAlert(message);
    } else {
      // Fallback для браузера - простое уведомление
      console.log('Alert:', message);
      
      // Можно добавить простое браузерное уведомление
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('OZ Avaise', {
          body: message,
          icon: '/icon.svg'
        });
      } else {
        // Или просто alert для демо
        alert(message);
      }
    }
  }, [webApp]);

  return { user, webApp, hapticFeedback, showAlert };
};