import React, { memo, useState } from 'react';
import { Stack, Group, Title, Text, Box, Slider } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconBrain, IconSparkles, IconBolt } from '@tabler/icons-react';
import { Card3D } from './ui/Card3D';

export const ModelSelector = memo(({ hapticFeedback }) => {
  const [selectedModel, setSelectedModel] = useState('gpt4');
  const [settings, setSettings] = useState({
    aiCreativity: 50
  });

  const models = [
    {
      id: 'gpt4',
      name: 'Avaise 2.5',
      description: 'Максимальная точность и логика',
      icon: IconBrain,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      glowColor: 'rgba(102, 126, 234, 0.5)'
    },
    {
      id: 'claude',
      name: 'Avaise 2.0',
      description: 'Креативность и понимание',
      icon: IconSparkles,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      glowColor: 'rgba(240, 147, 251, 0.5)'
    }
  ];

  const handleModelSelect = (modelId) => {
    setSelectedModel(modelId);
    hapticFeedback('medium');
  };

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    hapticFeedback('light');
  };

  return (
    <Card3D delay={2}>
      <Stack gap="lg">
        <Group gap="xs" align="center">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
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
          </motion.div>
          <Title order={3} size="h4" c="white" fw={600}>
            Выбор AI модели
          </Title>
        </Group>

        <Group gap="md" grow>
          {models.map((model, index) => {
            const isSelected = selectedModel === model.id;
            const IconComponent = model.icon;
            
            return (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
                >
                  {/* Блики для выбранной модели */}
                  {isSelected && (
                    <motion.div
                      initial={{ x: '-100%', opacity: 0 }}
                      animate={{ x: '100%', opacity: [0, 1, 0] }}
                      transition={{ 
                        duration: 2, 
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
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                  
                  <Stack align="center" gap="sm" style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div
                      animate={isSelected ? { 
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ 
                        duration: 2, 
                        repeat: isSelected ? Infinity : 0,
                        repeatDelay: 4
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
                    </motion.div>
                    
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
                  
                  {/* Индикатор выбора */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
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
                    </motion.div>
                  )}
                </Box>
              </motion.div>
            );
          })}
        </Group>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
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
              ✨ Выбранная модель: {models.find(m => m.id === selectedModel)?.name}
            </Text>
          </Box>
        </motion.div>

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
    </Card3D>
  );
});