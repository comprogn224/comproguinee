'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { loadingMessages, welcomeQuotes, brandColors } from '@/config/splash-messages';

// Fonction pour obtenir un élément aléatoire d'un tableau
const getRandomItem = (array: string[]) => 
  array[Math.floor(Math.random() * array.length)];

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentQuote, setCurrentQuote] = useState('');
  const [progress, setProgress] = useState(0);
  const [showQuote, setShowQuote] = useState(false);

  // Durée totale d'affichage du splash screen (en ms)
  const splashDuration = 10000; // Augmenté à 10 secondes
  // Durée d'affichage du premier message (en ms)
  const firstMessageDuration = 4000;
  // Intervalle de changement des messages suivants (en ms)
  const messageInterval = 2000;

  useEffect(() => {
    // Initialisation des messages
    setCurrentMessage(getRandomItem(loadingMessages));
    setCurrentQuote(getRandomItem(welcomeQuotes));

    // Animation de la barre de progression
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (splashDuration / 100);
        return newProgress > 100 ? 100 : newProgress;
      });
    }, splashDuration / 100);

    // Premier changement de message après firstMessageDuration
    const firstMessageTimer = setTimeout(() => {
      setCurrentMessage(getRandomItem(loadingMessages));
      setShowQuote(false);
      
      // Ensuite, changement périodique des messages
      const messageTimer = setInterval(() => {
        setCurrentMessage(getRandomItem(loadingMessages));
        // Alterner entre message de chargement et citation
        setShowQuote(prev => !prev);
      }, messageInterval);
      
      // Nettoyage de l'intervalle
      return () => clearInterval(messageTimer);
    }, firstMessageDuration);

    // Cache le splash screen après la durée définie
    const splashTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
    }, splashDuration);

    // Désactive le défilement pendant l'affichage du splash screen
    document.body.style.overflow = 'hidden';

    // Nettoyage des intervalles et timeouts
    return () => {
      clearInterval(progressInterval);
      clearTimeout(firstMessageTimer);
      clearTimeout(splashTimer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Animation des lettres du titre
  const title = "Com'Pro Guinée";
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 100
      }
    })
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Conteneur principal avec animation de zoom */}
          <motion.div
            className="flex flex-col items-center p-8 rounded-2xl bg-white/90 backdrop-blur-sm shadow-2xl border border-gray-100 max-w-md w-11/12"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.1
            }}
          >
            {/* Logo avec animation de rebond dans un cercle */}
            <motion.div 
              className="w-40 h-40 relative mb-6 rounded-full border-4 border-red-500 p-2 shadow-lg bg-white"
              initial={{ scale: 0 }}
              animate={{ 
                scale: [0, 1.1, 0.95, 1],
                rotate: [0, 10, -5, 0]
              }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                times: [0, 0.5, 0.8, 1],
                rotate: { 
                  duration: 1.5,
                  ease: [0.16, 1, 0.3, 1],
                }
              }}
            >
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/comProGuinee.jpeg"
                  alt="Logo Com'Pro Guinée"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
            
            {/* Titre avec animation lettre par lettre */}
            <div className="flex flex-wrap justify-center mb-2">
              {title.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  className={`text-4xl font-bold ${index < 5 ? 'text-red-600' : 'text-gray-900'}`}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </div>
            
            {/* Message de chargement dynamique */}
            <AnimatePresence mode="wait">
              <motion.div
                key={showQuote ? 'quote' : 'message'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="min-h-[60px] flex items-center justify-center text-center"
              >
                {showQuote ? (
                  <p className="text-gray-600 italic">"{currentQuote}"</p>
                ) : (
                  <div className="flex items-center space-x-2">
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-red-600"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1,
                        delay: 0.1
                      }}
                    />
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-red-600"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1,
                        delay: 0.2
                      }}
                    />
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-red-600"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1,
                        delay: 0.3
                      }}
                    />
                    <span className="ml-2 text-gray-700">{currentMessage}</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            
            {/* Barre de progression stylisée */}
            <div className="w-full mt-8 mb-2">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-red-500 to-red-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Chargement...</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
