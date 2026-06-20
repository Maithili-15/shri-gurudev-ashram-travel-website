import React from 'react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black">
        <img
          className="w-full h-full object-cover opacity-80"
          alt="Ashram"
          src="/assets/Home_Page.JPG"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      
      <div className="relative z-10 text-center px-margin-mobile max-w-4xl mx-auto space-y-6">
        <span className="font-label-caps text-label-caps text-[#d48c29] tracking-widest block animate-fade-in uppercase">
          🙏 Under the Blessings of Gurudev
        </span>
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-white balance-text">
          Begin Your Sacred Journey
        </h1>
        <p className="font-body-lg text-body-lg text-white/90 max-w-2xl mx-auto italic">
          "Every Yatra begins with devotion and ends with inner transformation."
        </p>
        
        <div className="pt-8 flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/yatras"
            className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label-caps text-label-caps hover:shadow-lg hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center uppercase"
          >
            Explore Sacred Yatras
          </Link>
          <Link
            to="/about"
            className="border border-white text-white px-8 py-4 rounded-lg font-label-caps text-label-caps hover:bg-white/10 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center uppercase"
          >
            Our Philosophy
          </Link>
        </div>
      </div>
    </section>
  );
};
