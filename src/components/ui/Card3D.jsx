import React, { useState, memo } from 'react';
import { Card } from '@mantine/core';

export const Card3D = memo(({ children, className = "", delay = 0, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={{
        opacity: 0,
        // ИСПРАВЛЕНО: используем translate3d вместо translate3d
        transform: 'translate3d(0, 20px, 0)',
        animation: `cardAppear 0.3s ease-out ${delay * 0.1}s forwards`,
        // ДОБАВЛЕНО: принудительное аппаратное ускорение
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        perspective: '1000px',
      }}
      {...props}
    >
      <Card
        shadow="xl"
        padding="xl"
        radius="xl"
        style={{
          background: 'rgba(39, 39, 42, 0.9)',
          border: '1px solid rgba(113, 113, 122, 0.3)',
          boxShadow: isHovered 
            ? '0 15px 30px rgba(139, 92, 246, 0.2)' 
            : '0 8px 20px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.2s ease',
          borderColor: isHovered ? 'rgba(139, 92, 246, 0.5)' : 'rgba(113, 113, 122, 0.3)',
          // ИСПРАВЛЕНО: убираем scale при ховере (он вызывает размытие)
          // transform: `scale(${isHovered ? 1.005 : 1})`,
          transform: 'translate3d(0, 0, 0)', // принудительное GPU ускорение
          // ДОБАВЛЕНО: отключение фильтров
          filter: 'none',
          backdropFilter: 'none',
          // ДОБАВЛЕНО: четкое позиционирование
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      >
        {children}
      </Card>

      <style jsx>{`
        @keyframes cardAppear {
          from {
            opacity: 0;
            /* ИСПРАВЛЕНО: используем translate3d */
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            /* ИСПРАВЛЕНО: используем translate3d */
            transform: translate3d(0, 0, 0);
          }
        }
        
        /* ДОБАВЛЕНО: принудительное отключение размытия для всех вложенных элементов */
        .card3d, .card3d * {
          filter: none !important;
          backdrop-filter: none !important;
          will-change: transform, opacity;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
});