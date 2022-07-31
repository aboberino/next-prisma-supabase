import { Button, User } from '@geist-ui/core'
import React from 'react'
import { BiLogOutCircle } from 'react-icons/bi'
import { ThemeType } from '../types/ThemeType'
import { supabase } from '../utils/supabaseClient'
import SwitchTheme from './SwitchTheme'

type Props = {
    themeType: ThemeType
    switchThemes: () => void
}

export default function Navbar({ themeType, switchThemes }: Props) {

    async function handleLogout() {
        await supabase.auth.signOut()
    }
    console.log(supabase.auth.user())

    return (
        <nav style={{
            height: 64,
            backdropFilter: 'saturate(180%) blur(5px)',
            boxShadow: '0 0 15px 0 rgb(0 0 0 / 10%)',
            zIndex: 999,
            top: 0,
            left: 0,
            right: 0,
            paddingRight: 0,
            marginBottom: 32
        }}>

            <div style={{ height: '100%', display: 'flex', justifyContent: 'end', alignItems: 'center', gap: 12, paddingInline: 32 }}>
                <SwitchTheme themeType={themeType} switchThemes={switchThemes} />
                {supabase.auth.session() ? <>
                    <Button scale={2 / 3} auto px={0.6} icon={<BiLogOutCircle />} onClick={handleLogout}>Logout</Button>
                    <User src="https://unix.bio/assets/avatar.png" name={supabase.auth.user()?.email ?? ''} style={{textTransform: 'initial'}} />
                </> : undefined}
            </div>
        </nav >
    )
}