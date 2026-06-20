import React from 'react';

export const Statistics: React.FC = () => {
  return (
    <section className="bg-surface py-12 border-b border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-outline-variant/30">
          <div className="space-y-2">
            <p className="font-display-lg text-4xl text-primary">20+</p>
            <p className="font-label-caps text-[11px] tracking-widest text-secondary uppercase">Years of Seva</p>
          </div>
          <div className="space-y-2">
            <p className="font-display-lg text-4xl text-primary">5000+</p>
            <p className="font-label-caps text-[11px] tracking-widest text-secondary uppercase">Devotees</p>
          </div>
          <div className="space-y-2">
            <p className="font-display-lg text-4xl text-primary">100+</p>
            <p className="font-label-caps text-[11px] tracking-widest text-secondary uppercase">Spiritual Camps</p>
          </div>
          <div className="space-y-2">
            <p className="font-display-lg text-4xl text-primary">50+</p>
            <p className="font-label-caps text-[11px] tracking-widest text-secondary uppercase">Sacred Yatras</p>
          </div>
        </div>
      </div>
    </section>
  );
};
