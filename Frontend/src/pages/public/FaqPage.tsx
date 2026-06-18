import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { usePageTitle } from '@/hooks/usePageTitle'

const faqs = [
  {
    q: 'How do I register for a Yatra?',
    a: 'Register for a free account on our website, complete your identity verification (Aadhaar + selfie), and then you can book any Yatra from the Yatras page. The entire process takes less than 10 minutes.',
  },
  {
    q: 'Why is identity verification required?',
    a: 'Identity verification is mandatory for the safety of all participants and to comply with government travel guidelines. You\'ll need to submit your Aadhaar number, a photo of your Aadhaar card, and a selfie. Verification is reviewed within 24-48 hours.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept all major payment methods through our secure Razorpay gateway: UPI, credit cards, debit cards, net banking, and EMI options.',
  },
  {
    q: 'What transport options are available?',
    a: 'We offer two transport options: Flight (for long-distance destinations) or Train (AC or Non-AC). The availability depends on the specific Yatra package.',
  },
  {
    q: 'What accommodation types are available?',
    a: 'We offer AC and Non-AC room options. AC rooms are air-conditioned and more comfortable, while Non-AC rooms are more budget-friendly. Both options include meals and dharamshala-quality accommodations near the temple sites.',
  },
  {
    q: 'What is the cancellation policy?',
    a: 'Cancellation policies vary by package. Generally, cancellations made more than 15 days before departure receive a partial refund. Contact us directly for specific cancellation terms for your booking.',
  },
  {
    q: 'Can I book for multiple travelers?',
    a: 'Yes! During the booking process, you can specify the number of travelers. The total price is calculated as price per person × number of travelers. All travelers will be accommodated together.',
  },
  {
    q: 'What is included in the Yatra package?',
    a: 'Each package includes transport (as per your selection), accommodation, darshan arrangements at major temples, prasad, and guidance from experienced sevaks. Specific inclusions are listed in each package description.',
  },
  {
    q: 'How do I track my booking status?',
    a: 'After logging in, visit My Portal → My Bookings to see all your bookings and their current status (Payment Pending, Confirmed, Completed, or Cancelled).',
  },
  {
    q: 'I forgot my password. How do I reset it?',
    a: 'Click "Forgot Password" on the login page, enter your email, and we\'ll send you a password reset link. The link is valid for 1 hour.',
  },
  {
    q: 'Can I contact you for custom Yatra arrangements?',
    a: 'Yes! For group bookings of 20+ people or custom Yatra arrangements, please contact us directly via the Contact page or call our helpline. We offer special group rates.',
  },
  {
    q: 'Is my payment secure?',
    a: 'Absolutely. All payments are processed through Razorpay, a PCI-DSS compliant payment gateway trusted by millions across India. We never store your card details.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-amber-900/20 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-amber-500/5 transition-colors"
      >
        <span className="font-medium text-[#f2f0eb] text-sm sm:text-base">{q}</span>
        <ChevronDown
          className={`h-5 w-5 text-amber-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-[#f2f0eb]/60 leading-relaxed border-t border-amber-900/10">
          <div className="pt-4">{a}</div>
        </div>
      )}
    </div>
  )
}

export function FaqPage() {
  usePageTitle('FAQ')

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <p className="text-amber-400 text-sm font-medium mb-3 uppercase tracking-wider">Help Center</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#f2f0eb] mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-[#f2f0eb]/60">
          Everything you need to know about booking a Yatra with us.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <FaqItem key={faq.q} {...faq} />
        ))}
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-[#121110] border border-amber-900/20 text-center">
        <p className="text-[#f2f0eb]/60 mb-4">Still have questions?</p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  )
}
