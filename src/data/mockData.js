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

export const statsItems = [
  { 
    name: 'Текстовые', 
    used: 127, 
    limit: 250,
    color: 'blue',
    percentage: Math.round((127/250) * 100)
  },
  { 
    name: 'Голосовые', 
    used: 23, 
    limit: 50,
    color: 'green',
    percentage: Math.round((23/50) * 100)
  },
  { 
    name: 'Изображения', 
    used: 15, 
    limit: 50,
    color: 'violet',
    percentage: Math.round((15/50) * 100)
  },
  { 
    name: 'Видео', 
    used: 5, 
    limit: 40,
    color: 'orange',
    percentage: Math.round((5/40) * 100)
  },
  { 
    name: 'Плейлисты', 
    used: 2, 
    limit: 10,
    color: 'pink',
    percentage: Math.round((2/10) * 100)
  }
];

export const actionButtons = [
  {
    title: 'Сменить модель ИИ',
    description: 'Выберите подходящую модель',
    gradient: { from: 'indigo', to: 'purple', deg: 135 }
  },
  {
    title: 'Управление подпиской',
    description: 'Тарифы и продления',
    gradient: { from: 'pink', to: 'orange', deg: 135 }
  }
];