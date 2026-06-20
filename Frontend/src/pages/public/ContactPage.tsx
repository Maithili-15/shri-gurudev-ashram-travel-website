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
    <div className="font-body-md text-body-md bg-surface text-on-surface w-full overflow-hidden mt-16 pt-12 pb-24">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="font-label-caps text-label-caps text-secondary mb-2 block tracking-widest">REACH OUT</span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6">Contact Us</h1>
          <p className="font-body-lg text-on-surface-variant leading-relaxed">
            Have questions about our Yatras? Send us a message and our dedicated team will respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Form */}
          <div className="bg-surface-container-lowest p-8 md:p-10 rounded-2xl border border-outline-variant/30 shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full px-5 py-4 rounded-xl bg-surface border border-outline-variant/50 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-5 py-4 rounded-xl bg-surface border border-outline-variant/50 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="10-digit mobile number"
                  className="w-full px-5 py-4 rounded-xl bg-surface border border-outline-variant/50 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your query..."
                  className="w-full px-5 py-4 rounded-xl bg-surface border border-outline-variant/50 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
              >
                {sending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact info + map */}
          <div className="space-y-10">
            <div className="bg-surface-container-lowest p-8 md:p-10 rounded-2xl border border-outline-variant/30 shadow-sm space-y-8">
              <h2 className="font-headline-sm text-headline-sm text-primary">Contact Information</h2>
              
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface-variant mb-1 uppercase tracking-wide">Address</p>
                  <p className="text-on-surface leading-relaxed">Shri Gurudev Ashram, Palaskhed Sapkal,<br/>Tehsil Chikhli, District Buldhana,<br/>Maharashtra - 443001</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface-variant mb-1 uppercase tracking-wide">Phone</p>
                  <a href="tel:+919158740007" className="text-on-surface hover:text-secondary transition-colors block">+91 91587 40007</a>
                  <a href="tel:+919834151577" className="text-on-surface hover:text-secondary transition-colors block mt-1">+91 98341 51577</a>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface-variant mb-1 uppercase tracking-wide">Email</p>
                  <a href="mailto:info@shrigurudevashram.org" className="text-on-surface hover:text-secondary transition-colors block">info@shrigurudevashram.org</a>
                  <a href="mailto:info@shantiashramtrust.org" className="text-on-surface hover:text-secondary transition-colors block mt-1">info@shantiashramtrust.org</a>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-2xl overflow-hidden border border-outline-variant/30 h-80 shadow-sm">
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
    </div>
  )
}
