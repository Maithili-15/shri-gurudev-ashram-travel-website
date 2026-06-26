import React from 'react';
import { MapPin } from 'lucide-react';

export const AshramMap: React.FC = () => {
  return (
    <section id="ashram-map-section" className="py-20 md:py-28 bg-surface px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Google Map Embedded inside Rounded Premium Container */}
        <div className="rounded-3xl overflow-hidden border border-outline-variant/30 h-[400px] md:h-[520px] shadow-2xl relative bg-surface-container-lowest">
          <iframe
            title="Official Shri Gurudev Ashram Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.8!2d73.79!3d20.00!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDAwJzAwLjAiTiA3M8KwNDcnMjQuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[10%] filter contrast-[105%]"
          />
        </div>

        {/* Below Map Editorial Explanation */}
        <div className="max-w-3xl mx-auto text-center bg-surface-container-lowest p-8 md:p-12 rounded-3xl border border-outline-variant/30 shadow-md relative overflow-hidden">
          <div className="w-12 h-12 rounded-full bg-[#C98B1A]/10 text-primary flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-6 h-6" />
          </div>

          <h3 className="font-display-lg text-2xl md:text-4xl text-primary font-bold tracking-tight mb-4">
            Finding the Ashram
          </h3>

          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed font-light">
            Shri Gurudev Ashram is peacefully situated amidst the serene hills of Palaskhed Sapkal in Buldhana District, Maharashtra. Devotees traveling by road can easily reach via Chikhli or Malkapur. For those arriving by railway, Malkapur junction (approx. 50 km) and Akola station provide convenient taxi and bus connections directly to the Ashram gates.
          </p>
        </div>
      </div>
    </section>
  );
};
