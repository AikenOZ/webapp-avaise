import React, { memo, useState } from 'react';
import { Box, Group, Text, UnstyledButton } from '@mantine/core';
import { IconSettings, IconUser, IconCrown } from '@tabler/icons-react';
import { useLanguage } from './LanguageContext';

export const BottomNavigation = memo(({ activeTab, onChange, hapticFeedback }) => {
  const [pressedButton, setPressedButton] = useState(null);
  const { t } = useLanguage();

  const navigationItems = [
    {
      id: 'settings',
      label: t('settings'),
      icon: IconSettings,
      activeColor: '#6366f1',
      glowColor: 'rgba(99, 102, 241, 0.4)'
    },
    {
      id: 'profile',
      label: t('profile'),
      icon: IconUser,
      activeColor: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.4)'
    },
    {
      id: 'upgrade',
      label: t('upgrade'),
      icon: IconCrown,
      activeColor: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.4)'
    }
  ];

  const handleTabPress = (tabId) => {
    setPressedButton(tabId);
    hapticFeedback?.('medium');
    onChange(tabId);
    
    setTimeout(() => setPressedButton(null), 150);
  };

  return (
    <Box
      style={{
        position: 'fixed',
        bottom: 15,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        width: '85%',
        maxWidth: '350px',
      }}
    >
      <div 
        style={{
          opacity: 0,
          transform: 'translate3d(100px)',
          animation: 'slideUpNav 0.4s ease-out 0.1s forwards'
        }}
      >
        {/* Контейнер с размытым фоном */}
        <Box
          style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          {/* Размытый фон */}
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(10, 10, 15, 0.85)',
              border: '1px solid rgba(139, 92, 246, 0.15)',
              borderRadius: '20px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2), 0 0 15px rgba(139, 92, 246, 0.1)',
            }}
          />
          
          {/* Анимированный блик */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), transparent)',
              pointerEvents: 'none',
              zIndex: 1,
              animation: 'shimmer 7s ease-in-out infinite'
            }}
          />
          
          {/* Контент - кнопки */}
          <Box style={{ position: 'relative', zIndex: 2, padding: '12px 16px' }}>
            <Group justify="space-around" gap="sm">
              {navigationItems.map((item, index) => {
                const isActive = activeTab === item.id;
                const isPressed = pressedButton === item.id;
                const IconComponent = item.icon;
                
                return (
                  <div
                    key={item.id}
                    style={{
                      opacity: 0,
                      transform: 'translate3d(15px)',
                      animation: `fadeInUp 0.2s ease-out ${0.1 + index * 0.05}s forwards`,
                    }}
                    className="nav-button-wrapper"
                  >
                    <UnstyledButton
                      onClick={() => handleTabPress(item.id)}
                      style={{
                        position: 'relative',
                        padding: '12px 16px',
                        borderRadius: '16px',
                        background: isActive 
                          ? `${item.activeColor}CC`
                          : isPressed 
                            ? 'rgba(139, 92, 246, 0.3)'
                            : 'transparent',
                        border: isActive 
                          ? '1px solid rgba(255, 255, 255, 0.2)'
                          : '1px solid transparent',
                        boxShadow: isActive 
                          ? `0 8px 20px ${item.glowColor}`
                          : isPressed
                            ? '0 4px 15px rgba(139, 92, 246, 0.2)'
                            : 'none',
                        transition: 'all 0.25s ease',
                        cursor: 'pointer',
                        minWidth: '60px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                      className="nav-button"
                    >
                      {/* Индикатор активности */}
                      {isActive && (
                        <div
                          style={{
                            position: 'absolute',
                            top: -1,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '3px',
                            height: '3px',
                            borderRadius: '50%',
                            background: '#fff',
                            boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
                            animation: 'scaleIn 0.3s ease-out'
                          }}
                        />
                      )}
                      
                      {/* Иконка */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '32px',
                          height: '32px',
                          borderRadius: '10px',
                          background: isActive 
                            ? 'rgba(255, 255, 255, 0.15)' 
                            : 'rgba(139, 92, 246, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          animation: isActive ? 'wiggle 1.5s ease-in-out infinite 4s' : 'none'
                        }}
                      >
                        <IconComponent 
                          size={18}
                          color={isActive ? '#ffffff' : '#8b5cf6'} 
                          stroke={1.5}
                        />
                      </div>
                      
                      {/* Текст */}
                      <Text 
                        size="xs" 
                        fw={600}
                        c={isActive ? 'white' : 'gray.5'}
                        style={{
                          textShadow: isActive ? '0 1px 2px rgba(0, 0, 0, 0.5)' : 'none',
                          transition: 'color 0.25s ease',
                          fontSize: '11px',
                        }}
                      >
                        {item.label}
                      </Text>
                      
                      {/* Пульсирующий эффект */}
                      {isActive && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '90%',
                            height: '90%',
                            borderRadius: '16px',
                            background: `${item.activeColor}40`,
                            pointerEvents: 'none',
                            zIndex: -1,
                            animation: 'pulse 2.5s ease-in-out infinite'
                          }}
                        />
                      )}
                    </UnstyledButton>
                  </div>
                );
              })}
            </Group>
          </Box>
        </Box>
      </div>

      {/* CSS анимации */}
      <style jsx>{`
        @keyframes slideUpNav {
          from {
            opacity: 0;
            transform: translate3d(100px);
          }
          to {
            opacity: 1;
            transform: translate3d(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(15px);
          }
          to {
            opacity: 1;
            transform: translate3d(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          20% {
            opacity: 0.2;
          }
          40% {
            opacity: 0;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: translateX(-50%) scale(0);
          }
          to {
            transform: translateX(-50%) scale(1);
          }
        }
        
        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(-5deg) scale(1.05);
          }
          75% {
            transform: rotate(5deg) scale(1.05);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0;
          }
        }
        
        .nav-button-wrapper:hover .nav-button {
          transform: scale(1.01);
        }
        
        .nav-button:active {
          transform: scale(0.99);
        }
      `}</style>
    </Box>
  );
});