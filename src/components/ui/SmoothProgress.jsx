import React, { memo } from 'react';
import { Box, Group, Text, ThemeIcon, Progress } from '@mantine/core';

export const SmoothProgress = memo(({ value, color, label, icon: Icon, delay = 0 }) => {
  return (
    <div
      style={{
        opacity: 0,
        transform: 'translateX(-20px)',
        animation: `slideInProgress 0.3s ease-out ${delay * 0.05}s forwards`
      }}
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
              animation: `progressFill 1s ease-out ${delay * 0.05 + 0.2}s both`
            }
          })}
        />
      </Box>

      <style jsx>{`
        @keyframes slideInProgress {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes progressFill {
          from {
            transform: scaleX(0);
            transform-origin: left;
          }
          to {
            transform: scaleX(1);
            transform-origin: left;
          }
        }
      `}</style>
    </div>
  );
});