import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, CreditCard, Award, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArenaHighlight = () => {
  const features = [
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Smart RFID Cards',
      desc: 'Cashless, tap-to-play experience across all games.'
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: 'Thrilling Activities',
      desc: 'From Go-Karting to VR experiences for all ages.'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Exclusive Memberships',
      desc: 'Earn reward points as you play and dine with us.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Unified Ecosystem',
      desc: 'One smart card for dining, gaming, and excursions.'
    }
  ];

  return (
    <section id="arena" className="py-24 relative overflow-hidden bg-dark">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-landing-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-landing-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-landing-secondary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-300">New Module Integrated</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black font-display mb-6 leading-tight text-white uppercase tracking-tight">
              Experience the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-landing-primary to-landing-secondary">
                Outdoor Play Arena
              </span>
            </h2>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-xl">
              Take your visit to the next level. We've seamlessly integrated a state-of-the-art gaming and excursion arena right into our smart dining ecosystem.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {features.map((feat, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-landing-primary shrink-0">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">{feat.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Right Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full flex flex-col md:flex-row items-center justify-center mt-8 lg:mt-0"
          >
            <div className="relative overflow-hidden rounded-2xl md:rounded-[2rem] shadow-2xl shadow-landing-primary/20 transform rotate-0 md:rotate-[-5deg] hover:rotate-0 transition-transform duration-700 ease-out border-4 md:border-8 border-white group z-10">
               <img src="/card-image.jpg" alt="Outdoor Play Arena Card" className="w-[260px] sm:w-[300px] md:w-[360px] h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>

            {/* Floating Accents */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="relative md:absolute top-[-20px] md:top-0 right-auto md:-right-10 bg-dark-lighter border border-white/10 p-3 md:p-4 rounded-2xl shadow-xl backdrop-blur-md z-20"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-landing-secondary/20 flex items-center justify-center text-landing-secondary">
                  <Zap className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest">RFID Enabled</p>
                  <p className="text-sm md:text-base text-white font-black">Tap & Play</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ArenaHighlight;
