import type { AppProps } from 'next/app'
import '@/css/global.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
