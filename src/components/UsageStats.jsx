import React, { memo } from 'react';
import { Stack, Group, Title, Text, Card, ThemeIcon, Divider } from '@mantine/core';
import { IconChartBar, IconTrophy, IconMessageCircle, IconPhoto, IconMicrophone, IconVideo, IconMusic } from '@tabler/icons-react';
import { Card3D } from './ui/Card3D';
import { SmoothProgress } from './ui/SmoothProgress';
import { useLanguage } from './LanguageContext';

export const UsageStats = memo(() => {
  const { t } = useLanguage();

  // Обновленные статистические данные с переводами
  const statsItems = [
    { 
      name: t('textRequests'), 
      used: 127, 
      limit: 250,
      color: 'blue',
      percentage: Math.round((127/250) * 100)
    },
    { 
      name: t('voiceRequests'), 
      used: 23, 
      limit: 50,
      color: 'green',
      percentage: Math.round((23/50) * 100)
    },
    { 
      name: t('imageRequests'), 
      used: 15, 
      limit: 50,
      color: 'violet',
      percentage: Math.round((15/50) * 100)
    },
    { 
      name: t('videoRequests'), 
      used: 5, 
      limit: 40,
      color: 'orange',
      percentage: Math.round((5/40) * 100)
    },
    { 
      name: t('playlistRequests'), 
      used: 2, 
      limit: 10,
      color: 'pink',
      percentage: Math.round((2/10) * 100)
    }
  ];

  const iconMap = {
    [t('textRequests')]: IconMessageCircle,
    [t('voiceRequests')]: IconMicrophone,
    [t('imageRequests')]: IconPhoto,
    [t('videoRequests')]: IconVideo,
    [t('playlistRequests')]: IconMusic
  };

  return (
    <Card3D delay={2}>
      <Stack gap="lg">
        <Group gap="xs" align="center">
          <ThemeIcon size="lg" variant="gradient" gradient={{ from: 'blue', to: 'violet' }}>
            <IconChartBar size={20} />
          </ThemeIcon>
          <Title order={3} size="h4" c="white" fw={600}>
            {t('subscriptionLimits')}
          </Title>
        </Group>
        
        <Stack gap="lg">
          {statsItems.map((item, index) => {
            const IconComponent = iconMap[item.name] || IconMessageCircle;
            
            return (
              <SmoothProgress
                key={item.name}
                value={item.percentage}
                color={item.color}
                label={`${item.name}: ${item.used} ${t('outOf')} ${item.limit}`}
                icon={IconComponent}
                delay={index}
              />
            );
          })}
        </Stack>

        <Divider color="dark.4" />

        {/* Общая статистика */}
        <Card
          padding="lg"
          radius="lg"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
            border: '1px solid rgba(139, 92, 246, 0.5)',
            boxShadow: '0 10px 35px rgba(139, 92, 246, 0.25)',
          }}
        >
          <Group justify="space-between" align="center">
            <Group gap="xs">
              <ThemeIcon size="sm" variant="light" color="violet">
                <IconTrophy size={14} />
              </ThemeIcon>
              <Text size="sm" c="dimmed">
                {t('totalUsedToday')}
              </Text>
            </Group>
            <Text size="xl" fw={700} c="white">
              {statsItems.reduce((total, item) => total + item.used, 0)} {t('requests')}
            </Text>
          </Group>
        </Card>
      </Stack>
    </Card3D>
  );
});