import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { settingsAPI } from '@/lib/api';
import Link from 'next/link';

const FORCED_HERO_VIDEO = 'https://videos.pexels.com/video-files/4786784/4786784-uhd_3840_2160_30fps.mp4';
const COMPATIBILITY_FALLBACK_VIDEO = 'https://videos.pexels.com/video-files/5682545/5682545-sd_640_360_25fps.mp4';

export default function Hero() {
  const [settings, setSettings] = useState(null);
  const [heroVideo, setHeroVideo] = useState(FORCED_HERO_VIDEO);
  const [hasFallbackTried, setHasFallbackTried] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await settingsAPI.get();
        setSettings(response.data);
        setHeroVideo(FORCED_HERO_VIDEO);
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.load();
    const playPromise = videoEl.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Keep silent if browser blocks autoplay in specific environments.
      });
    }
  }, [heroVideo]);

  const handleVideoError = () => {
    if (!hasFallbackTried && heroVideo !== FORCED_HERO_VIDEO) {
      setHasFallbackTried(true);
      setHeroVideo(FORCED_HERO_VIDEO);
      return;
    }

    if (heroVideo !== COMPATIBILITY_FALLBACK_VIDEO) {
      setHeroVideo(COMPATIBILITY_FALLBACK_VIDEO);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-16">
      {/* Video Background */}
      <video
        key={heroVideo}
        ref={videoRef}
        autoPlay
        defaultMuted
        muted
        loop
        preload="auto"
        playsInline
        onError={handleVideoError}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {settings?.heroTitle || 'Welcome to Elite Parlor'}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
            {settings?.heroSubtitle || 'Experience luxury and transformation'}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <Link href="/booking">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white text-lg font-bold rounded-lg transition-all"
            >
              Book Now
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: window.innerHeight + 500, behavior: 'smooth' })}
            className="px-8 py-4 bg-white/10 text-white text-lg font-bold rounded-lg border-2 border-white backdrop-blur-sm hover:bg-white/20 transition-all"
          >
            View Services
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="text-white text-3xl">↓</div>
        </motion.div>
      </div>
    </section>
  );
}
