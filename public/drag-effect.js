// Purple drag effect for tab bar
(function() {
  let isDragging = false;
  
  // Add drag event listeners
  document.addEventListener('mousedown', function(e) {
    isDragging = true;
    document.documentElement.classList.add('dragging');
    
    // Add purple highlight to the element being dragged
    if (e.target) {
      e.target.classList.add('drag-highlight');
    }
  });
  
  document.addEventListener('mouseup', function(e) {
    isDragging = false;
    document.documentElement.classList.remove('dragging');
    
    // Remove purple highlight from all elements
    document.querySelectorAll('.drag-highlight').forEach(el => {
      el.classList.remove('drag-highlight');
    });
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
  });
  
  // Handle drag over elements
  document.addEventListener('dragstart', function(e) {
    if (e.target) {
      e.target.classList.add('drag-highlight');
    }
  });
  
  document.addEventListener('dragend', function(e) {
    if (e.target) {
      e.target.classList.remove('drag-highlight');
    }
  });
})();
