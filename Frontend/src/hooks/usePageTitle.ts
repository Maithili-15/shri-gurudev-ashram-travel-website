import { useEffect } from 'react'

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} — Shri Gurudev Ashram`
    return () => {
      document.title = 'Shri Gurudev Ashram'
    }
  }, [title])
}
