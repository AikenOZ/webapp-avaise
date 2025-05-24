import React, { memo, useState } from 'react';
import { Stack, Group, Title, Text, Box } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconLanguage } from '@tabler/icons-react';
import { Card3D } from './ui/Card3D';

export const LanguageSelector = memo(({ hapticFeedback, showAlert }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('ru');

  const languages = [
    {
      id: 'ru',
      name: 'Русский',
      flag: '🇷🇺',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      glowColor: 'rgba(102, 126, 234, 0.4)'
    },
    {
      id: 'en',
      name: 'English',
      flag: '🇺🇸',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      glowColor: 'rgba(245, 87, 108, 0.4)'
    }
  ];

  const handleLanguageSelect = (langId) => {
    setSelectedLanguage(langId);
    hapticFeedback('light');
    const langName = languages.find(l => l.id === langId)?.name;
    showAlert(`Язык изменен на ${langName}`);
  };

  return (
    <Card3D delay={3}>
      <Stack gap="lg">
        <Group gap="xs" align="center">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <Box
              style={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <IconLanguage size={20} color="white" />
            </Box>
          </motion.div>
          <Title order={3} size="h4" c="white" fw={600}>
            Язык интерфейса
          </Title>
        </Group>

        <Group gap="md" grow>
          {languages.map((language, index) => {
            const isSelected = selectedLanguage === language.id;
            
            return (
              <motion.div
                key={language.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Box
                  onClick={() => handleLanguageSelect(language.id)}
                  style={{
                    position: 'relative',
                    padding: '16px',
                    borderRadius: '16px',
                    background: isSelected 
                      ? language.gradient
                      : 'rgba(39, 39, 42, 0.8)',
                    border: isSelected 
                      ? '2px solid rgba(255, 255, 255, 0.3)'
                      : '2px solid rgba(113, 113, 122, 0.2)',
                    boxShadow: isSelected 
                      ? `0 15px 35px ${language.glowColor}`
                      : '0 8px 20px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                  }}
                >
                  {/* Эффект свечения для выбранного языка */}
                  {isSelected && (
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '120%',
                        height: '120%',
                        borderRadius: '16px',
                        background: language.gradient,
                        filter: 'blur(20px)',
                        pointerEvents: 'none',
                        zIndex: 0,
                      }}
                    />
                  )}
                  
                  <Group justify="center" align="center" gap="md" style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div
                      animate={isSelected ? { 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ 
                        duration: 1.5, 
                        repeat: isSelected ? Infinity : 0,
                        repeatDelay: 3
                      }}
                    >
                      <Text size="xl" style={{ fontSize: '28px' }}>
                        {language.flag}
                      </Text>
                    </motion.div>
                    
                    <Stack align="center" gap={2}>
                      <Text 
                        size="md" 
                        fw={700} 
                        c={isSelected ? 'white' : 'gray.3'}
                        style={{
                          textShadow: isSelected ? '0 2px 4px rgba(0, 0, 0, 0.5)' : 'none'
                        }}
                      >
                        {language.name}
                      </Text>
                    </Stack>
                  </Group>
                  
                  {/* Индикатор активности */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: '#10b981',
                        boxShadow: '0 0 10px rgba(16, 185, 129, 0.8), 0 4px 12px rgba(0, 0, 0, 0.3)',
                      }}
                    />
                  )}
                </Box>
              </motion.div>
            );
          })}
        </Group>
      </Stack>
    </Card3D>
  );
});