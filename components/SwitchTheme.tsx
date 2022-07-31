import { Button } from '@geist-ui/core'
import React from 'react'

import { BiSun, BiMoon } from 'react-icons/bi'
import { ThemeType } from '../types/ThemeType'

type Props = {
    themeType: ThemeType
    switchThemes: () => void
}

export default function SwitchTheme({ themeType, switchThemes }: Props) {
    return (
        <Button 
        auto 
        scale={2 / 3} 
        px={0.6} 
        iconRight={themeType === 'light' ? <BiSun /> : <BiMoon />} 
        onClick={switchThemes}
        />
    )
}