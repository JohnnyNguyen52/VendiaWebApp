import type { AppProps } from 'next/app'
import '@/css/global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider loginUrl="/pages/api/auth/login" profileUrl="/pages/api/auth/me">
        <Component {...pageProps} />
    </UserProvider>
  
  )
}
