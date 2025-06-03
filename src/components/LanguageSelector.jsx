import React, { memo, useState } from 'react';
import { Stack, Group, Title, Text, Box } from '@mantine/core';
import { IconLanguage } from '@tabler/icons-react';
import { Card3D } from './ui/Card3D';
import { useLanguage } from './LanguageContext';

export const LanguageSelector = memo(({ hapticFeedback, showAlert }) => {
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const languages = [
    {
      id: 'ru',
      name: t('russian'),
      flag: '🇷🇺',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      glowColor: 'rgba(102, 126, 234, 0.4)'
    },
    {
      id: 'en',
      name: t('english'),
      flag: '🇺🇸',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      glowColor: 'rgba(245, 87, 108, 0.4)'
    }
  ];

  const handleLanguageSelect = (langId) => {
    setSelectedLanguage(langId);
    changeLanguage(langId);
    hapticFeedback?.('light');
    
    // Показываем уведомление о смене языка
    const langName = languages.find(l => l.id === langId)?.name;
    if (showAlert) {
     
    }
  };

  return (
    <Card3D delay={3}>
      <Stack gap="lg">
        <Group gap="xs" align="center">
          <div className="icon-wrapper">
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
                transition: 'transform 0.8s ease',
              }}
            >
              <IconLanguage size={20} color="white" />
            </Box>
          </div>
          <Title order={3} size="h4" c="white" fw={600}>
            {t('interfaceLanguage')}
          </Title>
        </Group>

        <Group gap="md" grow>
          {languages.map((language, index) => {
            const isSelected = selectedLanguage === language.id;
            
            return (
              <div
                key={language.id}
                style={{
                  opacity: 0,
                  transform: 'translate3d(20px)',
                  animation: `fadeInUp 0.3s ease-out ${0.2 + index * 0.1}s forwards`
                }}
                className="language-option"
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
                  className="language-box"
                >
                  {/* Эффект свечения для выбранного языка */}
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '120%',
                        height: '120%',
                        borderRadius: '16px',
                        background: language.gradient,
                        pointerEvents: 'none',
                        zIndex: 0,
                        animation: 'pulse 2s ease-in-out infinite'
                      }}
                    />
                  )}
                  
                  <Group justify="center" align="center" gap="md" style={{ position: 'relative', zIndex: 2 }}>
                    <div
                      style={{
                        animation: isSelected ? 'wiggle 1.5s ease-in-out infinite 3s' : 'none'
                      }}
                    >
                      <Text size="xl" style={{ fontSize: '28px' }}>
                        {language.flag}
                      </Text>
                    </div>
                    
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
                    <div
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: '#10b981',
                        boxShadow: '0 0 10px rgba(16, 185, 129, 0.8), 0 4px 12px rgba(0, 0, 0, 0.3)',
                        animation: 'scaleRotateIn 0.5s ease-out'
                      }}
                    />
                  )}
                </Box>
              </div>
            );
          })}
        </Group>
      </Stack>

      {/* CSS анимации */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(20px);
          }
          to {
            opacity: 1;
            transform: translate3d(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.6;
          }
        }
        
        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(10deg) scale(1.1);
          }
          75% {
            transform: rotate(-10deg) scale(1.1);
          }
        }
        
        @keyframes scaleRotateIn {
          from {
            transform: scale(0) rotate(-180deg);
          }
          to {
            transform: scale(1) rotate(0deg);
          }
        }
        
        .icon-wrapper:hover .language-box {
          transform: scale(1.01);
        }
        
        .language-option:hover .language-box {
          transform: scale(1.01);
        }
        
        .language-option:active .language-box {
          transform: scale(0.99);
        }
        
        .icon-wrapper:hover Box {
          transform: rotate(360deg);
        }
      `}</style>
    </Card3D>
  );
});