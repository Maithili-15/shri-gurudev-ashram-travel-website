import React from 'react';
import { BookOpen, ShieldCheck, Users, Award } from 'lucide-react';

export const WhyTravelWithUs: React.FC = () => {
  return (
    <section className="bg-surface-container py-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <span className="font-label-caps text-label-caps text-secondary mb-2 block tracking-widest">THE DIFFERENCE</span>
          <h2 className="font-headline-md text-headline-md text-primary max-w-2xl mx-auto">Why Thousands Travel With Shri Gurudev Ashram</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div className="bg-surface p-8 rounded-xl flex gap-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border border-outline-variant/10">
            <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center shrink-0 text-primary">
              <BookOpen className="w-7 h-7" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-primary mb-2">Spiritual Guidance</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Every Yatra is accompanied by senior Ashram swamis who conduct daily satsangs, meditation, and provide deep scriptural context to the places we visit.</p>
            </div>
          </div>

          <div className="bg-surface p-8 rounded-xl flex gap-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border border-outline-variant/10">
            <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center shrink-0 text-primary">
              <ShieldCheck className="w-7 h-7" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-primary mb-2">Safe &amp; Comfortable</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">We manage all logistics—from hygienic sattvic meals to comfortable accommodations and safe transport—so you can focus entirely on your sadhana.</p>
            </div>
          </div>

          <div className="bg-surface p-8 rounded-xl flex gap-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border border-outline-variant/10">
            <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center shrink-0 text-primary">
              <Users className="w-7 h-7" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-primary mb-2">Like-Minded Community</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Travel with individuals who share your spiritual thirst. The bonds formed during these sacred journeys often translate into lifelong friendships.</p>
            </div>
          </div>

          <div className="bg-surface p-8 rounded-xl flex gap-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border border-outline-variant/10">
            <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center shrink-0 text-primary">
              <Award className="w-7 h-7" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-primary mb-2">Decades of Trust</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">With over 30 years of organizing complex pilgrimages, the Ashram's robust network ensures a seamless and authentic experience across Bharat.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
