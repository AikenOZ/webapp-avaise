import React, { memo } from 'react';
import { Stack, Text } from '@mantine/core';
import { IconSettings, IconCreditCard } from '@tabler/icons-react';
import { UltraButton } from './ui/UltraButton';
import { useLanguage } from './LanguageContext';

export const ActionButtons = memo(({ onModelSwitch, onSubscription, hapticFeedback }) => {
  const { t } = useLanguage();
  
  const buttons = [
    {
      icon: IconSettings,
      title: t('changeAiModel'),
      description: t('selectSuitableModel'),
      onClick: onModelSwitch,
      gradient: { from: 'indigo', to: 'purple', deg: 135 }
    },
    {
      icon: IconCreditCard,
      title: t('subscriptionManagement'),
      description: t('tarifsAndRenewals'),
      onClick: onSubscription,
      gradient: { from: 'pink', to: 'orange', deg: 135 }
    }
  ];

  return (
    <Stack gap="md">
      {buttons.map((button, index) => (
        <div
          key={index}
          style={{
            opacity: 0,
            transform: index % 2 === 0 ? 'translateX(-30px)' : 'translateX(30px)',
            animation: `slideInButton 0.3s ease-out ${0.1 + index * 0.05}s forwards`
          }}
          className="action-button-wrapper"
        >
          <UltraButton
            gradient={button.gradient}
            icon={button.icon}
            onClick={() => {
              hapticFeedback?.('medium');
              button.onClick();
            }}
            fullWidth
            style={{
              height: 'auto',
              padding: '18px 24px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            styles={{
              inner: {
                justifyContent: 'flex-start',
              },
              section: {
                marginRight: 16,
              }
            }}
            className="action-button"
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
        </div>
      ))}

      {/* CSS анимации */}
      <style jsx>{`
        @keyframes slideInButton {
          from {
            opacity: 0;
            transform: var(--slide-from, translateX(-30px));
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .action-button-wrapper:hover .action-button {
          transform: translate3d(-1px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .action-button:active {
          transform: translate3d(0);
        }
        
        /* Для четных элементов - слева */
        .action-button-wrapper:nth-child(odd) {
          --slide-from: translateX(-30px);
        }
        
        /* Для нечетных элементов - справа */
        .action-button-wrapper:nth-child(even) {
          --slide-from: translateX(30px);
        }
      `}</style>
    </Stack>
  );
});