// Данные профиля остаются статичными
export const mockProfile = {
  user_info: {
    username: "AikenOZ",
    created_at: "2024-11-24T10:30:00Z",
    avatar_url: null // Можно добавить URL фото
  },
  subscription: {
    isActive: true,
    type: "premium",
    expires_at: "2025-11-25T19:16:00Z",
    days_left: 365,
    time_left: "185:03:11:10",
    payment_method: "Банковская карта"
  },
  daily_limits: {
    text: { used: 127, limit: 250 },
    voice: { used: 23, limit: 50 },
    images: { used: 15, limit: 50 },
    video: { used: 5, limit: 40 },
    playlists: { used: 2, limit: 10 }
  }
};

// Функция для создания статистических данных с переводами
export const createStatsItems = (t) => [
  { 
    name: t('textRequests'), 
    used: 127, 
    limit: 250,
    color: 'blue',
    percentage: Math.round((127/250) * 100)
  },
  { 
    name: t('voiceRequests'), 
    used: 23, 
    limit: 50,
    color: 'green',
    percentage: Math.round((23/50) * 100)
  },
  { 
    name: t('imageRequests'), 
    used: 15, 
    limit: 50,
    color: 'violet',
    percentage: Math.round((15/50) * 100)
  },
  { 
    name: t('videoRequests'), 
    used: 5, 
    limit: 40,
    color: 'orange',
    percentage: Math.round((5/40) * 100)
  },
  { 
    name: t('playlistRequests'), 
    used: 2, 
    limit: 10,
    color: 'pink',
    percentage: Math.round((2/10) * 100)
  }
];

// Функция для создания кнопок действий с переводами
export const createActionButtons = (t) => [
  {
    title: t('changeAiModel'),
    description: t('selectSuitableModel'),
    gradient: { from: 'indigo', to: 'purple', deg: 135 }
  },
  {
    title: t('subscriptionManagement'),
    description: t('tarifsAndRenewals'),
    gradient: { from: 'pink', to: 'orange', deg: 135 }
  }
];