import { Button, Card, Divider, Input, Text, useToasts } from "@geist-ui/core"
import { useEffect, useState } from "react"
import { supabase } from "../utils/supabaseClient"
import type { ToastInput } from "@geist-ui/core"
import Link from "next/link"

export default function Auth() {

    const [mode, setMode] = useState<'SIGNIN' | 'SIGNUP'>('SIGNIN')


    function handleChangeMode(e: any) {
        setMode(old => old === 'SIGNIN' ? 'SIGNUP' : 'SIGNIN')
    }

    return (
        <Card style={{ width: 350, textAlign: 'center', margin: '0 auto' }}>
            <Card.Content>
                {mode === 'SIGNIN' ? 'Sign In' : 'Sign Up'}
            </Card.Content>
            <Divider h="1px" my={0} />
            {mode === 'SIGNIN' ? <Login /> : <Register />}
            <div onClick={handleChangeMode} style={{ color: '#0070f3', cursor: 'pointer', marginBottom: 12 }}>{mode === 'SIGNUP' ? 'Sign In' : 'Sign Up'}</div>
        </Card>
    )
}

function Login() {

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setToast } = useToasts()

    async function handleLogin() {
        try {
            setLoading(true)
            const { user, error } = await supabase.auth.signIn({ email, password })
            console.log(user)
            if (error) throw error
            setToast({ text: 'Login successful', type: 'success' })
        } catch (error: any) {
            setToast({
                text: error.error_description || error.message,
                type: 'error',
            })
        } finally {
            setLoading(false)
        }
    }

    return (<>
        <Card.Content style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Input width="100%" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input width="100%" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <Button loading={loading} auto type="secondary" onClick={handleLogin}>Sign In</Button>
        </Card.Content>
    </>)
}

function Register() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVerif, setPasswordVerif] = useState('')

    const { setToast } = useToasts()

    async function handleRegister() {
        try {
            setLoading(true)

            if (password !== passwordVerif) {
                throw new Error('Passwords do not match')
            }

            const { user, error } = await supabase.auth.signUp({ email, password })
            console.log(user)
            if (error) throw error
            setToast({ text: 'Login successful', type: 'success' })
        } catch (error: any) {
            setToast({
                text: error.error_description || error.message,
                type: 'error',
            })
        } finally {
            setLoading(false)
        }
    }

    return (<>
        <Card.Content style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Input width="100%" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input width="100%" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input width="100%" placeholder="Your password again" value={passwordVerif} onChange={(e) => setPasswordVerif(e.target.value)} />

            <Button loading={loading} auto type="secondary" onClick={handleRegister}>Sign Up 🚀</Button>
        </Card.Content>
    </>)
}