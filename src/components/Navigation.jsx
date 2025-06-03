import React, { memo } from 'react';
import { Box, Container, Tabs, Text } from '@mantine/core';
import { IconUser, IconSettings, IconCreditCard } from '@tabler/icons-react';

export const Navigation = memo(({ activeTab, onChange }) => (
  <Box
    style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(10, 10, 15, 0.95)',
      borderTop: '1px solid rgba(139, 92, 246, 0.4)',
      zIndex: 50,
      boxShadow: '0 -20px 40px rgba(0, 0, 0, 0.3)',
    }}
  >
    <Container size="sm" p={0}>
      <Tabs 
        value={activeTab} 
        onChange={onChange}
        variant="pills"
        styles={{
          list: {
            background: 'transparent',
            padding: '20px 16px',
            justifyContent: 'space-around',
            gap: '8px',
          },
          tab: {
            border: 'none',
            background: 'transparent',
            color: 'var(--mantine-color-dimmed)',
            padding: '14px 20px',
            borderRadius: '20px',
            transition: 'all 0.3s ease',
            minWidth: '80px',
            '&[data-active]': {
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.4))',
              color: 'var(--mantine-color-violet-3)',
              boxShadow: '0 10px 35px rgba(139, 92, 246, 0.4)',
              transform: 'translate3d(-1px)', // Уменьшили для избежания размытия
              border: '1px solid rgba(255, 255, 255, 0.2)',
            },
            '&:hover:not([data-active])': {
              background: 'rgba(139, 92, 246, 0.15)',
              transform: 'translate3d(-1px)', // Уменьшили для избежания размытия
            }
          }
        }}
      >
        <Tabs.List>
          <Tabs.Tab 
            value="profile" 
            leftSection={<IconUser size={20} />}
          >
            <Text size="xs" fw={600}>Профиль</Text>
          </Tabs.Tab>
          <Tabs.Tab 
            value="settings" 
            leftSection={<IconSettings size={20} />}
          >
            <Text size="xs" fw={600}>Настройки</Text>
          </Tabs.Tab>
          <Tabs.Tab 
            value="subscription" 
            leftSection={<IconCreditCard size={20} />}
          >
            <Text size="xs" fw={600}>Подписка</Text>
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </Container>
  </Box>
));