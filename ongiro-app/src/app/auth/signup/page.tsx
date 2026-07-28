'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }
    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message === 'User already registered'
        ? '이미 가입된 이메일입니다.'
        : '회원가입에 실패했습니다. 다시 시도해주세요.')
      setLoading(false)
      return
    }

    setDone(true)
    setLoading(false)
  }

  if (done) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--deep-brown)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '420px',
          background: 'var(--warm-white)',
          borderRadius: '20px',
          padding: '48px 40px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>✉️</div>
          <h2 style={{
            fontFamily: 'var(--font-noto-serif)',
            fontSize: '20px',
            color: 'var(--deep-brown)',
            fontWeight: 400,
            marginBottom: '16px',
          }}>
            이메일을 확인해주세요
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--soft-gray)', lineHeight: '1.8' }}>
            <strong style={{ color: 'var(--mid-brown)' }}>{email}</strong>로<br />
            인증 링크를 보내드렸습니다.<br />
            이메일의 링크를 클릭하면 가입이 완료됩니다.
          </p>
          <Link
            href="/auth/login"
            style={{
              display: 'inline-block',
              marginTop: '28px',
              padding: '12px 32px',
              background: 'var(--deep-brown)',
              color: 'var(--cream)',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
            }}
          >
            로그인 하러 가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--deep-brown)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'var(--warm-white)',
        borderRadius: '20px',
        padding: '48px 40px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '28px', color: 'var(--deep-brown)' }}>Ongiro</span>
            <span style={{
              display: 'block', fontSize: '12px', color: 'var(--soft-gray)',
              letterSpacing: '0.15em', marginTop: '4px', fontFamily: 'var(--font-noto-serif)',
            }}>온기로</span>
          </Link>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-noto-serif)', fontSize: '20px',
          color: 'var(--deep-brown)', fontWeight: 400,
          marginBottom: '28px', textAlign: 'center',
        }}>
          회원가입
        </h1>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { label: '이름', value: name, setter: setName, type: 'text', placeholder: '홍길동' },
            { label: '이메일', value: email, setter: setEmail, type: 'email', placeholder: 'example@email.com' },
            { label: '비밀번호', value: password, setter: setPassword, type: 'password', placeholder: '6자 이상' },
            { label: '비밀번호 확인', value: confirm, setter: setConfirm, type: 'password', placeholder: '비밀번호를 다시 입력하세요' },
          ].map(({ label, value, setter, type, placeholder }) => (
            <div key={label}>
              <label style={{ fontSize: '12px', color: 'var(--mid-brown)', display: 'block', marginBottom: '6px', letterSpacing: '0.05em' }}>
                {label}
              </label>
              <input
                type={type}
                value={value}
                onChange={e => setter(e.target.value)}
                required
                placeholder={placeholder}
                style={{
                  width: '100%', padding: '12px 14px',
                  border: '1px solid rgba(61,43,31,0.15)', borderRadius: '8px',
                  fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                  fontFamily: 'var(--font-noto-sans)', color: 'var(--deep-brown)',
                  background: 'white',
                }}
              />
            </div>
          ))}

          {error && (
            <p style={{
              fontSize: '13px', color: '#c0392b',
              background: '#fdf0ef', padding: '10px 14px',
              borderRadius: '6px', border: '1px solid #f5c6c2',
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? 'rgba(61,43,31,0.4)' : 'var(--deep-brown)',
              color: 'var(--cream)', border: 'none', borderRadius: '8px',
              padding: '14px', fontSize: '14px', letterSpacing: '0.08em',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-noto-serif)', marginTop: '4px',
            }}
          >
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(61,43,31,0.08)' }}>
          <p style={{ fontSize: '13px', color: 'var(--soft-gray)' }}>
            이미 계정이 있으신가요?{' '}
            <Link href="/auth/login" style={{ color: 'var(--deep-brown)', fontWeight: 500, textDecoration: 'none' }}>
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
