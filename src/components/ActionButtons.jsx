import React, { memo } from 'react';
import { Stack, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconSettings, IconCreditCard } from '@tabler/icons-react';
import { UltraButton } from './ui/UltraButton';

export const ActionButtons = memo(({ onModelSwitch, onSubscription, hapticFeedback }) => {
  const buttons = [
    {
      icon: IconSettings,
      title: 'Сменить модель ИИ',
      description: 'Выберите подходящую модель',
      onClick: onModelSwitch,
      gradient: { from: 'indigo', to: 'purple', deg: 135 }
    },
    {
      icon: IconCreditCard,
      title: 'Управление подпиской',
      description: 'Тарифы и продления',
      onClick: onSubscription,
      gradient: { from: 'pink', to: 'orange', deg: 135 }
    }
  ];

  return (
    <Stack gap="md">
      {buttons.map((button, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
        >
          <UltraButton
            gradient={button.gradient}
            icon={button.icon}
            onClick={() => {
              hapticFeedback('medium');
              button.onClick();
            }}
            fullWidth
            style={{
              height: 'auto',
              padding: '18px 24px',
            }}
            styles={{
              inner: {
                justifyContent: 'flex-start',
              },
              section: {
                marginRight: 16,
              }
            }}
          >
            <Stack gap={4} align="flex-start">
              <Text size="md" fw={700}>
                {button.title}
              </Text>
              <Text size="xs" opacity={0.9}>
                {button.description}
              </Text>
            </Stack>
          </UltraButton>
        </motion.div>
      ))}
    </Stack>
  );
});