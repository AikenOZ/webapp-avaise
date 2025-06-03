import React, { createContext, useContext, useState } from 'react';

// Переводы
const translations = {
  ru: {
    // Заголовок
    platformName: 'OZ Avaise • Премиум AI Платформа',
    outOf: 'из',
    
    // Навигация
    profile: 'Профиль',
    settings: 'Настройки',
    upgrade: 'Тарифы',
    
    // Профиль
    subscriptionDetails: 'Детали подписки',
    subscriptionLimits: 'Лимиты обработки в день',
    registrationDate: 'Дата регистрации',
    mostActiveType: 'Самый активный тип',
    averageLoad: 'Средняя загрузка',
    totalUsedToday: 'Всего использовано сегодня',
    requests: 'запросов',
    timeLeft: 'Осталось времени',
    payment: 'Оплата',
    cardPayment: '💳 Карта',
    subscriptionActiveUntil: 'Подписка активна до:',
    
    // Статистика
    textRequests: 'Текстовые',
    voiceRequests: 'Голосовые', 
    imageRequests: 'Изображения',
    videoRequests: 'Видео',
    playlistRequests: 'Плейлисты',
    
    // Настройки
    chooseModel: 'Выбор AI модели',
    interfaceLanguage: 'Язык интерфейса',
    additional: 'Дополнительно',
    
    // Модели
    maxAccuracy: 'Модель способная размышлять',
    creativityUnderstanding: 'Повседневная модель',
    selectedModel: 'Выбранная модель',
    
    // Дополнительные настройки
    darkTheme: 'Темная тема',
    darkThemeDesc: 'Интерфейс в темных тонах',
    notifications: 'Уведомления',
    notificationsDesc: 'Push-уведомления о статусе',
    hapticFeedback: 'Вибрация',
    hapticFeedbackDesc: 'Тактильный отклик',
    aiCreativity: 'Креативность AI',
    aiCreativityDesc: 'Уровень творческого мышления',
    logical: 'Логичный',
    creative: 'Креативный',
    
    // Расширенные настройки модели
    advancedSettings: 'Дополнительно',
    customPromptTitle: 'Кастомный промпт для модели',
    customPromptDescription: 'Введите дополнительные инструкции для AI модели. Этот промпт будет использоваться при каждом запросе.',
    customPromptPlaceholder: 'Например: Отвечай всегда кратко и по делу. Используй простые слова. Добавляй эмодзи в ответы...',
    confirm: 'Подтвердить',
    promptSaved: 'Промпт активирован',
    
    // Тарифы
    ozPremium: '👑 OZ Premium',
    premiumPlatform: 'Премиум AI Платформа',
    subscriptionIncludes: 'Что входит в подписку',
    subscriptionFeatures: {
      included: 'Входит в подписку',
      images: '• Распознает Изображения',
      voice: '• Голосовые сообщения',
      video: '• Видеосообщения',
      requests: '• 350 запросов в день',
      playlists: '• 50 музыкальных подборок в день',
      context: '• Единый мультимодальный контекст',
      modelChoice: '• Выбор модели ИИ'
    },
    chooseDays: 'Выберите желаемое количество дней',
    day: 'день',
    days: 'дней',
    choosePayment: 'Выберите способ оплаты ниже',
    telegramStars: 'Telegram Stars',
    bankSbp: 'Банк \\ СБП',
    purchase: 'Приобрести',
    autoActivation: '💡 После оплаты подписка активируется автоматически',
    
    // Модальные окна
    receiptMethod: 'Способ получения чека',
    enterEmail: '📧 Введите email для получения чека',
    dataProtected: 'Ваши данные защищены и не передаются третьим лицам',
    emailExample: '💡 Пример: name@domain.com',
    cancel: 'Отмена',
    continue: 'Продолжить',
    purchaseConfirmation: 'Подтверждение покупки',
    email: 'Email:',
    tariff: 'Тариф:',
    agreement: '✅ Оформляя тариф, я даю согласие на обработку персональных данных и соглашаюсь с условиями',
    publicOffer: 'публичной оферты',
    pay: 'Оплатить',
    
    // Валидация
    emailRequired: 'Введите email адрес',
    emailMustContainAt: 'Email должен содержать символ @',
    emailIncorrectFormat: 'Некорректный формат email',
    emailMustContainDomain: 'Email должен содержать домен с точкой',
    
    // Статусы подписки
    premium: 'Premium',
    flash: 'Flash',
    unlimited: 'Безлимитные запросы',
    weeklyLimit: '10 запросов в неделю',
    
    // Языки
    russian: 'Русский',
    english: 'English'
  },
  
  en: {
    // Header
    platformName: 'OZ Avaise • Premium AI Platform',
    outOf: 'of',
    
    // Navigation
    profile: 'Profile',
    settings: 'Settings', 
    upgrade: 'Pricing',
    
    // Profile
    subscriptionDetails: 'Subscription Details',
    subscriptionLimits: 'Daily Processing Limits',
    registrationDate: 'Registration Date',
    mostActiveType: 'Most Active Type',
    averageLoad: 'Average Load',
    totalUsedToday: 'Total Used Today',
    requests: 'requests',
    timeLeft: 'Time Left',
    payment: 'Payment',
    cardPayment: '💳 Card',
    subscriptionActiveUntil: 'Subscription active until:',
    
    // Statistics
    textRequests: 'Text',
    voiceRequests: 'Voice',
    imageRequests: 'Images', 
    videoRequests: 'Video',
    playlistRequests: 'Playlists',
    
    // Settings
    chooseModel: 'Choose AI Model',
    interfaceLanguage: 'Interface Language',
    additional: 'Additional',
    
    // Models
    maxAccuracy: 'Thinking and logic model',
    creativityUnderstanding: 'Creativity and understanding',
    selectedModel: 'Selected model',
    
    // Additional settings
    darkTheme: 'Dark Theme',
    darkThemeDesc: 'Dark interface theme',
    notifications: 'Notifications',
    notificationsDesc: 'Push notifications about status',
    hapticFeedback: 'Haptic Feedback',
    hapticFeedbackDesc: 'Tactile response',
    aiCreativity: 'AI Creativity',
    aiCreativityDesc: 'Level of creative thinking',
    logical: 'Logical',
    creative: 'Creative',
    
    // Advanced model settings
    advancedSettings: 'Advanced Settings',
    customPromptTitle: 'Custom Model Prompt',
    customPromptDescription: 'Enter additional instructions for the AI model. This prompt will be used with every request.',
    customPromptPlaceholder: 'For example: Always answer briefly and to the point. Use simple words. Add emojis to responses...',
    confirm: 'Confirm',
    promptSaved: 'Prompt saved and active',
    
    // Pricing
    ozPremium: '👑 OZ Premium',
    premiumPlatform: 'Premium AI Platform',
    subscriptionIncludes: 'What\'s included in subscription',
    subscriptionFeatures: {
      included: 'Included in subscription',
      images: '• Recognizes Images',
      voice: '• Voice Messages',
      video: '• Video Messages', 
      requests: '• 350 requests per day',
      playlists: '• 50 music playlists per day',
      context: '• Unified multimodal context',
      modelChoice: '• AI Model Selection'
    },
    chooseDays: 'Choose desired number of days',
    day: 'day',
    days: 'days',
    choosePayment: 'Choose payment method below 👇',
    telegramStars: 'Telegram Stars',
    bankSbp: 'Bank \\ SBP',
    purchase: 'Purchase',
    autoActivation: '💡 Subscription activates automatically after payment',
    
    // Modals
    receiptMethod: 'Receipt Delivery Method',
    enterEmail: '📧 Enter email to receive receipt',
    dataProtected: 'Your data is protected and not shared with third parties',
    emailExample: '💡 Example: name@domain.com',
    cancel: 'Cancel',
    continue: 'Continue',
    purchaseConfirmation: 'Purchase Confirmation',
    email: 'Email:',
    tariff: 'Tariff:',
    agreement: '✅ By placing an order, I consent to personal data processing and agree to the terms specified in',
    publicOffer: 'public offer',
    pay: 'Pay',
    
    // Validation
    emailRequired: 'Enter email address',
    emailMustContainAt: 'Email must contain @ symbol',
    emailIncorrectFormat: 'Incorrect email format',
    emailMustContainDomain: 'Email must contain domain with dot',
    
    // Subscription statuses
    premium: 'Premium',
    flash: 'Flash',
    unlimited: 'Unlimited requests',
    weeklyLimit: '10 requests per week',
    
    // Languages
    russian: 'Русский',
    english: 'English'
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('ru');

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      changeLanguage, 
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};