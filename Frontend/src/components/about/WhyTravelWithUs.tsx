import React from 'react';
import { BookOpen, ShieldCheck, Users, Award } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Spiritual Guidance',
    desc: 'Every Yatra is accompanied by senior Ashram swamis who conduct daily satsangs, meditation, and provide deep scriptural context to the places we visit.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe & Comfortable',
    desc: 'We manage all logistics—from hygienic sattvic meals to comfortable accommodations and safe transport—so you can focus entirely on your sadhana.',
  },
  {
    icon: Users,
    title: 'Like-Minded Community',
    desc: 'Travel with individuals who share your spiritual thirst. The bonds formed during these sacred journeys often translate into lifelong friendships.',
  },
  {
    icon: Award,
    title: 'Decades of Trust',
    desc: 'With over 30 years of organizing complex pilgrimages, the Ashram\'s robust network ensures a seamless and authentic experience across Bharat.',
  },
];

export const WhyTravelWithUs: React.FC = () => {
  return (
    <section className="bg-surface-container py-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <span className="section-eyebrow">The Difference</span>
          <h2 className="section-heading max-w-2xl mx-auto">Why Thousands Travel With Shri Gurudev Ashram</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {features.map((feat) => (
            <div key={feat.title} className="card-sacred p-8 flex gap-6">
              <div className="w-14 h-14 rounded-full bg-primary-container/20 flex items-center justify-center shrink-0 text-primary">
                <feat.icon className="w-6 h-6" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary mb-2">{feat.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
