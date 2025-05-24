import React, { memo, useState } from 'react';
import { Stack, Group, Title, Text, Box, Switch, Slider } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconSettings, IconBolt, IconShield, IconMoon, IconBell } from '@tabler/icons-react';
import { Card3D } from './ui/Card3D';

export const AdvancedSettings = memo(({ hapticFeedback }) => {
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    hapticFeedback: true,
    aiCreativity: 75
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    hapticFeedback('light');
  };

  const settingsOptions = [
    {
      key: 'darkMode',
      label: 'Темная тема',
      description: 'Интерфейс в темных тонах',
      icon: IconMoon,
      color: 'indigo'
    },
    {
      key: 'notifications',
      label: 'Уведомления',
      description: 'Push-уведомления о статусе',
      icon: IconBell,
      color: 'yellow'
    },
    {
      key: 'hapticFeedback',
      label: 'Вибрация',
      description: 'Тактильный отклик',
      icon: IconShield,
      color: 'green'
    }
  ];

  return (
    <Card3D delay={4}>
      <Stack gap="lg">
        <Group gap="xs" align="center">
          <motion.div
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Box
              style={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <IconSettings size={20} color="white" />
            </Box>
          </motion.div>
          <Title order={3} size="h4" c="white" fw={600}>
            Дополнительно
          </Title>
        </Group>

        <Stack gap="lg">
          {/* Переключатели */}
          {settingsOptions.map((option, index) => {
            const IconComponent = option.icon;
            const isEnabled = settings[option.key];
            
            return (
              <motion.div
                key={option.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
              >
                <Box
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: isEnabled 
                      ? `linear-gradient(135deg, rgba(${option.color === 'indigo' ? '99, 102, 241' : option.color === 'yellow' ? '245, 158, 11' : '16, 185, 129'}, 0.1), rgba(${option.color === 'indigo' ? '99, 102, 241' : option.color === 'yellow' ? '245, 158, 11' : '16, 185, 129'}, 0.05))`
                      : 'rgba(39, 39, 42, 0.5)',
                    border: `1px solid ${isEnabled 
                      ? `rgba(${option.color === 'indigo' ? '99, 102, 241' : option.color === 'yellow' ? '245, 158, 11' : '16, 185, 129'}, 0.3)`
                      : 'rgba(113, 113, 122, 0.2)'}`,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Group justify="space-between" align="center">
                    <Group gap="md">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Box
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: '8px',
                            background: isEnabled 
                              ? `rgba(${option.color === 'indigo' ? '99, 102, 241' : option.color === 'yellow' ? '245, 158, 11' : '16, 185, 129'}, 0.2)`
                              : 'rgba(113, 113, 122, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <IconComponent 
                            size={18} 
                            color={isEnabled 
                              ? (option.color === 'indigo' ? '#6366f1' : option.color === 'yellow' ? '#f59e0b' : '#10b981')
                              : '#71717a'
                            } 
                          />
                        </Box>
                      </motion.div>
                      
                      <Stack gap={2}>
                        <Text size="sm" fw={600} c={isEnabled ? 'white' : 'gray.4'}>
                          {option.label}
                        </Text>
                        <Text size="xs" c={isEnabled ? 'gray.3' : 'dimmed'}>
                          {option.description}
                        </Text>
                      </Stack>
                    </Group>
                    
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                    >
                      <Switch
                        checked={isEnabled}
                        onChange={(event) => handleSettingChange(option.key, event.currentTarget.checked)}
                        color={option.color}
                        size="md"
                        styles={{
                          track: {
                            cursor: 'pointer',
                          }
                        }}
                      />
                    </motion.div>
                  </Group>
                </Box>
              </motion.div>
            );
          })}
          
          {/* Слайдер креативности AI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
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
                        Креативность AI
                      </Text>
                      <Text size="xs" c="gray.3">
                        Уровень творческого мышления
                      </Text>
                    </Stack>
                  </Group>
                  
                  <motion.div
                    key={settings.aiCreativity}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Text size="lg" fw={700} c="violet.3">
                      {settings.aiCreativity}%
                    </Text>
                  </motion.div>
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
                  <Text size="xs" c="dimmed">Логичный</Text>
                  <Text size="xs" c="dimmed">Креативный</Text>
                </Group>
              </Stack>
            </Box>
          </motion.div>
        </Stack>
      </Stack>
    </Card3D>
  );
});