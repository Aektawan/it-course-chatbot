import React, { useEffect } from 'react';

interface ArrowConnectorProps {
  sourceId: string;
  targetId: string;
}

export const ArrowConnector: React.FC<ArrowConnectorProps> = ({ sourceId, targetId }) => {
  useEffect(() => {
    const updateArrowPosition = () => {
      const sourceElement = document.getElementById(sourceId);
      const targetElement = document.getElementById(targetId);
      const arrow = document.querySelector(`[data-source="${sourceId}"][data-target="${targetId}"]`) as SVGLineElement;
      
      if (sourceElement && targetElement && arrow) {
        const sourceRect = sourceElement.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        const container = arrow.closest('svg')?.getBoundingClientRect();
        
        if (container) {
          const sourceX = sourceRect.right - container.left;
          const sourceY = sourceRect.top + sourceRect.height / 2 - container.top;
          const targetX = targetRect.left - container.left;
          const targetY = targetRect.top + targetRect.height / 2 - container.top;
          
          // Only draw arrow if target is in a later semester/year
          if (targetY > sourceY + 50 || (targetY > sourceY - 50 && targetX > sourceX + 100)) {
            arrow.setAttribute('x1', sourceX.toString());
            arrow.setAttribute('y1', sourceY.toString());
            arrow.setAttribute('x2', (targetX - 10).toString());
            arrow.setAttribute('y2', targetY.toString());
            arrow.style.display = 'block';
          } else {
            arrow.style.display = 'none';
          }
        }
      }
    };

    // Update arrow positions after component mounts and on resize
    const timeoutId = setTimeout(updateArrowPosition, 100);
    window.addEventListener('resize', updateArrowPosition);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateArrowPosition);
    };
  }, [sourceId, targetId]);

  return null;
};