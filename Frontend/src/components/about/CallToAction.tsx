import React from 'react';
import { Link } from 'react-router-dom';

export const CallToAction: React.FC = () => {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop text-center max-w-3xl mx-auto animate-fade-in-up">
      <h2 className="font-headline-md text-headline-md text-primary mb-6">Begin Your Sacred Journey with Shri Gurudev Ashram</h2>
      <p className="font-body-lg text-on-surface-variant mb-10 leading-relaxed">
        Walk the timeless paths of Bharat under the blessings of Gurudev Ji. Join fellow devotees in a pilgrimage of faith, service, and inner transformation.
      </p>
      <Link 
        to="/yatras" 
        className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all hover:-translate-y-1 shadow-lg"
      >
        Explore Yatras
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
      </Link>
    </section>
  );
};
