import React, { useRef, useState, useEffect } from 'react';
import { useVideoScrub } from '../hooks/useVideoScrub';
import './HeroSection.css';

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mouseX, setMouseX] = useState(50);
  const targetXRef = useRef(50);
  const currentXRef = useRef(50);

  useVideoScrub(videoRef);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetXRef.current = (e.clientX / window.innerWidth) * 100;
    };

    let animationFrameId: number;

    const updateSmoothPosition = () => {
      const diff = targetXRef.current - currentXRef.current;
      if (Math.abs(diff) > 0.01) {
        currentXRef.current += diff * 0.2;
        setMouseX(currentXRef.current);
      }
      animationFrameId = requestAnimationFrame(updateSmoothPosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(updateSmoothPosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="hero" id="hero">
      <video
        ref={videoRef}
        className="hero-video"
        muted
        playsInline
        preload="auto"
        poster="/poster.jpg"
        onLoadedData={() => setIsLoaded(true)}
      >
        <source src="/upscaled-video.mp4" type="video/mp4" />
      </video>

      {!isLoaded && <div className="loading-spinner" />}

      <div className={`hero-content ${hasScrolled ? 'visible' : ''}`}>
        <div className="hero-badge">DECENTRALIZED INFRASTRUCTURE</div>
        <h1>EBAD MALIK</h1>
        <p>Secure. Scalable. High-Performance.</p>
        <div className="hero-cta-group">
          <a href="#terminal" className="cta-button primary">
            Explore Protocol
          </a>
          <a href="#features" className="cta-button secondary">
            Learn More
          </a>
        </div>
      </div>

      <div 
        className="character-indicator"
        style={{ left: `${mouseX}%` }}
        data-testid="character-indicator"
      />
    </section>
  );
};

export default HeroSection;
