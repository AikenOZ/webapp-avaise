import React, { memo, useMemo } from 'react';
import { Stack, Group, Title, Text, Badge, Avatar, ThemeIcon, Divider, Box } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconUser, IconCrown, IconBolt, IconCalendar, IconCreditCard, IconClock } from '@tabler/icons-react';
import { Card3D } from './ui/Card3D';

export const ProfileCard = memo(({ profile, user }) => {
  const subscriptionInfo = useMemo(() => {
    if (!profile?.subscription?.isActive) {
      return {
        name: 'Flash',
        color: 'gray',
        limits: '10 запросов в неделю',
        icon: IconBolt,
        gradient: { from: 'gray', to: 'dark', deg: 135 }
      };
    }
    
    return {
      name: 'Premium',
      color: 'violet',
      limits: 'Безлимитные запросы',
      icon: IconCrown,
      gradient: { from: 'violet', to: 'pink', deg: 135 }
    };
  }, [profile?.subscription?.isActive]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  return (
    <Card3D delay={1}>
      <Stack gap="lg">
        {/* Аватар и основная информация */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          style={{ position: 'relative' }}
        >
          <Stack align="center" gap="md">
            <Box style={{ position: 'relative' }}>
              <Avatar
                size={100}
                radius="xl"
                src={profile?.user_info?.avatar_url}
                style={{
                  background: subscriptionInfo.color === 'violet' 
                    ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' 
                    : 'linear-gradient(135deg, #6b7280, #4b5563)',
                  boxShadow: '0 25px 50px rgba(139, 92, 246, 0.3)',
                  border: '3px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <IconUser size={50} stroke={1.5} />
              </Avatar>
              
              {subscriptionInfo.color === 'violet' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    position: 'absolute',
                    bottom: -8,
                    right: -8,
                  }}
                >
                  <ThemeIcon
                    size={36}
                    radius="xl"
                    color="yellow"
                    style={{
                      boxShadow: '0 10px 30px rgba(255, 193, 7, 0.4)',
                      border: '3px solid rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    <IconCrown size={20} />
                  </ThemeIcon>
                </motion.div>
              )}
            </Box>

            {/* Информация о пользователе */}
            <Stack align="center" gap={4}>
              <Title order={2} size="h3" ta="center" c="white" fw={600}>
                {user?.first_name} {user?.last_name}
              </Title>
              <Text size="sm" c="dimmed" ta="center">
                @{profile?.user_info?.username || user?.username || 'username'}
              </Text>
            </Stack>

            {/* Статус подписки */}
            <Badge
              size="xl"
              radius="xl"
              variant="gradient"
              gradient={subscriptionInfo.gradient}
              style={{
                boxShadow: subscriptionInfo.color === 'violet' 
                  ? '0 10px 35px rgba(139, 92, 246, 0.4)' 
                  : '0 10px 35px rgba(107, 114, 128, 0.4)',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                padding: '10px 20px',
              }}
            >
              <Group gap={10}>
                <subscriptionInfo.icon size={20} />
                <Text fw={700} size="md">{subscriptionInfo.name}</Text>
              </Group>
            </Badge>
          </Stack>
        </motion.div>

        <Divider color="dark.4" />

        {/* Детальная информация о подписке */}
        {profile?.subscription?.isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <Stack gap="md">
              <Text size="sm" fw={600} c="white" ta="center">
                Детали подписки
              </Text>
              
              <Group gap="lg" grow>
                {/* Оставшееся время */}
                <Box
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(34, 197, 94, 0.1))',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                  }}
                >
                  <Stack align="center" gap="xs">
                    <ThemeIcon size="sm" variant="light" color="green">
                      <IconClock size={14} />
                    </ThemeIcon>
                    <Text size="xs" c="dimmed" ta="center">
                      Осталось времени
                    </Text>
                    <Text size="sm" fw={700} c="green.3" ta="center">
                      {profile?.subscription?.time_left || '185д 3ч 11м'}
                    </Text>
                  </Stack>
                </Box>

                {/* Способ оплаты */}
                <Box
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.1))',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                  }}
                >
                  <Stack align="center" gap="xs">
                    <ThemeIcon size="sm" variant="light" color="violet">
                      <IconCreditCard size={14} />
                    </ThemeIcon>
                    <Text size="xs" c="dimmed" ta="center">
                      Оплата
                    </Text>
                    <Text size="sm" fw={700} c="violet.3" ta="center">
                      {profile?.subscription?.payment_method || '💳 Карта'}
                    </Text>
                  </Stack>
                </Box>
              </Group>

              {/* Дата окончания подписки */}
              <Box
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.1))',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                }}
              >
                <Group justify="center" gap="xs">
                  <ThemeIcon size="sm" variant="light" color="blue">
                    <IconCalendar size={14} />
                  </ThemeIcon>
                  <Text size="sm" c="blue.3">
                    Подписка активна до: <Text span fw={700}>{formatDate(profile?.subscription?.expires_at)}</Text>
                  </Text>
                </Group>
              </Box>
            </Stack>
          </motion.div>
        )}

        <Divider color="dark.4" />

        {/* Дата регистрации */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Group gap="xs" justify="center">
            <ThemeIcon size="sm" variant="light" color="gray">
              <IconCalendar size={14} />
            </ThemeIcon>
            <Stack gap={2} align="center">
              <Text size="xs" c="dimmed">
                Дата регистрации
              </Text>
              <Text size="sm" fw={500} c="gray.3">
                {formatDate(profile?.user_info?.created_at)}
              </Text>
            </Stack>
          </Group>
        </motion.div>
      </Stack>
    </Card3D>
  );
});