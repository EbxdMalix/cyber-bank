import { useEffect, useRef, useCallback } from 'react';

interface UseVideoScrubOptions {
  enabled?: boolean;
}

export const useVideoScrub = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
  options: UseVideoScrubOptions = {}
) => {
  const { enabled = true } = options;
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const isReady = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  const scrubToTarget = useCallback(
    (clientX: number) => {
      const video = videoRef.current;
      if (!video || !video.duration || !isReady.current || !enabled) return;

      const normalizedX = Math.max(0, Math.min(1, clientX / window.innerWidth));
      const safeMaxTime = Math.max(0, video.duration - 0.05);
      targetTimeRef.current = normalizedX * safeMaxTime;
    },
    [videoRef, enabled]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return;
      scrubToTarget(e.clientX);
    },
    [scrubToTarget, enabled]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!enabled) return;
      const touch = e.touches[0];
      if (touch) {
        scrubToTarget(touch.clientX);
      }
    },
    [scrubToTarget, enabled]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;
      const video = videoRef.current;
      if (!video || !video.duration) return;

      const step = 0.5;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        targetTimeRef.current = Math.min(targetTimeRef.current + step, video.duration - 0.05);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        targetTimeRef.current = Math.max(targetTimeRef.current - step, 0);
      }
    },
    [videoRef, enabled]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const loop = () => {
      if (video && video.duration && isReady.current) {
        const diff = targetTimeRef.current - currentTimeRef.current;
        if (Math.abs(diff) > 0.001) {
          currentTimeRef.current += diff * 0.2;
          video.currentTime = currentTimeRef.current;
        }
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    const handleLoadedMetadata = () => {
      video.currentTime = 0;
      currentTimeRef.current = 0;
      targetTimeRef.current = 0;
      video.pause();
      isReady.current = true;
    };

    const handleLoadedData = () => {
      isReady.current = true;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('keydown', handleKeyDown);

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('keydown', handleKeyDown);

      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [videoRef, handleMouseMove, handleTouchMove, handleKeyDown]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleSrcChange = () => {
      isReady.current = false;
    };

    video.addEventListener('emptied', handleSrcChange);
    return () => video.removeEventListener('emptied', handleSrcChange);
  }, [videoRef]);
};

export default useVideoScrub;
