import { useCallback, useState } from 'react'
import apiClient from '@/lib/apiClient'
import { toast } from 'sonner'

interface VerificationState {
  aadhaarNumber: string
  aadhaarImagePath: string | null
  selfieImagePath: string | null
}

export function useVerification() {
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const uploadAadhaar = useCallback(async (file: File): Promise<string | null> => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('aadhaarImage', file)
      const { data } = await apiClient.post('/api/users/upload-aadhaar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return data.path as string
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ??
        'Failed to upload Aadhaar image'
      toast.error(msg)
      return null
    } finally {
      setUploading(false)
    }
  }, [])

  const uploadSelfie = useCallback(async (file: File): Promise<string | null> => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('selfieImage', file)
      const { data } = await apiClient.post('/api/users/upload-selfie', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return data.path as string
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ??
        'Failed to upload selfie'
      toast.error(msg)
      return null
    } finally {
      setUploading(false)
    }
  }, [])

  const submitVerification = useCallback(
    async (state: VerificationState): Promise<boolean> => {
      setSubmitting(true)
      try {
        await apiClient.post('/api/users/verification/submit', {
          aadhaarNumber: state.aadhaarNumber,
          aadhaarImagePath: state.aadhaarImagePath,
          selfieImagePath: state.selfieImagePath,
        })
        return true
      } catch (err: unknown) {
        const msg =
          (err as { response?: { data?: { error?: string } } })?.response?.data?.error ??
          'Failed to submit verification'
        toast.error(msg)
        return false
      } finally {
        setSubmitting(false)
      }
    },
    [],
  )

  return { uploading, submitting, uploadAadhaar, uploadSelfie, submitVerification }
}
