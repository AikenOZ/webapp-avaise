import React, { useRef, useEffect, useCallback } from 'react';
import { Box } from '@mantine/core';

export const AnimatedBackground = React.memo(() => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const nodesRef = useRef([]);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  class Node {
    constructor(width, height) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8; // Еще медленнее
      this.vy = (Math.random() - 0.5) * 0.8;
      this.size = Math.random() * 4 + 8; // Меньший размер шрифта (8-12px)
      this.opacity = Math.random() * 0.2 + 0.15; // Более прозрачные (0.15-0.35)
      this.rotation = Math.random() * 360; // Начальный поворот
      this.rotationSpeed = (Math.random() - 0.5) * 1; // Медленнее вращение
      this.text = 'OZ'; // Текст для отображения
      this.pulsePhase = Math.random() * Math.PI * 2; // Фаза пульсации
    }
    
    update(width, height) {
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      this.pulsePhase += 0.03; // Медленнее пульсация
      
      // Отскок от границ
      if (this.x < 30 || this.x > width - 30) this.vx *= -1;
      if (this.y < 30 || this.y > height - 30) this.vy *= -1;
      
      // Корректировка позиции если вышла за границы
      this.x = Math.max(30, Math.min(width - 30, this.x));
      this.y = Math.max(30, Math.min(height - 30, this.y));
    }
    
    draw(ctx) {
      ctx.save();
      
      // Перемещаемся к позиции узла
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      
      // Эффект пульсации (более тонкий)
      const pulse = Math.sin(this.pulsePhase) * 0.15 + 1;
      const currentSize = this.size * pulse;
      
      // Настройки текста (более тонкий шрифт)
      ctx.font = `300 ${currentSize}px Arial, sans-serif`; // 300 = light weight
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Более тонкий светящийся эффект
      ctx.shadowColor = `rgba(139, 92, 246, ${this.opacity * 0.6})`;
      ctx.shadowBlur = currentSize * 0.4; // Меньший blur
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      // Основной текст с градиентом (более тонкий)
      const gradient = ctx.createLinearGradient(
        -currentSize/2, -currentSize/3,
        currentSize/2, currentSize/3
      );
      gradient.addColorStop(0, `rgba(139, 92, 246, ${this.opacity * 0.8})`);
      gradient.addColorStop(0.5, `rgba(168, 85, 247, ${this.opacity})`);
      gradient.addColorStop(1, `rgba(99, 102, 241, ${this.opacity * 0.7})`);
      
      ctx.fillStyle = gradient;
      ctx.fillText(this.text, 0, 0);
      
      // Убираем тень
      ctx.shadowBlur = 0;
      
      // Очень тонкая белая обводка
      ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.2})`;
      ctx.lineWidth = 0.3;
      ctx.strokeText(this.text, 0, 0);
      
      ctx.restore();
    }

    scale(scaleX, scaleY) {
      this.x *= scaleX;
      this.y *= scaleY;
    }
  }

  const initializeNodes = useCallback((width, height) => {
    const numNodes = Math.min(20, Math.floor((width * height) / 25000)); // Еще меньше узлов
    nodesRef.current = [];
    
    for (let i = 0; i < numNodes; i++) {
      nodesRef.current.push(new Node(width, height));
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = dimensionsRef.current;
    
    // Очищаем canvas
    ctx.clearRect(0, 0, width, height);
    
    const nodes = nodesRef.current;
    const connectionDistance = 140; // Немного больше для букв
    
    // Обновляем и рисуем узлы
    nodes.forEach(node => {
      node.update(width, height);
      node.draw(ctx);
    });
    
    // Рисуем соединения между узлами
    ctx.beginPath();
    ctx.lineWidth = 1;
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          // Градиентная линия
          const gradient = ctx.createLinearGradient(
            nodes[i].x, nodes[i].y,
            nodes[j].x, nodes[j].y
          );
          
          const opacity = (1 - distance / connectionDistance) * 0.15;
          gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity})`);
          gradient.addColorStop(0.5, `rgba(168, 85, 247, ${opacity * 1.2})`);
          gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity})`);
          
          ctx.strokeStyle = gradient;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
        }
      }
    }
    ctx.stroke();
    
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const { width: newWidth, height: newHeight } = rect;
    
    // Используем devicePixelRatio для четкости на ретина дисплеях
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = newWidth;
    const displayHeight = newHeight;
    const canvasWidth = displayWidth * dpr;
    const canvasHeight = displayHeight * dpr;
    
    // Устанавливаем реальный размер в памяти (масштабированный)
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    // Масштабируем canvas обратно с помощью CSS
    canvas.style.width = displayWidth + 'px';
    canvas.style.height = displayHeight + 'px';
    
    // Масштабируем контекст для соответствия device pixel ratio
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    
    const oldDimensions = dimensionsRef.current;
    
    // Масштабируем существующие узлы при изменении размера
    if (oldDimensions.width > 0 && oldDimensions.height > 0 && nodesRef.current.length > 0) {
      const scaleX = displayWidth / oldDimensions.width;
      const scaleY = displayHeight / oldDimensions.height;
      
      nodesRef.current.forEach(node => {
        node.scale(scaleX, scaleY);
      });
    }
    
    // Обновляем размеры
    dimensionsRef.current = { width: displayWidth, height: displayHeight };
    
    // Инициализируем узлы если их еще нет
    if (nodesRef.current.length === 0) {
      initializeNodes(displayWidth, displayHeight);
    }
  }, [initializeNodes]);

  useEffect(() => {
    updateCanvasSize();
    
    // Обработчик изменения размера окна с debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateCanvasSize, 250);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Запускаем анимацию
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(resizeTimeout);
    };
  }, [animate, updateCanvasSize]);

  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.5, // Уменьшил общую прозрачность фона
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </Box>
  );
});