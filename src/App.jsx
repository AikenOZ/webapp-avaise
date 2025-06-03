import React, { useState, useCallback, Suspense, lazy, useEffect, useMemo } from 'react';
import { Container, Box, Stack, Loader, Center } from '@mantine/core';
import { useTelegram } from './hooks/useTelegram';
import { mockProfile } from './data/mockData';

// Убираем тяжелые компоненты из основного бандла

const BottomNavigation = lazy(() => import('./components/BottomNavigation').then(module => ({ default: module.BottomNavigation })));

// Lazy loading всех остальных компонентов по маршрутам
const ProfileCard = lazy(() => import('./components/ProfileCard').then(module => ({ default: module.ProfileCard })));
const UsageStats = lazy(() => import('./components/UsageStats').then(module => ({ default: module.UsageStats })));
const ModelSelector = lazy(() => import('./components/ModelSelector').then(module => ({ default: module.ModelSelector })));
const LanguageSelector = lazy(() => import('./components/LanguageSelector').then(module => ({ default: module.LanguageSelector })));
const PricingSection = lazy(() => import('./components/PricingSection').then(module => ({ default: module.PricingSection })));

// Минимальный CSS-only фон без canvas
const OptimizedBackground = React.memo(() => (
  <Box
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: `
        linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%),
        radial-gradient(ellipse at 20% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%), 
        radial-gradient(ellipse at 80% 80%, rgba(236, 72, 153, 0.06) 0%, transparent 50%)
      `,
      zIndex: 0,
    }}
  >
    {/* Простые декоративные блики только CSS */}
    <Box
      style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite',
      }}
    />
    <Box
      style={{
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        width: '120px',
        height: '120px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite reverse',
      }}
    />
  </Box>
));

// Оптимизированный компонент загрузки
const FastLoader = React.memo(() => (
  <Center py="md">
    <Loader size="md" variant="dots" color="violet" />
  </Center>
));

// Предзагрузка следующего компонента
const usePreloadNextComponent = (currentTab) => {
  useEffect(() => {
    const preloadMap = {
      'profile': () => import('./components/ModelSelector'),
      'settings': () => import('./components/PricingSection'),
      'upgrade': () => import('./components/ProfileCard')
    };
    
    const preloader = preloadMap[currentTab];
    if (preloader) {
      const timer = setTimeout(preloader, 500); // Предзагружаем через 500мс
      return () => clearTimeout(timer);
    }
  }, [currentTab]);
};

const TelegramWebApp = () => {
  const { user, hapticFeedback, showAlert } = useTelegram();
  const [activeTab, setActiveTab] = useState('profile');
  const [isAppReady, setIsAppReady] = useState(false);

  // Предзагружаем следующие компоненты
  usePreloadNextComponent(activeTab);

  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
    hapticFeedback?.('light');
  }, [hapticFeedback]);

  // Мемоизированный рендер контента
  const contentRenderer = useMemo(() => {
    const renderContent = () => {
      switch (activeTab) {
        case 'settings':
          return (
            <>
              <ModelSelector hapticFeedback={hapticFeedback} />
              <LanguageSelector hapticFeedback={hapticFeedback} showAlert={showAlert} />
            </>
          );
        
        case 'upgrade':
          return <PricingSection hapticFeedback={hapticFeedback} />;
        
        case 'profile':
        default:
          return (
            <>
              <ProfileCard profile={mockProfile} user={user} />
              <UsageStats />
            </>
          );
      }
    };

    return (
      <Suspense fallback={<FastLoader />}>
        {renderContent()}
      </Suspense>
    );
  }, [activeTab, hapticFeedback, showAlert, user]);

  // Быстрая инициализация
  useEffect(() => {
    // Сокращаем время до минимума
    const timer = setTimeout(() => {
      setIsAppReady(true);
      
      // Сообщаем о готовности
      if (typeof window.hideLoadingScreen === 'function') {
        window.hideLoadingScreen();
      }
    }, 300); // Минимум для плавности

    return () => clearTimeout(timer);
  }, []);

  // Показываем минимальный лоадер пока приложение не готово
  if (!isAppReady) {
    return (
      <Box style={{ minHeight: '100vh', position: 'relative' }}>
        <OptimizedBackground />
        <Container size="sm" style={{ position: 'relative', zIndex: 10 }}>
          <Stack gap="xl" pt="xl" px="md" pb={120}>
            <FastLoader />
          </Stack>
        </Container>
      </Box>
    );
  }

  return (
    <Box style={{ minHeight: '100vh', position: 'relative' }}>
      <OptimizedBackground />
      
      <Container size="sm" style={{ position: 'relative', zIndex: 10 }}>
        <Stack gap="xl" pt="xl" px="md" pb={120}>
          <Suspense fallback={<FastLoader />}>
         
          </Suspense>
          
          {contentRenderer}
        </Stack>
      </Container>

      <Suspense fallback={null}>
        <BottomNavigation 
          activeTab={activeTab}
          onChange={handleTabChange}
          hapticFeedback={hapticFeedback}
        />
      </Suspense>

      {/* Оптимизированные CSS анимации */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate3d(0px) translateZ(0); }
          50% { transform: translate3d(-8px) translateZ(0); }
        }
      `}</style>
    </Box>
  );
};

export default TelegramWebApp;