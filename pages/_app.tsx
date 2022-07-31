import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { useEffect, useState } from 'react'
import { ThemeType } from '../types/ThemeType'
import Navbar from '../components/Navbar'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'

const App = ({ Component, pageProps }: AppProps) => {

  const [session, setSession] = useState<Session | null>(null)
  const [themeType, setThemeType] = useState<ThemeType>('light')
  
  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, changedSession) => {
      setSession(changedSession)
    })
  }, [])

  const switchThemes = () => setThemeType(last => (last === 'light' ? 'dark' : 'light'))

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <Navbar  themeType={themeType} switchThemes={switchThemes}/>
      {session ? <Component {...pageProps} /> : <Auth />}
    </GeistProvider>
  )
}

export default App