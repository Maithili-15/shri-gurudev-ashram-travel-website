import React from 'react';
import { Heart, HandHeart, Sparkles, Users } from 'lucide-react';

export const Values: React.FC = () => {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="text-center mb-16">
        <span className="font-label-caps text-label-caps text-secondary mb-2 block tracking-widest">OUR PILLARS</span>
        <h2 className="font-headline-md text-headline-md text-primary">Guiding Values on the Path</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface rounded-xl p-8 border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
          <Heart className="w-12 h-12 text-primary mb-4" strokeWidth={1.5} />
          <h3 className="font-headline-sm text-primary mb-2">Bhakti</h3>
          <p className="text-sm text-on-surface-variant">Unwavering devotion and surrender to the divine will in every step.</p>
        </div>
        <div className="bg-surface rounded-xl p-8 border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
          <HandHeart className="w-12 h-12 text-primary mb-4" strokeWidth={1.5} />
          <h3 className="font-headline-sm text-primary mb-2">Seva</h3>
          <p className="text-sm text-on-surface-variant">Selfless service to fellow travelers and the sacred environments we visit.</p>
        </div>
        <div className="bg-surface rounded-xl p-8 border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
          <Sparkles className="w-12 h-12 text-primary mb-4" strokeWidth={1.5} />
          <h3 className="font-headline-sm text-primary mb-2">Sadhana</h3>
          <p className="text-sm text-on-surface-variant">Maintaining spiritual discipline, meditation, and silence even amidst the journey.</p>
        </div>
        <div className="bg-surface rounded-xl p-8 border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
          <Users className="w-12 h-12 text-primary mb-4" strokeWidth={1.5} />
          <h3 className="font-headline-sm text-primary mb-2">Sangha</h3>
          <p className="text-sm text-on-surface-variant">Building a supportive and loving community of seekers moving towards the same goal.</p>
        </div>
      </div>
    </section>
  );
};
