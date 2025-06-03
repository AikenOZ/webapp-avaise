import React, { memo, useState, useEffect } from 'react';
import { Stack, Group, Title, Text, Box, Slider, Button, Textarea } from '@mantine/core';
import { IconBrain, IconSparkles, IconBolt, IconSettings, IconCheck, IconChevronDown } from '@tabler/icons-react';
import { Card3D } from './ui/Card3D';
import { useLanguage } from './LanguageContext';

export const ModelSelector = memo(({ hapticFeedback }) => {
  const { t } = useLanguage();
  const [selectedModel, setSelectedModel] = useState('gpt4');
  const [justSelectedModel, setJustSelectedModel] = useState(null); // Для анимации значка
  const [settings, setSettings] = useState({
    aiCreativity: 50
  });
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isAdvancedClosing, setIsAdvancedClosing] = useState(false); // Для анимации закрытия
  const [customPrompt, setCustomPrompt] = useState('');
  const [savedPrompt, setSavedPrompt] = useState('');

  const models = [
    {
      id: 'gpt4',
      name: 'Avaise 2.5',
      description: t('maxAccuracy'),
      icon: IconBrain,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      glowColor: 'rgba(102, 126, 234, 0.5)'
    },
    {
      id: 'claude',
      name: 'Avaise 2.0',
      description: t('creativityUnderstanding'),
      icon: IconSparkles,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      glowColor: 'rgba(240, 147, 251, 0.5)'
    }
  ];

  const handleModelSelect = (modelId) => {
    if (modelId !== selectedModel) {
      setSelectedModel(modelId);
      setJustSelectedModel(modelId);
      hapticFeedback?.('medium');
      
      // Убираем флаг анимации через время анимации
      setTimeout(() => {
        setJustSelectedModel(null);
      }, 300);
    }
  };

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    hapticFeedback?.('light');
  };

  const toggleAdvancedSettings = () => {
    if (isAdvancedOpen) {
      // Начинаем анимацию закрытия
      setIsAdvancedClosing(true);
      setTimeout(() => {
        setIsAdvancedOpen(false);
        setIsAdvancedClosing(false);
      }, 300); // Время анимации
    } else {
      // Открываем сразу
      setIsAdvancedOpen(true);
    }
    hapticFeedback?.('medium');
  };

  const handlePromptConfirm = () => {
    setSavedPrompt(customPrompt);
    hapticFeedback?.('medium');
    
    // Показываем уведомление или выполняем другие действия
    console.log('Промпт сохранен:', customPrompt);
  };

  const handlePromptChange = (value) => {
    setCustomPrompt(value);
    hapticFeedback?.('light');
  };

  return (
    <Card3D delay={2}>
      <Stack gap="lg">
        <Group gap="xs" align="center">
          <div className="rotating-icon">
            <Box
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #667eea, #764ba2, #f093fb, #f5576c, #667eea)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: 'drop-shadow(0 8px 16px rgba(102, 126, 234, 0.3))',
                animation: 'spin 8s linear infinite',
              }}
            >
              <Box
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconBrain size={16} color="#8b5cf6" />
              </Box>
            </Box>
          </div>
          <Title order={3} size="h4" c="white" fw={600}>
            {t('chooseModel')}
          </Title>
        </Group>

        <Group gap="md" grow>
          {models.map((model, index) => {
            const isSelected = selectedModel === model.id;
            const shouldAnimateCheck = justSelectedModel === model.id;
            const IconComponent = model.icon;
            
            return (
              <div
                key={model.id}
                style={{
                  opacity: 0,
                  transform: 'scale(0.9)',
                  animation: `fadeInScale 0.3s ease-out ${0.1 + index * 0.1}s forwards`
                }}
                className="model-option"
              >
                <Box
                  onClick={() => handleModelSelect(model.id)}
                  style={{
                    position: 'relative',
                    padding: '20px',
                    borderRadius: '16px',
                    background: isSelected 
                      ? model.gradient
                      : 'rgba(39, 39, 42, 0.8)',
                    border: isSelected 
                      ? '2px solid rgba(255, 255, 255, 0.3)'
                      : '2px solid rgba(113, 113, 122, 0.3)',
                    boxShadow: isSelected 
                      ? `0 20px 40px ${model.glowColor}, 0 0 20px ${model.glowColor}`
                      : '0 8px 25px rgba(0, 0, 0, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                    overflow: 'hidden',
                  }}
                  className="model-box"
                >
                  {/* Блики для выбранной модели */}
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                        pointerEvents: 'none',
                        animation: 'shimmer 5s ease-in-out infinite'
                      }}
                    />
                  )}
                  
                  <Stack align="center" gap="sm" style={{ position: 'relative', zIndex: 2 }}>
                    <div
                      style={{
                        animation: isSelected ? 'wiggle 2s ease-in-out infinite 4s' : 'none'
                      }}
                    >
                      <Box
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: '12px',
                          background: isSelected 
                            ? 'rgba(255, 255, 255, 0.2)' 
                            : 'rgba(139, 92, 246, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <IconComponent 
                          size={24} 
                          color={isSelected ? '#ffffff' : '#8b5cf6'} 
                        />
                      </Box>
                    </div>
                    
                    <Stack align="center" gap={4}>
                      <Text 
                        size="md" 
                        fw={700} 
                        c={isSelected ? 'white' : 'gray.3'}
                        style={{
                          textShadow: isSelected ? '0 2px 4px rgba(0, 0, 0, 0.5)' : 'none'
                        }}
                      >
                        {model.name}
                      </Text>
                      <Text 
                        size="xs" 
                        c={isSelected ? 'gray.1' : 'dimmed'}
                        ta="center"
                        style={{
                          textShadow: isSelected ? '0 1px 2px rgba(0, 0, 0, 0.5)' : 'none'
                        }}
                      >
                        {model.description}
                      </Text>
                    </Stack>
                  </Stack>
                  
                  {/* Индикатор выбора - без анимации, сразу в нужной позиции */}
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        opacity: shouldAnimateCheck ? 0 : 1,
                        animation: shouldAnimateCheck ? 'fadeInCheck 0.3s ease-out forwards' : 'none'
                      }}
                    >
                      <Box
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: '#10b981',
                        }}
                      />
                    </div>
                  )}
                </Box>
              </div>
            );
          })}
        </Group>
        
        <div
          style={{
            opacity: 0,
            animation: 'fadeIn 0.3s ease-out 0.5s forwards'
          }}
        >
          <Box
            style={{
              padding: '16px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}
          >
            <Text size="sm" c="green.3" ta="center" fw={500}>
              ✨ {t('selectedModel')}: {models.find(m => m.id === selectedModel)?.name}
            </Text>
          </Box>
        </div>

        {/* Слайдер креативности AI */}
        <div
          style={{
            opacity: 0,
            transform: 'translate3d(20px)',
            animation: 'fadeInUp 0.3s ease-out 0.4s forwards'
          }}
        >
          <Box
            style={{
              padding: '20px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
              border: '1px solid rgba(139, 92, 246, 0.3)',
            }}
          >
            <Stack gap="md">
              <Group justify="space-between" align="center">
                <Group gap="md">
                  <Box
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                    }}
                  >
                    <IconBolt size={18} color="white" />
                  </Box>
                  
                  <Stack gap={2}>
                    <Text size="sm" fw={600} c="white">
                      {t('aiCreativity')}
                    </Text>
                    <Text size="xs" c="gray.3">
                      {t('aiCreativityDesc')}
                    </Text>
                  </Stack>
                </Group>
                
                <div
                  style={{
                    transition: 'all 0.2s ease-out'
                  }}
                >
                  <Text size="lg" fw={700} c="violet.3">
                    {settings.aiCreativity}%
                  </Text>
                </div>
              </Group>
              
              <Slider
                value={settings.aiCreativity}
                onChange={(value) => handleSettingChange('aiCreativity', value)}
                min={0}
                max={100}
                step={5}
                color="violet"
                size="md"
                styles={{
                  thumb: {
                    background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)',
                    width: 20,
                    height: 20,
                  },
                  track: {
                    background: 'rgba(113, 113, 122, 0.3)',
                    height: 6,
                  },
                  bar: {
                    background: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
                    boxShadow: '0 2px 8px rgba(139, 92, 246, 0.4)',
                  }
                }}
              />
              
              <Group justify="space-between">
                <Text size="xs" c="dimmed">{t('logical')}</Text>
                <Text size="xs" c="dimmed">{t('creative')}</Text>
              </Group>

              {/* Кнопка дополнительных настроек */}
              <div
                style={{
                  opacity: 0,
                  animation: 'fadeIn 0.3s ease-out 0.6s forwards'
                }}
              >
                <Button
                  onClick={toggleAdvancedSettings}
                  variant="subtle"
                  color="violet"
                  size="sm"
                  leftSection={<IconSettings size={16} />}
                  rightSection={
                    <div
                      style={{
                        transform: isAdvancedOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      <IconChevronDown size={16} />
                    </div>
                  }
                  styles={{
                    root: {
                      background: 'rgba(139, 92, 246, 0.1)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      color: '#a855f7',
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: 'rgba(139, 92, 246, 0.2)',
                        transform: 'translate3d(-1px)',
                      }
                    }
                  }}
                  fullWidth
                >
                  {t('advancedSettings')}
                </Button>
              </div>
            </Stack>
          </Box>
        </div>

        {/* Дополнительные настройки с плавным закрытием */}
        {(isAdvancedOpen || isAdvancedClosing) && (
          <div
            style={{
              opacity: isAdvancedClosing ? 1 : 0,
              maxHeight: isAdvancedClosing ? '1000px' : 0,
              overflow: 'hidden',
              animation: isAdvancedClosing 
                ? 'expandFadeOut 0.3s ease-out forwards'
                : 'expandFadeIn 0.3s ease-out forwards',
            }}
          >
            <Box
              style={{
                padding: '24px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                border: '2px solid rgba(59, 130, 246, 0.3)',
                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.2)',
              }}
            >
              <Stack gap="lg">
                <Group gap="xs" align="center">
                  <Box
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    <IconSettings size={16} color="white" />
                  </Box>
                  <Text size="md" fw={700} c="white">
                    {t('customPromptTitle')}
                  </Text>
                </Group>

                <Text size="sm" c="gray.3">
                  {t('customPromptDescription')}
                </Text>

                <Textarea
                  value={customPrompt}
                  onChange={(event) => handlePromptChange(event.currentTarget.value)}
                  placeholder={t('customPromptPlaceholder')}
                  minRows={4}
                  maxRows={8}
                  autosize
                  styles={{
                    input: {
                      background: 'rgba(25, 25, 30, 0.8)',
                      border: '2px solid rgba(59, 130, 246, 0.4)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontSize: '14px',
                      padding: '16px',
                      '&::placeholder': {
                        color: '#9ca3af',
                      },
                      '&:focus': {
                        borderColor: '#3b82f6',
                        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)',
                      }
                    }
                  }}
                />

                {/* Показать сохраненный промпт если есть */}
                {savedPrompt && (
                  <div
                    style={{
                      opacity: 0,
                      transform: 'translate3d(10px)',
                      animation: 'fadeInUp 0.3s ease-out forwards'
                    }}
                  >
                    <Box
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                      }}
                    >
                      <Group gap="xs">
                        <IconCheck size={16} color="#10b981" />
                        <Text size="sm" c="green.3" fw={500}>
                          {t('promptSaved')}
                        </Text>
                      </Group>
                    </Box>
                  </div>
                )}

                <Group justify="flex-end">
                  <Button
                    onClick={handlePromptConfirm}
                    disabled={!customPrompt.trim()}
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'violet', deg: 135 }}
                    size="md"
                    leftSection={<IconCheck size={18} />}
                    styles={{
                      root: {
                        fontWeight: 700,
                        boxShadow: customPrompt.trim() 
                          ? '0 8px 20px rgba(59, 130, 246, 0.4)' 
                          : 'none',
                        opacity: customPrompt.trim() ? 1 : 0.6,
                        '&:disabled': {
                          background: 'rgba(113, 113, 122, 0.3)',
                          color: 'rgba(255, 255, 255, 0.4)',
                        }
                      }
                    }}
                  >
                    {t('confirm')}
                  </Button>
                </Group>
              </Stack>
            </Box>
          </div>
        )}
      </Stack>

      {/* CSS анимации */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
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
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          40% {
            opacity: 0;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(-10deg) scale(1.1);
          }
          75% {
            transform: rotate(10deg) scale(1.1);
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        
        @keyframes fadeInCheck {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes expandFadeIn {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 1000px;
          }
        }
        
        @keyframes expandFadeOut {
          from {
            opacity: 1;
            max-height: 1000px;
          }
          to {
            opacity: 0;
            max-height: 0;
          }
        }
        
        .model-option:hover .model-box {
          transform: scale(1.01);
        }
        
        .model-option:active .model-box {
          transform: scale(0.99);
        }
      `}</style>
    </Card3D>
  );
});