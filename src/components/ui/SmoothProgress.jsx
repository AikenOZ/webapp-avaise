import React, { memo } from 'react';
import { Box, Group, Text, ThemeIcon, Progress } from '@mantine/core';
import { motion } from 'framer-motion';

export const SmoothProgress = memo(({ value, color, label, icon: Icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 0.05, duration: 0.3 }}
    >
      <Box>
        <Group justify="space-between" mb="xs">
          <Group gap="xs">
            <ThemeIcon size="sm" variant="light" color={color} radius="xl">
              <Icon size={14} />
            </ThemeIcon>
            <Text size="sm" c="white" fw={500}>
              {label}
            </Text>
          </Group>
          <Text size="sm" c="dimmed" fw={500}>
            {value}%
          </Text>
        </Group>
        
        <Progress
          value={value}
          radius="xl"
          size="lg"
          style={{
            background: 'rgba(113, 113, 122, 0.2)',
          }}
          styles={(theme) => ({
            bar: {
              background: `linear-gradient(135deg, ${theme.colors[color][6]}, ${theme.colors[color][4]})`,
              boxShadow: `0 4px 15px ${theme.colors[color][6]}40`,
            }
          })}
        />
      </Box>
    </motion.div>
  );
});