'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
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
        {/* 로고 */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: '28px',
              color: 'var(--deep-brown)',
            }}>Ongiro</span>
            <span style={{
              display: 'block',
              fontSize: '12px',
              color: 'var(--soft-gray)',
              letterSpacing: '0.15em',
              marginTop: '4px',
              fontFamily: 'var(--font-noto-serif)',
            }}>온기로</span>
          </Link>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-noto-serif)',
          fontSize: '20px',
          color: 'var(--deep-brown)',
          fontWeight: 400,
          marginBottom: '28px',
          textAlign: 'center',
        }}>
          로그인
        </h1>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: 'var(--mid-brown)', display: 'block', marginBottom: '6px', letterSpacing: '0.05em' }}>
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="example@email.com"
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid rgba(61,43,31,0.15)',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'var(--font-noto-sans)',
                color: 'var(--deep-brown)',
                background: 'white',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--mid-brown)', display: 'block', marginBottom: '6px', letterSpacing: '0.05em' }}>
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="비밀번호를 입력하세요"
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid rgba(61,43,31,0.15)',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'var(--font-noto-sans)',
                color: 'var(--deep-brown)',
                background: 'white',
              }}
            />
          </div>

          {error && (
            <p style={{
              fontSize: '13px',
              color: '#c0392b',
              background: '#fdf0ef',
              padding: '10px 14px',
              borderRadius: '6px',
              border: '1px solid #f5c6c2',
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? 'rgba(61,43,31,0.4)' : 'var(--deep-brown)',
              color: 'var(--cream)',
              border: 'none',
              borderRadius: '8px',
              padding: '14px',
              fontSize: '14px',
              letterSpacing: '0.08em',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-noto-serif)',
              marginTop: '4px',
              transition: 'background 0.2s',
            }}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(61,43,31,0.08)',
        }}>
          <p style={{ fontSize: '13px', color: 'var(--soft-gray)' }}>
            아직 계정이 없으신가요?{' '}
            <Link href="/auth/signup" style={{ color: 'var(--deep-brown)', fontWeight: 500, textDecoration: 'none' }}>
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
