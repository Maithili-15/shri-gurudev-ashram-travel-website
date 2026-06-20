import React, { useEffect, useState } from 'react';
import { Hero } from '@/components/yatras/Hero';
import { FilterTabs } from '@/components/yatras/FilterTabs';
import { YatraCard } from '@/components/yatras/YatraCard';
import { Newsletter } from '@/components/yatras/Newsletter';
import { kedarnath, varanasi, thanjavur, desert } from '@/assets/images';

export const YatrasPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    document.title = 'Sacred Yatras | Shri Gurudev Ashram';
  }, []);

  const upcomingYatras = [
    {
      id: 'kedarnath-badrinath',
      title: 'Himalayan Awakening: Kedarnath & Badrinath',
      description: 'A soul-stirring trek through the high peaks of the Garhwal Himalayas. Visit the ancient shrines of Lord Shiva and Lord Vishnu amidst pristine natural beauty.',
      duration: '12 DAYS',
      dates: 'OCT 15 - OCT 26, 2024',
      price: '₹45,000',
      imageUrl: kedarnath,
    },
    {
      id: 'kashi-experience',
      title: 'The Eternal Kashi Experience',
      description: 'Explore the oldest living city in the world. Witness the magical Ganga Aarti, visit the Kashi Vishwanath temple, and walk the mystical lanes of Varanasi.',
      duration: '7 DAYS',
      dates: 'NOV 05 - NOV 11, 2024',
      price: '₹28,500',
      imageUrl: varanasi,
    },
    {
      id: 'southern-bharat',
      title: 'Temple Trails of Southern Bharat',
      description: 'A journey through the architectural marvels of the Chola and Pandya dynasties. Experience the grandeur of Madurai Meenakshi and Rameswaram.',
      duration: '10 DAYS',
      dates: 'DEC 01 - DEC 10, 2024',
      price: '₹52,000',
      imageUrl: thanjavur,
    },
    {
      id: 'rajasthan-retreat',
      title: 'Desert Silence: Rajasthan Retreat',
      description: 'A contemplative retreat into the silence of the desert. Meditation sessions under the starlit sky and visits to the sacred Pushkar lake.',
      duration: '5 DAYS',
      dates: 'JAN 12 - JAN 16, 2025',
      price: '₹19,000',
      imageUrl: desert,
    },
  ];

  return (
    <main className="pt-32 pb-section-gap">
      <Hero />
      <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <section className="max-w-container-max mx-auto px-margin-desktop">
        <div 
          className={`transition-opacity duration-300 ${activeTab === 'upcoming' ? 'opacity-100' : 'opacity-0 hidden'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {upcomingYatras.map((yatra) => (
              <YatraCard key={yatra.id} {...yatra} />
            ))}
          </div>
        </div>
        
        <div 
          className={`transition-opacity duration-300 ${activeTab === 'past' ? 'opacity-100' : 'opacity-0 hidden'}`}
        >
          <div className="py-20 text-center">
            <span className="material-symbols-outlined text-outline-variant text-[64px] mb-4">history</span>
            <h3 className="font-headline-sm text-on-surface-variant">Previous Journeys are being archived</h3>
            <p className="font-body-md text-on-surface-variant/60 max-w-md mx-auto mt-2">
              We are currently migrating our 2023 travel logs. Please check back soon to see our spiritual history.
            </p>
          </div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
};
