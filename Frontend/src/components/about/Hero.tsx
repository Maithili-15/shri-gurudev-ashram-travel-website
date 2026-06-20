import React from 'react';

const SpiritualDivider = () => (
  <div className="flex items-center justify-center gap-6 my-8">
    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#C98B1A]" />
    <img
      src="/assets/Ashram vector logo_2022_white-01.png"
      alt="Shri Gurudev Ashram Logo"
      className="w-16 h-16 md:w-20 md:h-20 object-contain shrink-0 drop-shadow-[0_3px_10px_rgba(117,91,0,0.25)] select-none"
    />
    <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#C98B1A]" />
  </div>
);

export const Hero: React.FC = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center text-center px-margin-mobile overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          alt=""
          src="/assets/temple_sunrise_bg.png"
        />
        <div className="absolute inset-0 bg-[#f5efe4]/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-4xl animate-fade-in-up mt-16">
        <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-4 block">
          Sacred Pilgrimages Under Gurudev's Blessings
        </span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-[#3a2d00] mb-6 drop-shadow-sm font-bold">
          Where Every Journey Becomes a Spiritual Awakening
        </h1>
        <p className="font-body-lg text-body-lg text-[#4a3e2c] mb-8 leading-relaxed max-w-2xl mx-auto font-medium">
          "Every pilgrimage begins with faith and ends with inner transformation."
        </p>
        <SpiritualDivider />
      </div>
    </section>
  );
};
