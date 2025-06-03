import React, { memo, useMemo } from 'react';
import { Stack, Group, Title, Text, Badge, Avatar, ThemeIcon, Divider, Box } from '@mantine/core';
import { IconUser, IconCrown, IconBolt, IconCalendar, IconCreditCard, IconClock, IconSparkles, IconStar } from '@tabler/icons-react';
import { Card3D } from './ui/Card3D';
import { useLanguage } from './LanguageContext';

export const ProfileCard = memo(({ profile, user }) => {
  const { t } = useLanguage();

  const subscriptionInfo = useMemo(() => {
    if (!profile?.subscription?.isActive) {
      return {
        name: t('flash'),
        color: 'gray',
        limits: t('weeklyLimit'),
        icon: IconBolt,
        gradient: { from: 'gray', to: 'dark', deg: 135 }
      };
    }
    
    return {
      name: t('premium'),
      color: 'violet',
      limits: t('unlimited'),
      icon: IconCrown,
      gradient: { from: 'violet', to: 'pink', deg: 135 }
    };
  }, [profile?.subscription?.isActive, t]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  // Компонент для красивого Premium статуса БЕЗ РАЗМЫТИЯ
  const PremiumBadge = ({ info }) => {
    const isPremium = info.color === 'violet';
    const IconComponent = info.icon;

    if (!isPremium) {
      // Красивый Flash бейдж БЕЗ РАЗМЫТИЯ
      return (
        <div 
          style={{ 
            position: 'relative',
            opacity: 0,
            transform: 'scale(0.8)',
            animation: 'badgeAppear 0.5s ease-out 0.2s forwards'
          }}
          className="flash-badge-container"
        >
          {/* Основной контейнер для Flash */}
          <Box
            style={{
              position: 'relative',
              padding: '16px 32px',
              borderRadius: '25px',
              background: `
                linear-gradient(135deg, 
                  rgba(71, 85, 105, 0.95) 0%, 
                  rgba(100, 116, 139, 0.95) 50%, 
                  rgba(148, 163, 184, 0.95) 100%
                )
              `,
              border: '2px solid rgba(255, 255, 255, 0.2)',
              boxShadow: `
                0 15px 30px rgba(71, 85, 105, 0.3),
                0 0 20px rgba(100, 116, 139, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
            }}
            className="flash-badge"
          >
            {/* Анимированный фоновый блик для Flash */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                transform: 'skewX(-15deg)',
                pointerEvents: 'none',
                animation: 'shimmerFlash 5.5s ease-in-out infinite'
              }}
            />

            {/* Декоративные искры */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: `${25 + i * 12}%`,
                  left: `${15 + i * 20}%`,
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  background: '#e2e8f0',
                  boxShadow: '0 0 4px rgba(226, 232, 240, 0.6)',
                  pointerEvents: 'none',
                  animation: `sparkle${i} ${1.8 + i * 0.2}s ease-in-out infinite ${i * 0.5}s`
                }}
              />
            ))}

            {/* Контент для Flash */}
            <Group gap="md" align="center" justify="center" style={{ position: 'relative', zIndex: 2 }}>
              {/* Анимированная молния */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
                  flexShrink: 0,
                  animation: 'boltWiggle 2s ease-in-out infinite 1.5s'
                }}
              >
                <div style={{ animation: 'boltGlow 1.5s ease-in-out infinite' }}>
                  <IconBolt size={22} color="#fbbf24" stroke={1.8} />
                </div>
              </div>
              
              {/* Текст с эффектами для Flash */}
              <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div
                  style={{ 
                    marginTop: '8px',
                    animation: 'textGlowFlash 2.5s ease-in-out infinite'
                  }}
                >
                  <Text 
                    fw={800} 
                    style={{
                      color: '#f1f5f9',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                      fontSize: '17px',
                      letterSpacing: '0.4px',
                      lineHeight: 1,
                      margin: 0,
                    }}
                  >
                    {info.name.toUpperCase()}
                  </Text>
                </div>
                
                {/* Дополнительные точки для Flash */}
                <Group gap="xs" justify="center" style={{ marginTop: '2px' }}>
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: '#cbd5e1',
                        boxShadow: '0 0 4px rgba(203, 213, 225, 0.6)',
                        animation: `dotPulse 2s ease-in-out infinite ${i * 0.4}s`
                      }}
                    />
                  ))}
                </Group>
              </Box>

              {/* Дополнительная иконка-акцент для Flash */}
              <div
                style={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(251, 191, 36, 0.4)',
                  animation: 'accentSpin 5s linear infinite'
                }}
              >
                <IconBolt size={9} color="#fff" />
              </div>
            </Group>

            {/* Пульсирующее свечение для Flash БЕЗ BLUR */}
            <div
              style={{
                position: 'absolute',
                top: '-10px',
                left: '-10px',
                right: '-10px',
                bottom: '-10px',
                borderRadius: '35px',
                background: 'linear-gradient(135deg, rgba(71, 85, 105, 0.2), rgba(100, 116, 139, 0.2))',
                pointerEvents: 'none',
                zIndex: -1,
                animation: 'glowPulseFlash 3s ease-in-out infinite'
              }}
            />
          </Box>

          {/* Дополнительные плавающие элементы для Flash */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`flash-float-${i}`}
              style={{
                position: 'absolute',
                top: `${-15 + i * 4}px`,
                left: `${35 + i * 20}%`,
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: '#fbbf24',
                boxShadow: '0 0 6px rgba(251, 191, 36, 0.6)',
                pointerEvents: 'none',
                zIndex: 3,
                animation: `floatFlash${i} ${2.5 + i * 0.4}s ease-in-out infinite ${i * 0.6}s`
              }}
            />
          ))}
        </div>
      );
    }

    // Красивый Premium бейдж БЕЗ РАЗМЫТИЯ
    return (
      <div 
        style={{ 
          position: 'relative',
          opacity: 0,
          transform: 'scale(0.8)',
          animation: 'badgeAppear 0.5s ease-out 0.2s forwards'
        }}
        className="premium-badge-container"
      >
        {/* Основной контейнер */}
        <Box
          style={{
            position: 'relative',
            padding: '16px 32px',
            borderRadius: '25px',
            background: `
              linear-gradient(135deg, 
                rgba(139, 92, 246, 0.95) 0%, 
                rgba(236, 72, 153, 0.95) 50%, 
                rgba(249, 115, 22, 0.95) 100%
              )
            `,
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: `
              0 15px 30px rgba(139, 92, 246, 0.3),
              0 0 20px rgba(236, 72, 153, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.3)
            `,
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
          }}
          className="premium-badge"
        >
          {/* Анимированный фоновый блик */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
              transform: 'skewX(-20deg)',
              pointerEvents: 'none',
              animation: 'shimmerPremium 5s ease-in-out infinite'
            }}
          />

          {/* Декоративные частицы */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: `${20 + i * 10}%`,
                left: `${10 + i * 15}%`,
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: '#fff',
                boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)',
                pointerEvents: 'none',
                animation: `particle${i} ${2 + i * 0.3}s ease-in-out infinite ${i * 0.4}s`
              }}
            />
          ))}

          {/* Контент */}
          <Group gap="md" align="center" justify="center" style={{ position: 'relative', zIndex: 2 }}>
            {/* Анимированная корона */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                flexShrink: 0,
                animation: 'crownWigglePremium 2.5s ease-in-out infinite 1s'
              }}
            >
              <IconCrown size={22} color="#fff" stroke={1.5} />
            </div>
            
            {/* Текст с эффектами */}
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div
                style={{ 
                  marginTop: '8px',
                  animation: 'textGlowPremium 2s ease-in-out infinite'
                }}
              >
                <Text 
                  fw={900} 
                  style={{
                    color: '#fff',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                    fontSize: '17px',
                    letterSpacing: '0.5px',
                    lineHeight: 1,
                    margin: 0,
                  }}
                >
                  {info.name.toUpperCase()}
                </Text>
              </div>
              
              {/* Дополнительные звездочки */}
              <Group gap="xs" justify="center" style={{ marginTop: '2px' }}>
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      animation: `starRotate${i} 3s ease-in-out infinite ${i * 0.3}s`
                    }}
                  >
                    <IconStar size={7} color="#fff" fill="#fff" />
                  </div>
                ))}
              </Group>
            </Box>

            {/* Дополнительная иконка-акцент */}
            <div
              style={{
                position: 'absolute',
                top: -8,
                right: -8,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(251, 191, 36, 0.5)',
                animation: 'accentSpinPremium 4s linear infinite'
              }}
            >
              <IconSparkles size={10} color="#fff" />
            </div>
          </Group>

          {/* Пульсирующее свечение БЕЗ BLUR */}
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              left: '-10px',
              right: '-10px',
              bottom: '-10px',
              borderRadius: '35px',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))',
              pointerEvents: 'none',
              zIndex: -1,
              animation: 'glowPulsePremium 2.5s ease-in-out infinite'
            }}
          />
        </Box>

        {/* Дополнительные плавающие элементы */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`float-${i}`}
            style={{
              position: 'absolute',
              top: `${-20 + i * 5}px`,
              left: `${30 + i * 25}%`,
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#fbbf24',
              boxShadow: '0 0 8px rgba(251, 191, 36, 0.8)',
              pointerEvents: 'none',
              zIndex: 3,
              animation: `floatPremium${i} ${3 + i * 0.5}s ease-in-out infinite ${i * 0.8}s`
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <Card3D delay={1}>
      <Stack gap="lg">
        {/* Аватар и основная информация */}
        <div
          style={{
            position: 'relative',
            opacity: 0,
            transform: 'scale(0.8)',
            animation: 'profileAppear 0.3s ease-out 0.1s forwards'
          }}
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
                  boxShadow: '0 15px 30px rgba(139, 92, 246, 0.2)',
                  border: '3px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <IconUser size={50} stroke={1.5} />
              </Avatar>
              
              {subscriptionInfo.color === 'violet' && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: -8,
                    right: -8,
                    animation: 'crownBadgeAppear 0.3s ease-out 0.2s both'
                  }}
                >
                  <ThemeIcon
                    size={36}
                    radius="xl"
                    color="yellow"
                    style={{
                      boxShadow: '0 8px 20px rgba(255, 193, 7, 0.3)',
                      border: '3px solid rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    <IconCrown size={20} />
                  </ThemeIcon>
                </div>
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

            {/* Улучшенный статус подписки */}
            <PremiumBadge info={subscriptionInfo} />
          </Stack>
        </div>

        <Divider color="dark.4" />

        {/* Детальная информация о подписке */}
        {profile?.subscription?.isActive && (
          <div
            style={{
              opacity: 0,
              transform: 'translate3d(20px)',
              animation: 'subscriptionInfoAppear 0.3s ease-out 0.3s forwards'
            }}
          >
            <Stack gap="md">
              <Text size="sm" fw={600} c="white" ta="center">
                {t('subscriptionDetails')}
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
                      {t('timeLeft')}
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
                      {t('payment')}
                    </Text>
                    <Text size="sm" fw={700} c="violet.3" ta="center">
                      {profile?.subscription?.payment_method || t('cardPayment')}
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
                    {t('subscriptionActiveUntil')} <Text span fw={700}>{formatDate(profile?.subscription?.expires_at)}</Text>
                  </Text>
                </Group>
              </Box>
            </Stack>
          </div>
        )}

        <Divider color="dark.4" />

        {/* Дата регистрации */}
        <div
          style={{
            opacity: 0,
            transform: 'translateX(-20px)',
            animation: 'registrationAppear 0.3s ease-out 0.4s forwards'
          }}
        >
          <Group gap="xs" justify="center">
            <ThemeIcon size="sm" variant="light" color="gray">
              <IconCalendar size={14} />
            </ThemeIcon>
            <Stack gap={2} align="center">
              <Text size="xs" c="dimmed">
                {t('registrationDate')}
              </Text>
              <Text size="sm" fw={500} c="gray.3">
                {formatDate(profile?.user_info?.created_at)}
              </Text>
            </Stack>
          </Group>
        </div>
      </Stack>

      {/* CSS анимации */}
      <style jsx>{`
        @keyframes badgeAppear {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes profileAppear {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes subscriptionInfoAppear {
          from {
            opacity: 0;
            transform: translate3d(20px);
          }
          to {
            opacity: 1;
            transform: translate3d(0);
          }
        }
        
        @keyframes registrationAppear {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes crownBadgeAppear {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        
        @keyframes shimmerFlash {
          0% {
            transform: translateX(-100%) skewX(-15deg);
            opacity: 0;
          }
          20% {
            opacity: 0.4;
          }
          40% {
            opacity: 0;
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
            opacity: 0;
          }
        }
        
        @keyframes shimmerPremium {
          0% {
            transform: translateX(-100%) skewX(-20deg);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          40% {
            opacity: 0;
          }
          100% {
            transform: translateX(200%) skewX(-20deg);
            opacity: 0;
          }
        }
        
        @keyframes boltWiggle {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(-3deg) scale(1.05);
          }
          75% {
            transform: rotate(3deg) scale(1.05);
          }
        }
        
        @keyframes crownWigglePremium {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(-5deg) scale(1.1);
          }
          75% {
            transform: rotate(5deg) scale(1.1);
          }
        }
        
        @keyframes boltGlow {
          0%, 100% {
            filter: drop-shadow(0 0 0px rgba(251, 191, 36, 0.8));
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.8));
          }
        }
        
        @keyframes textGlowFlash {
          0%, 100% {
            text-shadow: 0 0 3px rgba(148, 163, 184, 0.5);
          }
          50% {
            text-shadow: 0 0 12px rgba(148, 163, 184, 0.8);
          }
        }
        
        @keyframes textGlowPremium {
          0%, 100% {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
          }
          50% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
          }
        }
        
        @keyframes dotPulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        
        @keyframes accentSpin {
          from {
            transform: rotate(0deg);
            opacity: 0.6;
          }
          to {
            transform: rotate(360deg);
            opacity: 1;
          }
        }
        
        @keyframes accentSpinPremium {
          from {
            transform: rotate(0deg);
            opacity: 0.7;
          }
          to {
            transform: rotate(360deg);
            opacity: 1;
          }
        }
        
        @keyframes glowPulseFlash {
          0%, 100% {
            transform: scale(1);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.3;
          }
        }
        
        @keyframes glowPulsePremium {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.4;
          }
        }
        
        /* Специфические анимации для каждой искры/частицы */
        @keyframes sparkle0 {
          0%, 100% {
            transform: translate3d(0px) scale(0.6);
            opacity: 0.2;
          }
          50% {
            transform: translate3d(-8px) scale(1);
            opacity: 0.8;
          }
        }
        
        @keyframes sparkle1 {
          0%, 100% {
            transform: translate3d(0px) scale(0.6);
            opacity: 0.2;
          }
          50% {
            transform: translate3d(-8px) scale(1);
            opacity: 0.8;
          }
        }
        
        @keyframes sparkle2 {
          0%, 100% {
            transform: translate3d(0px) scale(0.6);
            opacity: 0.2;
          }
          50% {
            transform: translate3d(-8px) scale(1);
            opacity: 0.8;
          }
        }
        
        @keyframes sparkle3 {
          0%, 100% {
            transform: translate3d(0px) scale(0.6);
            opacity: 0.2;
          }
          50% {
            transform: translate3d(-8px) scale(1);
            opacity: 0.8;
          }
        }
        
        @keyframes particle0 {
          0%, 100% {
            transform: translate3d(0px) scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: translate3d(-10px) scale(1.2);
            opacity: 1;
          }
        }
        
        @keyframes particle1 {
          0%, 100% {
            transform: translate3d(0px) scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: translate3d(-10px) scale(1.2);
            opacity: 1;
          }
        }
        
        @keyframes particle2 {
          0%, 100% {
            transform: translate3d(0px) scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: translate3d(-10px) scale(1.2);
            opacity: 1;
          }
        }
        
        @keyframes particle3 {
          0%, 100% {
            transform: translate3d(0px) scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: translate3d(-10px) scale(1.2);
            opacity: 1;
          }
        }
        
        @keyframes particle4 {
          0%, 100% {
            transform: translate3d(0px) scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: translate3d(-10px) scale(1.2);
            opacity: 1;
          }
        }
        
        @keyframes particle5 {
          0%, 100% {
            transform: translate3d(0px) scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: translate3d(-10px) scale(1.2);
            opacity: 1;
          }
        }
        
        @keyframes starRotate0 {
          0%, 100% {
            transform: rotate(0deg) scale(0.8);
          }
          50% {
            transform: rotate(360deg) scale(1.2);
          }
        }
        
        @keyframes starRotate1 {
          0%, 100% {
            transform: rotate(0deg) scale(0.8);
          }
          50% {
            transform: rotate(360deg) scale(1.2);
          }
        }
        
        @keyframes starRotate2 {
          0%, 100% {
            transform: rotate(0deg) scale(0.8);
          }
          50% {
            transform: rotate(360deg) scale(1.2);
          }
        }
        
        @keyframes floatFlash0 {
          0%, 100% {
            transform: translate3d(0px) translateX(0px) scale(0);
            opacity: 0;
          }
          50% {
            transform: translate3d(-15px) translateX(8px) scale(0.8);
            opacity: 0.8;
          }
        }
        
        @keyframes floatFlash1 {
          0%, 100% {
            transform: translate3d(0px) translateX(0px) scale(0);
            opacity: 0;
          }
          50% {
            transform: translate3d(-15px) translateX(-4px) scale(0.8);
            opacity: 0.8;
          }
        }
        
        @keyframes floatFlash2 {
          0%, 100% {
            transform: translate3d(0px) translateX(0px) scale(0);
            opacity: 0;
          }
          50% {
            transform: translate3d(-15px) translateX(12px) scale(0.8);
            opacity: 0.8;
          }
        }
        
        @keyframes floatPremium0 {
          0%, 100% {
            transform: translate3d(0px) translateX(0px) scale(0);
            opacity: 0;
          }
          50% {
            transform: translate3d(-20px) translateX(10px) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes floatPremium1 {
          0%, 100% {
            transform: translate3d(0px) translateX(0px) scale(0);
            opacity: 0;
          }
          50% {
            transform: translate3d(-20px) translateX(-5px) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes floatPremium2 {
          0%, 100% {
            transform: translate3d(0px) translateX(0px) scale(0);
            opacity: 0;
          }
          50% {
            transform: translate3d(-20px) translateX(15px) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes floatPremium3 {
          0%, 100% {
            transform: translate3d(0px) translateX(0px) scale(0);
            opacity: 0;
          }
          50% {
            transform: translate3d(-20px) translateX(-8px) scale(1);
            opacity: 1;
          }
        }
        
        .flash-badge-container:hover .flash-badge {
          transform: scale(1.01);
        }
        
        .premium-badge-container:hover .premium-badge {
          transform: scale(1.01);
        }
      `}</style>
    </Card3D>
  );
});