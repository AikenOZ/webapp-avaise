import React, { memo, useState } from 'react';
import { Box, Group, Text, UnstyledButton } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconSettings, IconUser, IconCrown } from '@tabler/icons-react';

export const BottomNavigation = memo(({ activeTab, onChange, hapticFeedback }) => {
  const [pressedButton, setPressedButton] = useState(null);

  const navigationItems = [
    {
      id: 'settings',
      label: 'Настройки',
      icon: IconSettings,
      activeColor: '#6366f1',
      glowColor: 'rgba(99, 102, 241, 0.4)'
    },
    {
      id: 'profile',
      label: 'Профиль',
      icon: IconUser,
      activeColor: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.4)'
    },
    {
      id: 'upgrade',
      label: 'Тарифы',
      icon: IconCrown,
      activeColor: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.4)'
    }
  ];

  const handleTabPress = (tabId) => {
    setPressedButton(tabId);
    hapticFeedback('medium');
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
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
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
              background: 'rgba(10, 10, 15, 0.4)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(139, 92, 246, 0.15)',
              borderRadius: '20px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2), 0 0 15px rgba(139, 92, 246, 0.1)',
            }}
          />
          
          {/* Анимированный блик */}
          <motion.div
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 0.2, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), transparent)',
              pointerEvents: 'none',
              zIndex: 1,
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
                  <motion.div
                    key={item.id}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <UnstyledButton
                      onClick={() => handleTabPress(item.id)}
                      style={{
                        position: 'relative',
                        padding: '12px 16px',
                        borderRadius: '16px',
                        background: isActive 
                          ? `${item.activeColor}CC` // CC = 80% непрозрачность
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
                    >
                      {/* Индикатор активности */}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
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
                          }}
                        />
                      )}
                      
                      {/* Иконка */}
                      <motion.div
                        animate={isActive ? {
                          rotate: [0, -5, 5, 0],
                          scale: [1, 1.05, 1]
                        } : {}}
                        transition={{
                          duration: 1.5,
                          repeat: isActive ? Infinity : 0,
                          repeatDelay: 4
                        }}
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
                        }}
                      >
                        <IconComponent 
                          size={18}
                          color={isActive ? '#ffffff' : '#8b5cf6'} 
                          stroke={1.5}
                        />
                      </motion.div>
                      
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
                        <motion.div
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0, 0.3]
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
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
                          }}
                        />
                      )}
                    </UnstyledButton>
                  </motion.div>
                );
              })}
            </Group>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
});