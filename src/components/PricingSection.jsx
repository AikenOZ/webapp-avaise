import React, { memo, useState } from 'react';
import { Stack, Group, Title, Text, Box, Button, TextInput, Checkbox, Modal } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconCrown, IconStar, IconCreditCard, IconCheck, IconMail, IconShield, IconSparkles } from '@tabler/icons-react';
import { Card3D } from './ui/Card3D';

export const PricingSection = memo(({ hapticFeedback }) => {
  const [selectedPlan, setSelectedPlan] = useState('30');
  const [paymentMethod, setPaymentMethod] = useState('stars');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Тарифные планы
  const pricingPlans = [
    { days: '1', price: 35, stars: 35, popular: false },
    { days: '3', price: 95, stars: 95, popular: false },
    { days: '7', price: 195, stars: 195, popular: false },
    { days: '30', price: 495, stars: 495, popular: true },
    { days: '60', price: 999, stars: 999, popular: false },
    { days: '90', price: 1495, stars: 1495, popular: false },
  ];

  // Преимущества Premium
  const premiumFeatures = [
    'Входит в подписку',
    '• Распознает Изображения',
    '• Голосовые сообщения',
    '• Видеосообщения',
    '• 350 запросов в день',
    '• 50 музыкальных подборок в день',
    '• Единый мультимодальный контекст',
    '• Выбор модели ИИ'
  ];

  // Способы оплаты
  const paymentMethods = [
    {
      id: 'stars',
      name: 'Telegram Stars',
      icon: IconStar,
      color: '#f59e0b',
      gradient: { from: 'yellow', to: 'orange' }
    },
    {
      id: 'bank',
      name: 'Банк \\ СБП',
      icon: IconCreditCard,
      color: '#3b82f6',
      gradient: { from: 'blue', to: 'cyan' }
    }
  ];

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError('');
    
    // Валидация email
    if (value && !value.includes('@')) {
      setEmailError('Email должен содержать символ @');
    } else if (value && value.includes('@')) {
      const emailParts = value.split('@');
      if (emailParts.length !== 2 || !emailParts[0] || !emailParts[1]) {
        setEmailError('Некорректный формат email');
      } else if (!emailParts[1].includes('.')) {
        setEmailError('Email должен содержать домен с точкой');
      }
    }
  };

  const isEmailValid = email.trim() && 
    email.includes('@') && 
    email.split('@').length === 2 && 
    email.split('@')[0] && 
    email.split('@')[1] && 
    email.split('@')[1].includes('.') &&
    !emailError;

  const handlePlanSelect = (planDays) => {
    setSelectedPlan(planDays);
    hapticFeedback('light');
  };

  const handlePaymentSelect = (methodId) => {
    setPaymentMethod(methodId);
    hapticFeedback('light');
  };

  const handlePurchase = () => {
    hapticFeedback('medium');
    
    if (paymentMethod === 'bank') {
      setShowEmailModal(true);
    } else {
      setShowConfirmModal(true);
    }
  };

  const handleEmailSubmit = () => {
    if (!isEmailValid) {
      if (!email.trim()) {
        setEmailError('Введите email адрес');
      }
      return;
    }
    
    hapticFeedback('light');
    setShowEmailModal(false);
    setShowConfirmModal(true);
  };

  const handleFinalConfirm = () => {
    hapticFeedback('medium');
    const plan = pricingPlans.find(p => p.days === selectedPlan);
    
    console.log('Окончательная покупка:', {
      plan: `${plan.days} дней`,
      price: paymentMethod === 'stars' ? `${plan.stars} ⭐` : `${plan.price} ₽`,
      method: paymentMethod,
      email: paymentMethod === 'bank' ? email : null,
      agreed: agreedToTerms
    });
    
    setShowConfirmModal(false);
    resetForm();
  };

  const resetForm = () => {
    setEmail('');
    setEmailError('');
    setAgreedToTerms(false);
  };

  const handleCloseModals = () => {
    setShowEmailModal(false);
    setShowConfirmModal(false);
    resetForm();
  };

  const selectedPlanData = pricingPlans.find(p => p.days === selectedPlan);

  // Стили для модальных окон - полностью независимые от фона
  const modalStyles = {
    content: {
      background: '#1a1b23', // Полностью непрозрачный фон
      border: '2px solid rgba(139, 92, 246, 0.4)',
      borderRadius: '20px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(139, 92, 246, 0.4)',
      position: 'relative', // Изолируем от backdrop эффектов
      zIndex: 1000, // Высокий z-index для полной независимости
    },
    header: {
      background: 'transparent',
      borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
      paddingBottom: '20px',
    },
    title: {
      color: '#ffffff',
      fontWeight: 700,
      fontSize: '20px',
      textAlign: 'center',
    },
    body: {
      padding: '24px',
      background: '#1a1b23', // Дублируем фон для надежности
    }
  };

  return (
    <>
      <Stack gap="xl">
        {/* Заголовок Premium */}
        <Card3D delay={1}>
          <Box
            style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(251, 191, 36, 0.15))',
              border: '2px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <Stack align="center" gap="md">
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <Box
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #f59e0b, #eab308)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 15px 35px rgba(245, 158, 11, 0.4)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <IconCrown size={30} color="white" />
                </Box>
              </motion.div>
              
              <Stack align="center" gap="xs">
                <Title order={2} size="h3" c="yellow.3" fw={700}>
                  👑 OZ Premium
                </Title>
                <Text size="sm" c="gray.3" ta="center">
                  Премиум AI Платформа
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Card3D>

        {/* Список преимуществ */}
        <Card3D delay={2}>
          <Stack gap="lg">
            <Group gap="xs" align="center">
              <IconCheck size={20} color="#10b981" />
              <Title order={3} size="h4" c="white" fw={600}>
                Что входит в подписку
              </Title>
            </Group>
            
            <Box
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(34, 197, 94, 0.1))',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '12px',
                padding: '16px',
              }}
            >
              <Stack gap="xs">
                {premiumFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                  >
                    <Text 
                      size="sm" 
                      c={index === 0 ? "green.3" : "gray.3"}
                      fw={index === 0 ? 700 : 500}
                    >
                      {feature}
                    </Text>
                  </motion.div>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Card3D>

        {/* Выбор тарифного плана */}
        <Card3D delay={3}>
          <Stack gap="lg">
            <Title order={3} size="h4" c="white" fw={600} ta="center">
              Выберите желаемое количество дней
            </Title>
            
            <Box>
              <Group gap="md" justify="center" style={{ flexWrap: 'wrap' }}>
                {pricingPlans.map((plan, index) => (
                  <motion.div
                    key={plan.days}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Box
                      onClick={() => handlePlanSelect(plan.days)}
                      style={{
                        position: 'relative',
                        padding: '16px 20px',
                        borderRadius: '16px',
                        background: selectedPlan === plan.days
                          ? 'linear-gradient(135deg, #8b5cf6, #ec4899)'
                          : 'rgba(39, 39, 42, 0.8)',
                        border: selectedPlan === plan.days
                          ? '2px solid rgba(255, 255, 255, 0.3)'
                          : '2px solid rgba(113, 113, 122, 0.3)',
                        boxShadow: selectedPlan === plan.days
                          ? '0 15px 35px rgba(139, 92, 246, 0.4)'
                          : '0 8px 20px rgba(0, 0, 0, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        minWidth: plan.days.length > 1 ? '80px' : '60px',
                      }}
                    >
                      {plan.popular && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          style={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            background: '#f59e0b',
                            borderRadius: '50%',
                            width: 24,
                            height: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.5)',
                          }}
                        >
                          <IconStar size={12} color="white" />
                        </motion.div>
                      )}
                      
                      <Stack align="center" gap="xs">
                        <Text 
                          size="lg" 
                          fw={700} 
                          c={selectedPlan === plan.days ? 'white' : 'gray.3'}
                          style={{
                            textShadow: selectedPlan === plan.days ? '0 2px 4px rgba(0, 0, 0, 0.5)' : 'none'
                          }}
                        >
                          {plan.days}
                        </Text>
                        <Text 
                          size="xs" 
                          c={selectedPlan === plan.days ? 'gray.1' : 'dimmed'}
                          style={{
                            textShadow: selectedPlan === plan.days ? '0 1px 2px rgba(0, 0, 0, 0.5)' : 'none'
                          }}
                        >
                          {plan.days === '1' ? 'день' : 'дней'}
                        </Text>
                      </Stack>
                    </Box>
                  </motion.div>
                ))}
              </Group>
            </Box>
          </Stack>
        </Card3D>

        {/* Способы оплаты */}
        <Card3D delay={4}>
          <Stack gap="lg">
            <Title order={3} size="h4" c="white" fw={600} ta="center">
              Выберите способ оплаты ниже 👇
            </Title>
            
            <Group gap="md" grow>
              {paymentMethods.map((method, index) => {
                const isSelected = paymentMethod === method.id;
                const IconComponent = method.icon;
                
                return (
                  <motion.div
                    key={method.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Box
                      onClick={() => handlePaymentSelect(method.id)}
                      style={{
                        padding: '20px',
                        borderRadius: '16px',
                        background: isSelected 
                          ? `linear-gradient(135deg, ${method.color}40, ${method.color}20)`
                          : 'rgba(39, 39, 42, 0.8)',
                        border: isSelected 
                          ? `2px solid ${method.color}80`
                          : '2px solid rgba(113, 113, 122, 0.3)',
                        boxShadow: isSelected 
                          ? `0 15px 35px ${method.color}30`
                          : '0 8px 20px rgba(0, 0, 0, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Stack align="center" gap="md">
                        <IconComponent 
                          size={32} 
                          color={isSelected ? method.color : '#8b5cf6'} 
                        />
                        <Text 
                          size="md" 
                          fw={700} 
                          c={isSelected ? 'white' : 'gray.3'}
                          ta="center"
                        >
                          {method.name}
                        </Text>
                        
                        {selectedPlanData && (
                          <Text 
                            size="xl" 
                            fw={700} 
                            c={method.color}
                            ta="center"
                          >
                            {method.id === 'stars' 
                              ? `${selectedPlanData.stars} ⭐`
                              : `${selectedPlanData.price} ₽`
                            }
                          </Text>
                        )}
                      </Stack>
                    </Box>
                  </motion.div>
                );
              })}
            </Group>
          </Stack>
        </Card3D>

        {/* Кнопка покупки */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={handlePurchase}
            size="xl"
            radius="xl"
            variant="gradient"
            gradient={{ from: 'violet', to: 'pink', deg: 135 }}
            fullWidth
            style={{
              height: '60px',
              fontSize: '18px',
              fontWeight: 700,
              boxShadow: '0 15px 35px rgba(139, 92, 246, 0.4), 0 0 20px rgba(139, 92, 246, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
            }}
            leftSection={
              paymentMethod === 'stars' ? (
                <IconStar size={24} />
              ) : (
                <IconCreditCard size={24} />
              )
            }
          >
            {selectedPlanData && (
              <>
                Приобрести {' '}
                {paymentMethod === 'stars' 
                  ? `${selectedPlanData.stars} ⭐`
                  : `${selectedPlanData.price} ₽`
                }
              </>
            )}
          </Button>
        </motion.div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <Box
            style={{
              padding: '16px',
              borderRadius: '12px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
            }}
          >
            <Text size="sm" c="blue.3" ta="center">
              💡 После оплаты подписка активируется автоматически
            </Text>
          </Box>
        </motion.div>
      </Stack>

      {/* Улучшенное модальное окно ввода email */}
      <Modal
        opened={showEmailModal}
        onClose={handleCloseModals}
        title={
          <Group gap="sm" justify="center">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <IconMail size={24} color="#3b82f6" />
            </motion.div>
            <Text>Способ получения чека</Text>
          </Group>
        }
        centered
        size="md"
        styles={modalStyles}
        overlayProps={{
          backgroundOpacity: 0.6, // Усилил затемнение
          blur: 5, // Размытие заднего фона - не влияет на модальное окно
        }}
        transitionProps={{ duration: 200 }} // Быстрые переходы
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }} // Быстрая анимация
        >
              <Stack gap="xl">
                {/* Заголовок с иконкой */}
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(99, 102, 241, 0.15))',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      borderRadius: '12px',
                      padding: '16px',
                      textAlign: 'center',
                    }}
                  >
                    <Text size="md" c="blue.3" fw={600}>
                      📧 Введите email для получения чека
                    </Text>
                  </Box>
                </motion.div>
                
                {/* Поле ввода email */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box
                    style={{
                      background: 'rgba(39, 39, 42, 1)', // Полностью непрозрачный
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '12px',
                      padding: '20px',
                    }}
                  >
                    <TextInput
                      placeholder="your-email@example.com"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      leftSection={<IconMail size={18} color="#8b5cf6" />}
                      size="lg"
                      radius="md"
                      error={emailError}
                      styles={{
                        input: {
                          background: 'rgba(25, 25, 30, 1)', // Полностью непрозрачный
                          border: emailError 
                            ? '2px solid rgba(239, 68, 68, 0.6)' 
                            : '2px solid rgba(139, 92, 246, 0.4)',
                          color: '#ffffff',
                          fontSize: '16px',
                          fontWeight: 500,
                          '&::placeholder': {
                            color: '#9ca3af',
                          },
                          '&:focus': {
                            borderColor: emailError ? '#ef4444' : '#8b5cf6',
                            boxShadow: emailError 
                              ? '0 0 0 3px rgba(239, 68, 68, 0.2)'
                              : '0 0 0 3px rgba(139, 92, 246, 0.2)',
                            background: 'rgba(25, 25, 30, 1)',
                          }
                        },
                        error: {
                          color: '#f87171',
                          fontSize: '14px',
                          fontWeight: 500,
                          marginTop: '8px',
                        }
                      }}
                    />
                  </Box>
                </motion.div>
                
                {/* Информация */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Stack gap="md">
                    <Box
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(34, 197, 94, 0.1))',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                      }}
                    >
                      <Group gap="xs">
                        <Text size="sm" c="green.3" fw={500}>
                          Ваши данные защищены и не передаются третьим лицам
                        </Text>
                      </Group>
                    </Box>
                    
                    {/* Подсказка для email */}
                    {email && !isEmailValid && !emailError && (
                      <Box
                        style={{
                          padding: '12px',
                          borderRadius: '8px',
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                        }}
                      >
                        <Text size="xs" c="blue.3" fw={500}>
                          💡 Пример: name@domain.com
                        </Text>
                      </Box>
                    )}
                  </Stack>
                </motion.div>
                
                {/* Кнопки */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Group gap="md" justify="flex-end">
                    <Button 
                      variant="subtle" 
                      color="gray" 
                      onClick={handleCloseModals}
                      size="md"
                      styles={{
                        root: {
                          color: '#9ca3af',
                          fontWeight: 600,
                          '&:hover': {
                            backgroundColor: 'rgba(156, 163, 175, 0.1)',
                          }
                        }
                      }}
                    >
                      Отмена
                    </Button>
                    <Button 
                      variant="gradient"
                      gradient={{ from: 'blue', to: 'cyan' }}
                      onClick={handleEmailSubmit}
                      disabled={!isEmailValid}
                      size="md"
                      leftSection={<IconSparkles size={18} />}
                      styles={{
                        root: {
                          fontWeight: 700,
                          fontSize: '16px',
                          boxShadow: isEmailValid 
                            ? '0 8px 20px rgba(59, 130, 246, 0.3)' 
                            : 'none',
                          opacity: isEmailValid ? 1 : 0.6,
                        }
                      }}
                    >
                      Продолжить
                    </Button>
                  </Group>
                </motion.div>
              </Stack>
            </motion.div>
          </Modal>

      {/* Улучшенное модальное окно подтверждения */}
      <Modal
        opened={showConfirmModal}
        onClose={handleCloseModals}
        title={
          <Group gap="sm" justify="center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {paymentMethod === 'stars' ? (
                <IconStar size={24} color="#f59e0b" />
              ) : (
                <IconCreditCard size={24} color="#3b82f6" />
              )}
            </motion.div>
            <Text>Подтверждение покупки</Text>
          </Group>
        }
        centered
        size="md"
        styles={modalStyles}
        overlayProps={{
          backgroundOpacity: 0.6, // Усилил затемнение
          blur: 5, // Размытие заднего фона - не влияет на модальное окно
        }}
        transitionProps={{ duration: 200 }} // Быстрые переходы
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }} // Быстрая анимация
        >
              <Stack gap="xl">
                {/* Информация о покупке */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(168, 85, 247, 0.15))',
                      border: '2px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '16px',
                      padding: '24px',
                      backgroundColor: '#1a1b23', // Базовый непрозрачный фон
                    }}
                  >
                    <Stack gap="lg">
                      {/* Email информация */}
                      {paymentMethod === 'bank' && email && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Group justify="space-between" align="center">
                            <Group gap="xs">
                              <IconMail size={16} color="#8b5cf6" />
                              <Text size="sm" c="gray.4" fw={500}>Email:</Text>
                            </Group>
                            <Text size="sm" c="white" fw={600}>{email}</Text>
                          </Group>
                        </motion.div>
                      )}
                      
                      {/* Тариф информация */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Group justify="space-between" align="center">
                          <Group gap="xs">
                            <IconCrown size={16} color="#f59e0b" />
                            <Text size="sm" c="gray.4" fw={500}>Тариф:</Text>
                          </Group>
                          <Group gap="xs">
                            <Text size="md" c="white" fw={600}>
                              {selectedPlanData?.days} {selectedPlanData?.days === '1' ? 'день' : 'дней'}
                            </Text>
                            <Text 
                              size="lg" 
                              c={paymentMethod === 'stars' ? '#f59e0b' : '#3b82f6'} 
                              fw={700}
                            >
                              {paymentMethod === 'stars' 
                                ? `${selectedPlanData?.stars} ⭐`
                                : `${selectedPlanData?.price} ₽`
                              }
                            </Text>
                          </Group>
                        </Group>
                      </motion.div>
                    </Stack>
                  </Box>
                </motion.div>
                
                {/* Согласие */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box
                    style={{
                      background: 'rgba(39, 39, 42, 1)', // Полностью непрозрачный
                      border: '1px solid rgba(113, 113, 122, 0.3)',
                      borderRadius: '12px',
                      padding: '20px',
                    }}
                  >
                    <Checkbox
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.currentTarget.checked)}
                      label={
                        <Text size="sm" c="white" fw={500}>
                          ✅ Оформляя тариф, я даю согласие на обработку персональных данных и соглашаюсь с условиями{' '}
                          <Text span c="blue.3" fw={600} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                            публичной оферты
                          </Text>
                        </Text>
                      }
                      styles={{
                        input: {
                          backgroundColor: 'transparent',
                          borderColor: '#8b5cf6',
                          borderWidth: '2px',
                          '&:checked': {
                            backgroundColor: '#8b5cf6',
                            borderColor: '#8b5cf6',
                          }
                        },
                        label: {
                          color: '#ffffff',
                        }
                      }}
                    />
                  </Box>
                </motion.div>
                
                {/* Кнопки */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Group gap="md" justify="flex-end">
                    <Button 
                      variant="subtle" 
                      color="gray" 
                      onClick={handleCloseModals}
                      size="md"
                      styles={{
                        root: {
                          color: '#9ca3af',
                          fontWeight: 600,
                          '&:hover': {
                            backgroundColor: 'rgba(156, 163, 175, 0.1)',
                          }
                        }
                      }}
                    >
                      Отмена
                    </Button>
                    <Button 
                      variant="gradient"
                      gradient={paymentMethod === 'stars' 
                        ? { from: 'yellow', to: 'orange' }
                        : { from: 'blue', to: 'cyan' }
                      }
                      onClick={handleFinalConfirm}
                      disabled={!agreedToTerms}
                      size="md"
                      leftSection={
                        paymentMethod === 'stars' ? (
                          <IconStar size={20} />
                        ) : (
                          <IconCreditCard size={20} />
                        )
                      }
                      styles={{
                        root: {
                          fontWeight: 700,
                          fontSize: '16px',
                          boxShadow: paymentMethod === 'stars'
                            ? '0 8px 20px rgba(245, 158, 11, 0.4)'
                            : '0 8px 20px rgba(59, 130, 246, 0.4)',
                        }
                      }}
                    >
                      {paymentMethod === 'stars' ? 'Оплатить' : 'Подтвердить'}
                    </Button>
                  </Group>
                </motion.div>
              </Stack>
            </motion.div>
          </Modal>
    </>
  );
});