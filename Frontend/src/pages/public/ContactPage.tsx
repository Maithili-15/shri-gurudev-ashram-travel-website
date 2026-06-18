import { useState } from 'react'
import { Phone, Mail, MapPin, Send } from 'lucide-react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { toast } from 'sonner'

export function ContactPage() {
  usePageTitle('Contact Us')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 800)) // simulate send
    toast.success("Thank you! We'll be in touch soon. 🙏")
    setForm({ name: '', email: '', phone: '', message: '' })
    setSending(false)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-amber-400 text-sm font-medium mb-3 uppercase tracking-wider">Reach Out</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#f2f0eb] mb-4">Contact Us</h1>
        <p className="text-[#f2f0eb]/60 max-w-xl mx-auto">
          Have questions about our Yatras? Reach out and our team will respond within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Form */}
        <div className="p-8 rounded-3xl bg-[#121110] border border-amber-900/20">
          <h2 className="font-semibold text-[#f2f0eb] text-xl mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-[#f2f0eb]/60 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl bg-[#0a0908] border border-amber-900/30 text-[#f2f0eb] placeholder-[#f2f0eb]/20 focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-[#f2f0eb]/60 mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl bg-[#0a0908] border border-amber-900/30 text-[#f2f0eb] placeholder-[#f2f0eb]/20 focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-[#f2f0eb]/60 mb-1.5">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="10-digit mobile number"
                className="w-full px-4 py-3 rounded-xl bg-[#0a0908] border border-amber-900/30 text-[#f2f0eb] placeholder-[#f2f0eb]/20 focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-[#f2f0eb]/60 mb-1.5">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us about your query..."
                className="w-full px-4 py-3 rounded-xl bg-[#0a0908] border border-amber-900/30 text-[#f2f0eb] placeholder-[#f2f0eb]/20 focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:from-amber-600 hover:to-orange-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact info + map */}
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-[#121110] border border-amber-900/20 space-y-5">
            <h2 className="font-semibold text-[#f2f0eb] text-xl mb-2">Contact Information</h2>
            {[
              {
                icon: MapPin,
                label: 'Address',
                value: 'Shri Gurudev Ashram, Near Panchvati, Nashik, Maharashtra 422003',
              },
              { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
              {
                icon: Mail,
                label: 'Email',
                value: 'info@shrigurudevashram.in',
                href: 'mailto:info@shrigurudevashram.in',
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-[#f2f0eb]/40 mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-[#f2f0eb]/70 hover:text-amber-400 transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-[#f2f0eb]/70">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Google Map */}
          <div className="rounded-3xl overflow-hidden border border-amber-900/20 h-64">
            <iframe
              title="Shri Gurudev Ashram Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.8!2d73.79!3d20.00!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDAwJzAwLjAiTiA3M8KwNDcnMjQuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
