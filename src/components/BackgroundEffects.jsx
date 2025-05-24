import React, { memo } from 'react';
import { Box } from '@mantine/core';

export const BackgroundEffects = memo(() => (
  <>
    {/* Основные цветные блики */}
    <Box
      style={{
        position: 'fixed',
        top: '-250px',
        right: '-200px',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(99, 102, 241, 0.08) 40%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        zIndex: 0,
        animation: 'float 8s ease-in-out infinite',
      }}
    />
    <Box
      style={{
        position: 'fixed',
        bottom: '-250px',
        left: '-200px',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.10) 0%, rgba(16, 185, 129, 0.06) 40%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        zIndex: 0,
        animation: 'float 10s ease-in-out infinite reverse',
      }}
    />
    
    {/* Дополнительные световые акценты */}
    <Box
      style={{
        position: 'fixed',
        top: '30%',
        left: '-100px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 60%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 0,
        animation: 'pulse 6s ease-in-out infinite',
      }}
    />
    <Box
      style={{
        position: 'fixed',
        bottom: '20%',
        right: '-100px',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.06) 0%, rgba(251, 191, 36, 0.04) 50%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(70px)',
        zIndex: 0,
        animation: 'pulse 7s ease-in-out infinite reverse',
      }}
    />
    
    {/* Тонкие светящиеся линии */}
    <Box
      style={{
        position: 'fixed',
        top: '15%',
        left: '0',
        right: '0',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)',
        filter: 'blur(1px)',
        zIndex: 0,
        opacity: 0.5,
      }}
    />
    <Box
      style={{
        position: 'fixed',
        bottom: '25%',
        left: '0',
        right: '0',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.25), transparent)',
        filter: 'blur(1px)',
        zIndex: 0,
        opacity: 0.4,
      }}
    />
    
    {/* Декоративные элементы в углах */}
    <Box
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100px',
        height: '100px',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), transparent)',
        zIndex: 0,
      }}
    />
    <Box
      style={{
        position: 'fixed',
        bottom: '0',
        right: '0',
        width: '100px',
        height: '100px',
        background: 'linear-gradient(315deg, rgba(236, 72, 153, 0.08), transparent)',
        zIndex: 0,
      }}
    />
  </>
));