import React, { memo, useState } from 'react';
import { Stack, Group, Title, Text, Box, Button, TextInput, Checkbox, Modal } from '@mantine/core';
import { IconCrown, IconStar, IconCreditCard, IconCheck, IconMail, IconShield, IconSparkles } from '@tabler/icons-react';
import { Card3D } from './ui/Card3D';
import { useLanguage } from './LanguageContext';

export const PricingSection = memo(({ hapticFeedback }) => {
  const { t, currentLanguage } = useLanguage();
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

  // Преимущества Premium с переводами
  const premiumFeatures = [
    t('subscriptionFeatures.included'),
    t('subscriptionFeatures.images'),
    t('subscriptionFeatures.voice'),
    t('subscriptionFeatures.video'),
    t('subscriptionFeatures.requests'),
    t('subscriptionFeatures.playlists'),
    t('subscriptionFeatures.context'),
    t('subscriptionFeatures.modelChoice')
  ];

  // Способы оплаты - фильтруем в зависимости от языка
  const allPaymentMethods = [
    {
      id: 'stars',
      name: t('telegramStars'),
      icon: IconStar,
      color: '#f59e0b',
      gradient: { from: 'yellow', to: 'orange' }
    },
    {
      id: 'bank',
      name: t('bankSbp'),
      icon: IconCreditCard,
      color: '#3b82f6',
      gradient: { from: 'blue', to: 'cyan' }
    }
  ];

  // Для английского языка показываем только Stars
  const paymentMethods = currentLanguage === 'en' 
    ? allPaymentMethods.filter(method => method.id === 'stars')
    : allPaymentMethods;

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError('');
    
    // Валидация email
    if (value && !value.includes('@')) {
      setEmailError(t('emailMustContainAt'));
    } else if (value && value.includes('@')) {
      const emailParts = value.split('@');
      if (emailParts.length !== 2 || !emailParts[0] || !emailParts[1]) {
        setEmailError(t('emailIncorrectFormat'));
      } else if (!emailParts[1].includes('.')) {
        setEmailError(t('emailMustContainDomain'));
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
    hapticFeedback?.('light');
  };

  const handlePaymentSelect = (methodId) => {
    setPaymentMethod(methodId);
    hapticFeedback?.('light');
  };

  const handlePurchase = () => {
    hapticFeedback?.('medium');
    
    // Для английского языка всегда используем stars (без email)
    if (paymentMethod === 'bank' && currentLanguage !== 'en') {
      setShowEmailModal(true);
    } else {
      setShowConfirmModal(true);
    }
  };

  const handleEmailSubmit = () => {
    if (!isEmailValid) {
      if (!email.trim()) {
        setEmailError(t('emailRequired'));
      }
      return;
    }
    
    hapticFeedback?.('light');
    setShowEmailModal(false);
    setShowConfirmModal(true);
  };

  const handleFinalConfirm = () => {
    hapticFeedback?.('medium');
    const plan = pricingPlans.find(p => p.days === selectedPlan);
    
    console.log('Окончательная покупка:', {
      plan: `${plan.days} ${plan.days === '1' ? t('day') : t('days')}`,
      price: paymentMethod === 'stars' ? `${plan.stars} ⭐` : `${plan.price} ₽`,
      method: paymentMethod,
      email: paymentMethod === 'bank' ? email : null,
      agreed: agreedToTerms,
      language: currentLanguage
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

  // Стили для модальных окон
  const modalStyles = {
    content: {
      background: '#1a1b23',
      border: '2px solid rgba(139, 92, 246, 0.4)',
      borderRadius: '20px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(139, 92, 246, 0.4)',
      position: 'relative',
      zIndex: 1000,
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
      background: '#1a1b23',
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
              <div className="crown-container">
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
                    animation: 'crownWiggle 2s ease-in-out infinite 3s'
                  }}
                >
                  <IconCrown size={30} color="white" />
                </Box>
              </div>
              
              <Stack align="center" gap="xs">
                <Title order={2} size="h3" c="yellow.3" fw={700}>
                  {t('ozPremium')}
                </Title>
                <Text size="sm" c="gray.3" ta="center">
                  {t('premiumPlatform')}
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
                {t('subscriptionIncludes')}
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
                  <div
                    key={index}
                    style={{
                      opacity: 0,
                      transform: 'translateX(-20px)',
                      animation: `slideInLeft 0.3s ease-out ${0.1 + index * 0.05}s forwards`
                    }}
                  >
                    <Text 
                      size="sm" 
                      c={index === 0 ? "green.3" : "gray.3"}
                      fw={index === 0 ? 700 : 500}
                    >
                      {feature}
                    </Text>
                  </div>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Card3D>

        {/* Выбор тарифного плана */}
        <Card3D delay={3}>
          <Stack gap="lg">
            <Title order={3} size="h4" c="white" fw={600} ta="center">
              {t('chooseDays')}
            </Title>
            
            <Box>
              <Group gap="md" justify="center" style={{ flexWrap: 'wrap' }}>
                {pricingPlans.map((plan, index) => (
                  <div
                    key={plan.days}
                    style={{
                      opacity: 0,
                      transform: 'scale(0.9)',
                      animation: `fadeInScale 0.3s ease-out ${0.1 + index * 0.05}s forwards`
                    }}
                    className="plan-option"
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
                      className="plan-box"
                    >
                      {plan.popular && (
                        <div
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
                            animation: 'scaleRotateIn 0.5s ease-out'
                          }}
                        >
                          <IconStar size={12} color="white" />
                        </div>
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
                          {plan.days === '1' ? t('day') : t('days')}
                        </Text>
                      </Stack>
                    </Box>
                  </div>
                ))}
              </Group>
            </Box>
          </Stack>
        </Card3D>

        {/* Способы оплаты */}
        <Card3D delay={4}>
          <Stack gap="lg">
            <Title order={3} size="h4" c="white" fw={600} ta="center">
              {t('choosePayment')}
            </Title>
            
            {/* Показываем один или два способа в зависимости от языка */}
            {paymentMethods.length === 1 ? (
              <Group justify="center">
                {paymentMethods.map((method, index) => {
                  const isSelected = paymentMethod === method.id;
                  const IconComponent = method.icon;
                  
                  return (
                    <div
                      key={method.id}
                      style={{
                        opacity: 0,
                        transform: 'translate3d(20px)',
                        animation: `fadeInUp 0.3s ease-out ${0.1 + index * 0.1}s forwards`,
                        maxWidth: '300px',
                        width: '100%'
                      }}
                      className="payment-option"
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
                        className="payment-box"
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
                    </div>
                  );
                })}
              </Group>
            ) : (
              <Group gap="md" grow>
                {paymentMethods.map((method, index) => {
                  const isSelected = paymentMethod === method.id;
                  const IconComponent = method.icon;
                  
                  return (
                    <div
                      key={method.id}
                      style={{
                        opacity: 0,
                        transform: 'translate3d(20px)',
                        animation: `fadeInUp 0.3s ease-out ${0.1 + index * 0.1}s forwards`
                      }}
                      className="payment-option"
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
                        className="payment-box"
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
                    </div>
                  );
                })}
              </Group>
            )}
          </Stack>
        </Card3D>

        {/* Кнопка покупки */}
        <div
          style={{
            opacity: 0,
            transform: 'translate3d(30px)',
            animation: 'fadeInUp 0.4s ease-out 0.6s forwards'
          }}
          className="purchase-button"
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
              transition: 'transform 0.2s ease',
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
                {t('purchase')} {' '}
                {paymentMethod === 'stars' 
                  ? `${selectedPlanData.stars} ⭐`
                  : `${selectedPlanData.price} ₽`
                }
              </>
            )}
          </Button>
        </div>

        {/* Дополнительная информация */}
        <div
          style={{
            opacity: 0,
            animation: 'fadeIn 0.4s ease-out 0.8s forwards'
          }}
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
              {t('autoActivation')}
            </Text>
          </Box>
        </div>
      </Stack>

      {/* Модальное окно ввода email */}
      <Modal
        opened={showEmailModal}
        onClose={handleCloseModals}
        title={
          <Group gap="sm" justify="center">
            <div className="rotating-mail-icon">
              <IconMail size={24} color="#3b82f6" />
            </div>
            <Text>{t('receiptMethod')}</Text>
          </Group>
        }
        centered
        size="md"
        styles={modalStyles}
        overlayProps={{
          backgroundOpacity: 0.6,
        }}
        transitionProps={{ duration: 200 }}
      >
        <div className="modal-content">
          <Stack gap="xl">
            <div className="email-header">
              <Box
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(99, 102, 241, 0.15))',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center',
                  animation: 'fadeInScale 0.2s ease-out'
                }}
              >
                <Text size="md" c="blue.3" fw={600}>
                  {t('enterEmail')}
                </Text>
              </Box>
            </div>
            
            <div className="email-input">
              <Box
                style={{
                  background: 'rgba(39, 39, 42, 1)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '12px',
                  padding: '20px',
                  animation: 'fadeIn 0.2s ease-out 0.1s both'
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
                      background: 'rgba(25, 25, 30, 1)',
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
            </div>
            
            <div className="email-info">
              <Stack gap="md">
                <Box
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(34, 197, 94, 0.1))',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    animation: 'fadeIn 0.2s ease-out 0.2s both'
                  }}
                >
                  <Group gap="xs">
                    <Text size="sm" c="green.3" fw={500}>
                      {t('dataProtected')}
                    </Text>
                  </Group>
                </Box>
                
                {email && !isEmailValid && !emailError && (
                  <Box
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      animation: 'fadeIn 0.2s ease-out'
                    }}
                  >
                    <Text size="xs" c="blue.3" fw={500}>
                      {t('emailExample')}
                    </Text>
                  </Box>
                )}
              </Stack>
            </div>
            
            <div className="email-buttons">
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
                  {t('cancel')}
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
                  {t('continue')}
                </Button>
              </Group>
            </div>
          </Stack>
        </div>
      </Modal>

      {/* Модальное окно подтверждения */}
      <Modal
        opened={showConfirmModal}
        onClose={handleCloseModals}
        title={
          <Group gap="sm" justify="center">
            <div className="pulsing-icon">
              {paymentMethod === 'stars' ? (
                <IconStar size={24} color="#f59e0b" />
              ) : (
                <IconCreditCard size={24} color="#3b82f6" />
              )}
            </div>
            <Text>{t('purchaseConfirmation')}</Text>
          </Group>
        }
        centered
        size="md"
        styles={modalStyles}
        overlayProps={{
          backgroundOpacity: 0.6,
        }}
        transitionProps={{ duration: 200 }}
      >
        <div className="modal-content">
          <Stack gap="xl">
            <div className="purchase-info">
              <Box
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(168, 85, 247, 0.15))',
                  border: '2px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '16px',
                  padding: '24px',
                  backgroundColor: '#1a1b23',
                  animation: 'fadeIn 0.2s ease-out'
                }}
              >
                <Stack gap="lg">
                  {paymentMethod === 'bank' && email && currentLanguage !== 'en' && (
                    <div style={{ animation: 'fadeIn 0.2s ease-out' }}>
                      <Group justify="space-between" align="center">
                        <Group gap="xs">
                          <IconMail size={16} color="#8b5cf6" />
                          <Text size="sm" c="gray.4" fw={500}>{t('email')}</Text>
                        </Group>
                        <Text size="sm" c="white" fw={600}>{email}</Text>
                      </Group>
                    </div>
                  )}
                  
                  <div style={{ animation: 'fadeIn 0.2s ease-out 0.1s both' }}>
                    <Group justify="space-between" align="center">
                      <Group gap="xs">
                        <IconCrown size={16} color="#f59e0b" />
                        <Text size="sm" c="gray.4" fw={500}>{t('tariff')}</Text>
                      </Group>
                      <Group gap="xs">
                        <Text size="md" c="white" fw={600}>
                          {selectedPlanData?.days} {selectedPlanData?.days === '1' ? t('day') : t('days')}
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
                  </div>
                </Stack>
              </Box>
            </div>
            
            <div className="agreement-section">
              <Box
                style={{
                  background: 'rgba(39, 39, 42, 1)',
                  border: '1px solid rgba(113, 113, 122, 0.3)',
                  borderRadius: '12px',
                  padding: '20px',
                  animation: 'fadeIn 0.2s ease-out 0.2s both'
                }}
              >
                <Checkbox
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.currentTarget.checked)}
                  label={
                    <Text size="sm" c="white" fw={500}>
                      {t('agreement')}{' '}
                      <Text span c="blue.3" fw={600} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                        {t('publicOffer')}
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
            </div>
            
            <div className="confirm-buttons">
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
                  {t('cancel')}
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
                  {paymentMethod === 'stars' ? t('pay') : t('confirm')}
                </Button>
              </Group>
            </div>
          </Stack>
        </div>
      </Modal>

      {/* CSS анимации */}
      <style jsx>{`
        @keyframes crownWiggle {
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
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
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
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleRotateIn {
          from {
            transform: scale(0) rotate(-180deg);
          }
          to {
            transform: scale(1) rotate(0deg);
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        .plan-option:hover .plan-box {
          transform: scale(1.02);
        }
        
        .plan-option:active .plan-box {
          transform: scale(0.98);
        }
        
        .payment-option:hover .payment-box {
          transform: scale(1.01);
        }
        
        .payment-option:active .payment-box {
          transform: scale(0.99);
        }
        
        .purchase-button:hover button {
          transform: scale(1.01);
        }
        
        .purchase-button:active button {
          transform: scale(0.99);
        }
        
        .rotating-mail-icon {
          animation: spin 8s linear infinite;
        }
        
        .pulsing-icon {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .modal-content {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
});