// Purple drag effect for tab bar
(function() {
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let hasMoved = false;
  
  // Add drag event listeners
  document.addEventListener('mousedown', function(e) {
    // Only apply drag effect to draggable elements or if explicitly marked
    const isDraggable = e.target.draggable === true || 
                       e.target.closest('[draggable="true"]') !== null ||
                       e.target.classList.contains('drag-handle');
    
    if (!isDraggable) {
      return; // Don't apply drag effect to regular clicks
    }
    
    isDragging = true;
    hasMoved = false;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    document.documentElement.classList.add('dragging');
  });
  
  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      // Check if mouse has moved significantly (more than 5px)
      const deltaX = Math.abs(e.clientX - dragStartX);
      const deltaY = Math.abs(e.clientY - dragStartY);
      
      if (deltaX > 5 || deltaY > 5) {
        hasMoved = true;
        // Only add highlight if actually dragging
        const target = document.elementFromPoint(e.clientX, e.clientY);
        if (target && !target.classList.contains('drag-highlight')) {
          target.classList.add('drag-highlight');
        }
      }
    }
  });
  
  document.addEventListener('mouseup', function(e) {
    if (isDragging) {
    isDragging = false;
    document.documentElement.classList.remove('dragging');
    
    // Remove purple highlight from all elements
    document.querySelectorAll('.drag-highlight').forEach(el => {
      el.classList.remove('drag-highlight');
    });
    }
    hasMoved = false;
  });
  
  document.addEventListener('mouseleave', function(e) {
    if (isDragging) {
      isDragging = false;
      document.documentElement.classList.remove('dragging');
      
      // Remove purple highlight from all elements
      document.querySelectorAll('.drag-highlight').forEach(el => {
        el.classList.remove('drag-highlight');
      });
    }
    hasMoved = false;
  });
  
  // Handle native HTML5 drag events
  document.addEventListener('dragstart', function(e) {
    if (e.target.draggable === true) {
      e.target.classList.add('drag-highlight');
    }
  });
  
  document.addEventListener('dragend', function(e) {
    if (e.target) {
      e.target.classList.remove('drag-highlight');
    }
  });
})();
