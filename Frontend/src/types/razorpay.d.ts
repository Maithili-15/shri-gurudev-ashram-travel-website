// Razorpay global type declaration — prevents TypeScript errors when using window.Razorpay

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any
  }
}

export {}
