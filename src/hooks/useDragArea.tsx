import { useViewportSize } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';

interface useDragAreaOptions {
  minWidth: number;
  offset?: number;
}

export const useDragArea = (
  initialWidth: number,
  options: useDragAreaOptions
) => {
  const offset = options.offset ?? 400;

  const dragAreaRef = useRef<HTMLDivElement>(null);
  const resizableRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<number>();
  const [dragAreaHovered, setDragAreaHovered] = useState(false);
  const [dragAreaActive, setDragAreaActive] = useState(false);
  const [dragAreaWidth, setDragAreaWidth] = useState(initialWidth);

  const { height: windowHeight, width: windowWidth } = useViewportSize();
  useEffect(() => {
    if (!resizableRef.current) return;

    const windowWidth = document.body.clientWidth;
    const currentWidth = resizableRef.current.clientWidth;
    const expectedWidth = currentWidth + offset;

    if (windowWidth < expectedWidth) {
      setDragAreaWidth(windowWidth - offset);
    }
  }, [windowHeight, windowWidth]);

  useEffect(() => {
    if (dragAreaRef.current && resizableRef.current) {
      const handleMouseDown = () => {
        setDragAreaActive(true);
        document.body.style.cursor = 'e-resize';
      };

      const handleMouseUp = () => {
        setDragAreaActive(false);
        document.body.style.cursor = 'default';
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!dragAreaActive) return;

        // Prevent text from being selected
        e.preventDefault();

        if (e.clientX < options.minWidth) {
          setDragAreaWidth(options.minWidth);
          return;
        }

        const windowWidth = document.body.clientWidth;
        if (e.clientX + offset < windowWidth) {
          setDragAreaWidth(e.clientX);
          return;
        }

        setDragAreaWidth(windowWidth - offset);
      };

      const handleMouseEnter = () => {
        hoverTimeout.current = setTimeout(() => {
          setDragAreaHovered(true);
          hoverTimeout.current = undefined;
        }, 500);
      };

      const handleMouseLeave = () => {
        setDragAreaHovered(false);

        if (hoverTimeout.current !== undefined) {
          clearInterval(hoverTimeout.current);
          hoverTimeout.current = undefined;
        }
      };

      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);
      dragAreaRef.current.addEventListener('mousedown', handleMouseDown);
      dragAreaRef.current.addEventListener('mouseenter', handleMouseEnter);
      dragAreaRef.current.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
        dragAreaRef.current?.removeEventListener('mousedown', handleMouseDown);
        dragAreaRef.current?.removeEventListener(
          'mouseenter',
          handleMouseEnter
        );
        dragAreaRef.current?.removeEventListener(
          'mouseleave',
          handleMouseLeave
        );
      };
    }
  }, [dragAreaActive]);

  return {
    dragAreaRef,
    dragAreaHovered: dragAreaActive || dragAreaHovered,
    dragAreaWidth,
    resizableRef,
  };
};
