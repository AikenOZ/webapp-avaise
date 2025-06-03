import React, { memo } from 'react';
import { Button } from '@mantine/core';

export const UltraButton = memo(({ children, gradient, onClick, icon: Icon, ...props }) => {
  return (
    <div className="ultra-button-wrapper">
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
          transition: 'all 0.2s ease',
        }}
        className="ultra-button"
        {...props}
      >
        {children}
      </Button>

      <style jsx>{`
        .ultra-button-wrapper:hover .ultra-button {
          transform: scale(1.01);
          box-shadow: 0 15px 40px rgba(139, 92, 246, 0.4);
        }
        
        .ultra-button-wrapper:active .ultra-button {
          transform: scale(0.99);
        }
        
        .ultra-button {
          transition: all 0.1s ease;
        }
      `}</style>
    </div>
  );
});