import React, { memo } from 'react';
import { Button } from '@mantine/core';
import { motion } from 'framer-motion';

export const UltraButton = memo(({ children, gradient, onClick, icon: Icon, ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      <Button
        size="lg"
        radius="xl"
        variant="gradient"
        gradient={gradient}
        leftSection={Icon && <Icon size={20} />}
        onClick={onClick}
        style={{
          boxShadow: '0 12px 35px rgba(139, 92, 246, 0.35)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
});