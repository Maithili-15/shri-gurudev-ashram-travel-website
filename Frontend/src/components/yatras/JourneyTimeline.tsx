import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircleQuestion, ClipboardCheck, Compass, Navigation, Landmark, Home } from 'lucide-react';

const steps = [
  { label: 'Inquiry', icon: MessageCircleQuestion },
  { label: 'Registration', icon: ClipboardCheck },
  { label: 'Preparation', icon: Compass },
  { label: 'Departure', icon: Navigation },
  { label: 'Pilgrimage', icon: Landmark },
  { label: 'Return', icon: Home },
];

export const JourneyTimeline: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-surface-container-lowest border-y border-outline-variant/20 px-margin-mobile md:px-margin-desktop overflow-hidden">
      <div className="max-w-container-max mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-label-caps text-xs tracking-[0.2em] text-secondary mb-3 block uppercase font-semibold">
            SACRED PROCESS
          </span>
          <h2 className="font-display-lg text-3xl sm:text-4xl font-bold text-primary">
            Yatra Journey Timeline
          </h2>
        </div>

        {/* Timeline Grid */}
        <div className="relative max-w-6xl mx-auto">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-[40px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-[#C98B1A]/10 via-[#C98B1A] to-[#C98B1A]/10 z-0" />

          {/* Mobile Vertical Connecting Line */}
          <div className="sm:hidden absolute left-[39px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#C98B1A]/10 via-[#C98B1A] to-[#C98B1A]/10 z-0" />

          <div className="flex flex-col sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-10 sm:gap-8 lg:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-row sm:flex-col items-center sm:text-center group relative gap-6 sm:gap-0"
              >
                {/* Circular Golden Node with Soft Hover Glow */}
                <div className="w-20 h-20 rounded-full bg-surface border-2 border-[#C98B1A]/30 group-hover:border-[#C98B1A] group-hover:bg-[#C98B1A] group-hover:text-white text-[#C98B1A] flex items-center justify-center shadow-md group-hover:shadow-[0_0_20px_rgba(201,139,26,0.45)] group-hover:-translate-y-1 transition-all duration-300 sm:mb-4 shrink-0 z-10">
                  <step.icon className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                </div>
                
                <div className="flex flex-col text-left sm:text-center">
                  <h4 className="font-display-lg font-bold text-[#3a2d00] text-lg mb-1 tracking-wide group-hover:text-[#C98B1A] transition-colors">
                    {step.label}
                  </h4>
                  
                  <span className="text-[10px] font-semibold text-secondary tracking-widest uppercase opacity-75">
                    Step 0{idx + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
