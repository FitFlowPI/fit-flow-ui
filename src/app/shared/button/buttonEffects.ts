import {ElementRef, Renderer2} from "@angular/core";

export function buttonRipple(elementId: string, mouseEvent: MouseEvent, renderer: Renderer2, button?: HTMLButtonElement | HTMLElement) {
  if (button) {
    mouseEvent.stopPropagation();
    const buttonRect = button.getBoundingClientRect();

    // Ensure the button has necessary styles
    renderer.setStyle(button, 'position', 'relative');
    renderer.setStyle(button, 'overflow', 'hidden');

    const ripple = renderer.createElement('span');

    // Set dynamic position styles
    renderer.setStyle(ripple, 'top', `${mouseEvent.clientY - buttonRect.y}px`);
    renderer.setStyle(ripple, 'left', `${mouseEvent.clientX - buttonRect.x}px`);

    // Set static styles for the ripple effect
    renderer.setStyle(ripple, 'position', 'absolute');
    renderer.setStyle(ripple, 'background', 'radial-gradient(circle at center, transparent 30%, white 100%)');
    renderer.setStyle(ripple, 'transform', 'translate(-50%, -50%)');
    renderer.setStyle(ripple, 'border-radius', '50%');
    renderer.setStyle(ripple, 'aspect-ratio', '1 / 1');
    renderer.setStyle(ripple, 'width', '100%');
    renderer.setStyle(ripple, 'animation', `ripple-${elementId} 0.8s ease-out forwards`);
    renderer.setStyle(ripple, 'mask', 'radial-gradient(circle at center, transparent 30%, black 100%)');
    renderer.setStyle(ripple, 'pointer-events', 'none');
    renderer.setStyle(ripple, 'webkitMask', 'radial-gradient(circle at center, transparent 30%, black 100%)'); // For WebKit compatibility

    renderer.appendChild(button, ripple);

    // Add keyframes dynamically
    addRippleKeyframes(elementId, renderer);

    // Remove the ripple after the animation ends
    setTimeout(() => {
      renderer.removeChild(button, ripple);
    }, 800);
  }
}

function addRippleKeyframes(elementId: string, renderer: Renderer2) {
  const style = renderer.createElement('style');
  style.type = 'text/css';

  const keyframes = `
    @keyframes ripple-${elementId} {
      from {
        width: 0;
        opacity: 0.9;
      }
      to {
        width: 200%;;
        opacity: 0;
      }
    }
  `;

  style.appendChild(document.createTextNode(keyframes));
  renderer.appendChild(document.head, style);
}
