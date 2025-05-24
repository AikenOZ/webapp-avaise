import React, { useState, memo } from 'react';
import { Card } from '@mantine/core';
import { motion } from 'framer-motion';

export const Card3D = memo(({ children, className = "", delay = 0, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={{
        transform: `scale(${isHovered ? 1.02 : 1})`,
        transition: 'transform 0.2s ease',
      }}
      {...props}
    >
      <Card
        shadow="xl"
        padding="xl"
        radius="xl"
        style={{
          background: 'rgba(39, 39, 42, 0.7)',
          border: '1px solid rgba(113, 113, 122, 0.3)',
          boxShadow: isHovered 
            ? '0 35px 60px -12px rgba(139, 92, 246, 0.3)' 
            : '0 25px 45px -5px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.3s ease',
          borderColor: isHovered ? 'rgba(139, 92, 246, 0.5)' : 'rgba(113, 113, 122, 0.3)',
        }}
      >
        {children}
      </Card>
    </motion.div>
  );
});