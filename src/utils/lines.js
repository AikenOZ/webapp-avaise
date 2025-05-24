$(document).ready(function() {
  const $heroSection = $('.hero-section');
  let width = $heroSection.width();
  let height = $heroSection.height();
  
  const $canvas = $('<canvas>').attr({
    width: width,
    height: height
  }).css({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0
  });
  
  $heroSection.prepend($canvas);
  const ctx = $canvas[0].getContext('2d');
  
  const nodes = [];
  const numNodes = 50;
  const connectionDistance = 150;
  
  class Node {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.radius = Math.random() * 3 + 4;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    
    draw() {
      ctx.font = 'bold ' + (this.radius * 2) + 'px Arial';
      ctx.fillStyle = 'rgba(0, 183, 255, 0.5)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('G', this.x, this.y);
    }

    // Добавляем метод для масштабирования позиции
    scale(scaleX, scaleY) {
      this.x *= scaleX;
      this.y *= scaleY;
    }
  }
  
  // Создаем узлы
  for (let i = 0; i < numNodes; i++) {
    nodes.push(new Node());
  }
  
  // Оптимизированная функция анимации
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Обновляем и рисуем узлы
    nodes.forEach(node => {
      node.update();
      node.draw();
    });
    
    // Рисуем соединения
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 183, 255, 0.2)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
        }
      }
    }
    ctx.stroke();
    
    requestAnimationFrame(animate);
  }
  
  // Обработчик изменения размера окна
  $(window).on('resize', _.debounce(() => {
    const newWidth = $heroSection.width();
    const newHeight = $heroSection.height();
    
    // Вычисляем коэффициенты масштабирования
    const scaleX = newWidth / width;
    const scaleY = newHeight / height;
    
    // Обновляем размеры канваса
    $canvas.attr({
      width: newWidth,
      height: newHeight
    });
    
    // Масштабируем позиции всех узлов
    nodes.forEach(node => {
      node.scale(scaleX, scaleY);
    });
    
    // Обновляем глобальные переменные
    width = newWidth;
    height = newHeight;
  }, 250));
  
  animate();
});