import React, { useState, useCallback } from 'react';
import { Container, Box, Stack } from '@mantine/core';
import { useTelegram } from './hooks/useTelegram';
import { mockProfile } from './data/mockData';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Header } from './components/Header';
import { ProfileCard } from './components/ProfileCard';
import { UsageStats } from './components/UsageStats';
import { ModelSelector } from './components/ModelSelector';
import { LanguageSelector } from './components/LanguageSelector';
import { PricingSection } from './components/PricingSection';
import { BottomNavigation } from './components/BottomNavigation';

const TelegramWebApp = () => {
  const { user, hapticFeedback, showAlert } = useTelegram();
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
    hapticFeedback('light');
    // Убрали уведомление - не показываем alert при смене раздела
  }, [hapticFeedback]);

  // Функция для отрисовки контента в зависимости от активной вкладки
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
        return (
          <PricingSection hapticFeedback={hapticFeedback} />
        );
      
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
    <Box
      style={{
        minHeight: '100vh',
        background: `
          radial-gradient(ellipse at top left, #1a1a2e 0%, #0a0a0f 50%), 
          radial-gradient(ellipse at bottom right, #16213e 0%, #0a0a0f 50%),
          linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)
        `,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Анимированный фон с узлами и соединениями */}
      <AnimatedBackground />
      
      {/* Дополнительные статичные декоративные элементы (более тонкие) */}
      <Box
        style={{
          position: 'fixed',
          top: '20%',
          right: '10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          zIndex: 1,
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <Box
        style={{
          position: 'fixed',
          bottom: '15%',
          left: '15%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.04) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(25px)',
          zIndex: 1,
          animation: 'float 10s ease-in-out infinite reverse',
        }}
      />
      
      <Container size="sm" style={{ position: 'relative', zIndex: 10 }}>
        <Stack gap="xl" pt="xl" px="md" pb={120}> {/* Увеличил нижний отступ для навигации */}
          <Header />
          {renderContent()}
        </Stack>
      </Container>

      {/* Нижняя навигация */}
      <BottomNavigation 
        activeTab={activeTab}
        onChange={handleTabChange}
        hapticFeedback={hapticFeedback}
      />

      {/* CSS анимации */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
          }
          25% { 
            transform: translateY(-15px) rotate(0.5deg) scale(1.02); 
          }
          50% { 
            transform: translateY(-8px) rotate(-0.3deg) scale(0.98); 
          }
          75% { 
            transform: translateY(-12px) rotate(0.3deg) scale(1.01); 
          }
        }
        
        @keyframes pulse {
          0% { 
            opacity: 0.3; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.6; 
            transform: scale(1.02); 
          }
          100% { 
            opacity: 0.3; 
            transform: scale(1); 
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        /* Дополнительные градиентные анимации */
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </Box>
  );
};

export default TelegramWebApp;