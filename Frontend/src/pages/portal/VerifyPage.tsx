import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Upload, Loader2, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useVerification } from '@/hooks/useVerification'
import { usePageTitle } from '@/hooks/usePageTitle'
import { toast } from 'sonner'

const STEPS = ['Aadhaar Number', 'Aadhaar Image', 'Selfie', 'Review & Submit']

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              i < current
                ? 'bg-amber-500 text-white'
                : i === current
                  ? 'bg-amber-500/20 border-2 border-amber-500 text-amber-400'
                  : 'bg-[#1a1816] text-[#f2f0eb]/30 border border-amber-900/20'
            }`}
          >
            {i < current ? <Check className="h-4 w-4" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`h-px w-8 sm:w-16 ${i < current ? 'bg-amber-500' : 'bg-amber-900/20'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function FileUploadField({
  label,
  // preview unused
  onFileSelect,
  onUpload,
  uploaded,
  loading,
}: {
  label: string
  // preview unused
  onFileSelect: (file: File) => void
  onUpload: () => void
  uploaded: boolean
  loading: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      onFileSelect(file)
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-[#f2f0eb]/60">{label}</p>
      <div
        className="border-2 border-dashed border-amber-900/30 rounded-xl p-6 text-center cursor-pointer hover:border-amber-500/40 transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        {selectedFile ? (
          <div className="space-y-2">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              className="max-h-32 mx-auto rounded-lg object-contain"
            />
            <p className="text-xs text-[#f2f0eb]/50">{selectedFile.name}</p>
          </div>
        ) : (
          <div className="space-y-2 text-[#f2f0eb]/40">
            <Upload className="h-8 w-8 mx-auto" />
            <p className="text-sm">Click to select image</p>
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
      </div>

      {uploaded ? (
        <div className="flex items-center gap-2 text-green-400 text-sm">
          <Check className="h-4 w-4" /> Uploaded successfully
        </div>
      ) : (
        <button
          onClick={onUpload}
          disabled={!selectedFile || loading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 disabled:opacity-40 transition-colors"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Upload Image
        </button>
      )}
    </div>
  )
}

export function VerifyPage() {
  usePageTitle('Verify Identity')
  const { userProfile, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const { uploading, submitting, uploadAadhaar, uploadSelfie, submitVerification } = useVerification()

  const [step, setStep] = useState(0)
  const [aadhaarNumber, setAadhaarNumber] = useState('')
  const [aadhaarError, setAadhaarError] = useState('')
  const [aadhaarImagePath, setAadhaarImagePath] = useState<string | null>(null)
  const [selfieImagePath, setSelfieImagePath] = useState<string | null>(null)
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null)
  const [selfieFile, setSelfieFile] = useState<File | null>(null)

  const verStatus = userProfile?.verification_status

  // Already submitted/verified
  if (verStatus === 'submitted') {
    return (
      <div className="max-w-lg space-y-6">
        <h1 className="font-display text-3xl font-bold text-[#f2f0eb]">Identity Verification</h1>
        <div className="p-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-center">
          <ShieldCheck className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
          <h2 className="font-semibold text-[#f2f0eb] mb-2">Verification Under Review</h2>
          <p className="text-sm text-[#f2f0eb]/60">
            Your documents have been submitted and are being reviewed. We'll notify you within 24-48 hours.
          </p>
        </div>
      </div>
    )
  }

  if (verStatus === 'verified') {
    return (
      <div className="max-w-lg space-y-6">
        <h1 className="font-display text-3xl font-bold text-[#f2f0eb]">Identity Verification</h1>
        <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 text-center">
          <ShieldCheck className="h-12 w-12 text-green-400 mx-auto mb-3" />
          <h2 className="font-semibold text-[#f2f0eb] mb-2">Already Verified ✓</h2>
          <p className="text-sm text-[#f2f0eb]/60">Your identity is verified. You can book Yatras!</p>
        </div>
      </div>
    )
  }

  const handleAadhaarContinue = () => {
    if (!/^\d{12}$/.test(aadhaarNumber)) {
      setAadhaarError('Aadhaar must be exactly 12 digits')
      return
    }
    setAadhaarError('')
    setStep(1)
  }

  const handleUploadAadhaar = async () => {
    if (!aadhaarFile) return
    const path = await uploadAadhaar(aadhaarFile)
    if (path) {
      setAadhaarImagePath(path)
      toast.success('Aadhaar image uploaded!')
    }
  }

  const handleUploadSelfie = async () => {
    if (!selfieFile) return
    const path = await uploadSelfie(selfieFile)
    if (path) {
      setSelfieImagePath(path)
      toast.success('Selfie uploaded!')
    }
  }

  const handleSubmit = async () => {
    const success = await submitVerification({
      aadhaarNumber,
      aadhaarImagePath,
      selfieImagePath,
    })
    if (success) {
      await refreshProfile()
      toast.success('Verification submitted! 🙏')
      navigate('/portal/profile')
    }
  }

  const maskAadhaar = (num: string) =>
    num.length === 12 ? `XXXX XXXX ${num.slice(8)}` : num

  return (
    <div className="max-w-lg space-y-6">
      <h1 className="font-display text-3xl font-bold text-[#f2f0eb]">Identity Verification</h1>

      <StepIndicator current={step} total={STEPS.length} />

      <div className="p-6 rounded-2xl bg-[#121110] border border-amber-900/20">
        <h2 className="font-semibold text-[#f2f0eb] mb-1">Step {step + 1}: {STEPS[step]}</h2>

        {/* Step 1: Aadhaar number */}
        {step === 0 && (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-[#f2f0eb]/60">Enter your 12-digit Aadhaar number</p>
            <input
              type="text"
              maxLength={12}
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="123456789012"
              className="w-full px-4 py-3 rounded-xl bg-[#0a0908] border border-amber-900/30 text-[#f2f0eb] placeholder-[#f2f0eb]/20 focus:outline-none focus:border-amber-500/50 transition-colors tracking-widest text-lg font-mono"
            />
            {aadhaarError && <p className="text-red-400 text-sm">{aadhaarError}</p>}
            <button
              onClick={handleAadhaarContinue}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 2: Aadhaar image */}
        {step === 1 && (
          <div className="mt-4">
            <FileUploadField
              label="Upload a clear photo of your Aadhaar card (front side)"
              onFileSelect={setAadhaarFile}
              onUpload={handleUploadAadhaar}
              uploaded={Boolean(aadhaarImagePath)}
              loading={uploading}
            />
            <button
              onClick={() => setStep(2)}
              disabled={!aadhaarImagePath}
              className="mt-4 px-6 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 disabled:opacity-40 transition-colors"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 3: Selfie */}
        {step === 2 && (
          <div className="mt-4">
            <FileUploadField
              label="Take a clear selfie (face clearly visible, no sunglasses)"
              onFileSelect={setSelfieFile}
              onUpload={handleUploadSelfie}
              uploaded={Boolean(selfieImagePath)}
              loading={uploading}
            />
            <button
              onClick={() => setStep(3)}
              disabled={!selfieImagePath}
              className="mt-4 px-6 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 disabled:opacity-40 transition-colors"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 3 && (
          <div className="mt-4 space-y-5">
            <div className="p-4 rounded-xl bg-[#0a0908] border border-amber-900/20 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#f2f0eb]/50">Aadhaar Number</span>
                <span className="text-[#f2f0eb] font-mono">{maskAadhaar(aadhaarNumber)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#f2f0eb]/50">Aadhaar Image</span>
                <span className="text-green-400 text-xs flex items-center gap-1">
                  <Check className="h-3 w-3" /> Uploaded
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#f2f0eb]/50">Selfie</span>
                <span className="text-green-400 text-xs flex items-center gap-1">
                  <Check className="h-3 w-3" /> Uploaded
                </span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:from-amber-600 hover:to-orange-700 disabled:opacity-60 transition-all"
            >
              {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : '🙏 Submit for Verification'}
            </button>
          </div>
        )}
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep((s) => s - 1)}
          className="text-sm text-[#f2f0eb]/50 hover:text-[#f2f0eb] transition-colors"
        >
          ← Back
        </button>
      )}
    </div>
  )
}
