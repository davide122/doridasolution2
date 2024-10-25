"use client"
import { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [positions, setPositions] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isLinkHover, setIsLinkHover] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isActive, setIsActive] = useState(false);

  // Check if device is touch-enabled
  useEffect(() => {
    const checkIfTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkIfTouchDevice();
  }, []);

  // Update cursor position and trail
  useEffect(() => {
    if (isTouchDevice) return;

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      addTrailPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseDown = () => {
      setIsActive(true);
    };

    const onMouseUp = () => {
      setIsActive(false);
    };

    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);

      // Hover effects on interactive elements
      document.querySelectorAll('a, button, .interactive').forEach((el) => {
        el.addEventListener('mouseover', handleLinkHoverEvents);
        el.addEventListener('mouseout', handleLinkHoverEvents);
      });
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);

      // Clean up hover events
      document.querySelectorAll('a, button, .interactive').forEach((el) => {
        el.removeEventListener('mouseover', handleLinkHoverEvents);
        el.removeEventListener('mouseout', handleLinkHoverEvents);
      });
    };

    const handleLinkHoverEvents = (e) => {
      if (e.type === 'mouseover') {
        setIsLinkHover(true);
      } else if (e.type === 'mouseout') {
        setIsLinkHover(false);
      }
    };

    addEventListeners();
    return () => {
      removeEventListeners();
    };
  }, [isTouchDevice]);

  // Function to handle trail positions
  const addTrailPosition = (pos) => {
    setPositions((prev) => {
      const newPositions = [...prev, pos];
      if (newPositions.length > 20) {
        newPositions.shift();
      }
      return newPositions;
    });
  };

  // Combine cursor classes
  const cursorClasses = `custom-cursor ${
    isActive ? 'active' : ''
  } ${isVisible ? '' : 'hidden'} ${isLinkHover ? 'link-hover' : ''}`;

  // After all Hooks, conditionally return null
  if (isTouchDevice) return null;

  return (
    <>
      {/* Cursor Trail */}
      {positions.map((pos, index) => (
        <div
          key={index}
          className="cursor-trail"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            opacity: (1 - index / positions.length) * 0.5,
          }}
        ></div>
      ))}

      {/* Custom Cursor */}
      <div
        className={cursorClasses}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      ></div>
    </>
  );
};

export default CustomCursor;
