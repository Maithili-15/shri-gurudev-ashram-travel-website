import React from 'react';
import { Link } from 'react-router-dom';
import { gangaAarti, shikharMeditation, anandaRetreat, aboutDiya, aboutTempleGate, heroBg } from '@/assets/images';

export const SpiritualPaths: React.FC = () => {
  const destinations = [
    { name: 'Dwarka', desc: 'Journey to the divine city of Lord Krishna.', details: '7 Days • Train', from: 'From Maharashtra', img: aboutDiya },
    { name: 'Haridwar', desc: 'Experience the holy Ganga Aarti and sacred baths.', details: '5 Days • Flight/Train', from: 'From Maharashtra', img: gangaAarti },
    { name: 'Kedarnath', desc: 'Trek to the ancient Himalayan abode of Lord Shiva.', details: '9 Days • Flight/Trek', from: 'From Delhi', img: shikharMeditation },
    { name: 'Badrinath', desc: 'Visit the sacred temple in the lap of Nar-Narayan mountains.', details: '9 Days • Flight/Bus', from: 'From Delhi', img: heroBg },
    { name: 'Rameswaram', desc: 'Pilgrimage to the revered Jyotirlinga in the south.', details: '8 Days • Train', from: 'From Maharashtra', img: aboutTempleGate },
    { name: 'Varanasi', desc: 'Seek blessings in the oldest living spiritual city.', details: '6 Days • Train', from: 'From Maharashtra', img: anandaRetreat },
  ];

  return (
    <section className="bg-surface-container-low py-section-gap px-margin-desktop">
      <div className="max-w-container-max mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">Upcoming Yatras</h2>
          <p className="text-on-surface-variant italic">Embark on a pilgrimage that transcends the physical plane.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <Link key={dest.name} to="/yatras" className="group relative overflow-hidden rounded-xl bg-surface shadow-sm cursor-pointer border border-outline-variant/30 block aspect-[4/5] sm:aspect-square md:aspect-[4/5]">
              <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={dest.name} src={dest.img} loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 p-6 text-white w-full flex flex-col justify-end h-full">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-primary/90 px-3 py-1 rounded-full text-[10px] font-label-caps tracking-widest inline-block text-white">
                    {dest.details}
                  </span>
                  <span className="text-[10px] font-label-caps tracking-widest text-white/80 uppercase">
                    {dest.from}
                  </span>
                </div>
                <h3 className="text-2xl font-headline-sm mb-2 text-white">{dest.name}</h3>
                <p className="text-white/80 text-sm mb-6">{dest.desc}</p>
                <div className="mt-auto pt-4 border-t border-white/20 font-label-caps tracking-widest text-xs flex items-center justify-between text-white group-hover:text-primary transition-colors">
                  <span>REGISTRATION OPENS SOON</span>
                  <svg className="w-[18px] h-[18px] transform group-hover:translate-x-2 transition-transform duration-300 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
