import React, { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, createTheme, Loader } from '@mantine/core'

// Только критические стили
import '@mantine/core/styles.css'

// Ленивая загрузка основного приложения
const App = React.lazy(() => import('./App.jsx'))

// Критический компонент - загружаем сразу
import { LanguageProvider } from './components/LanguageContext'

// Минимальная тема для быстрой загрузки
const fastTheme = createTheme({
  colorScheme: 'dark',
  primaryColor: 'violet',
  defaultRadius: 'md',
  
  // Только необходимые цвета
  colors: {
    dark: [
      '#C1C2C5', '#A6A7AB', '#909296', '#5c5f66', '#373A40',
      '#2C2E33', '#25262b', '#1A1B1E', '#141517', '#0a0a0f',
    ],
  },

  // Отключаем все что может замедлить
  respectReducedMotion: false,
  cursorType: 'default',
  
  // Минимальные компоненты
  components: {
    Button: {
      defaultProps: {
        autoFocus: false,
      },
    },
    Modal: {
      defaultProps: {
        transitionProps: { duration: 100 },
        overlayProps: { opacity: 0.3 },
      },
    },
    Container: {
      defaultProps: {
        fluid: false,
      },
    },
  },
});

// Простейший лоадер
const InitialLoader = () => (
  <div style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
  }}>
    <Loader size="lg" variant="dots" color="violet" />
  </div>
);

// Критическая предзагрузка
const preloadCritical = () => {
  // Предзагружаем следующий чанк
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      
      import('./components/BottomNavigation');
    });
  } else {
    setTimeout(() => {
      
      import('./components/BottomNavigation');
    }, 100);
  }
};

// Инициализация с максимальной скоростью
const initApp = () => {
  const root = createRoot(document.getElementById('root'));
  
  // Начинаем предзагрузку
  preloadCritical();
  
  root.render(
    <StrictMode>
      <MantineProvider 
        theme={fastTheme} 
        defaultColorScheme="dark"
        withGlobalStyles={false}
        withNormalizeCSS={false}
      >
        <LanguageProvider>
          <Suspense fallback={<InitialLoader />}>
            <App />
          </Suspense>
        </LanguageProvider>
      </MantineProvider>
    </StrictMode>
  );
};

// Запускаем немедленно
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Service Worker для агрессивного кеширования
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  navigator.serviceWorker.register('/sw.js', {
    scope: '/',
    updateViaCache: 'all'
  }).catch(() => {
    // Игнорируем ошибки SW
  });
}