import React, { memo } from 'react';
import { Stack, Group, Title, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconSparkles } from '@tabler/icons-react';

export const Header = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Stack align="center" gap="xs">
      <Group gap="xs" align="center">
        <IconSparkles size={32} color="#8b5cf6" />
        <Title
          order={1}
          size="h1"
          ta="center"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          
        </Title>
      </Group>
      <Text size="sm" c="dimmed" ta="center">
        OZ Avaise • Премиум AI Платформа
      </Text>
    </Stack>
  </motion.div>
));