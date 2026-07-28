'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface Memorial {
  id: string
  name: string
  born: string | null
  died: string | null
  is_pet: boolean
  pet_type: string | null
  accent_color: string
  created_at: string
}

interface Props {
  user: User
  memorials: Memorial[]
}

export default function DashboardClient({ user, memorials: initialMemorials }: Props) {
  const router = useRouter()
  const [memorials, setMemorials] = useState(initialMemorials)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', born: '', died: '',
    is_pet: false, pet_type: '',
    quote: '', intro: '',
  })

  const userName = user.user_metadata?.name || user.email?.split('@')[0] || '회원'

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()

    const { data, error } = await supabase.from('memorials').insert({
      user_id: user.id,
      name: form.name,
      born: form.born || null,
      died: form.died || null,
      is_pet: form.is_pet,
      pet_type: form.is_pet ? form.pet_type : null,
      quote: form.quote || null,
      intro: form.intro || null,
      accent_color: form.is_pet ? '#8A9A7E' : '#C8A96E',
    }).select().single()

    if (!error && data) {
      setMemorials(prev => [data, ...prev])
      setShowForm(false)
      setForm({ name: '', born: '', died: '', is_pet: false, pet_type: '', quote: '', intro: '' })
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    border: '1px solid rgba(61,43,31,0.15)', borderRadius: '8px',
    fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const,
    fontFamily: 'var(--font-noto-sans)', color: 'var(--deep-brown)',
    background: 'white',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--warm-white)' }}>
      {/* 헤더 */}
      <header style={{
        background: 'var(--deep-brown)',
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '20px', color: 'var(--cream)' }}>
            Ongiro
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '13px', color: 'var(--gold-light)', opacity: 0.8 }}>
            {userName}님
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid rgba(245,240,232,0.2)',
              borderRadius: '6px',
              padding: '7px 16px',
              fontSize: '12px',
              color: 'var(--cream)',
              cursor: 'pointer',
              letterSpacing: '0.05em',
            }}
          >
            로그아웃
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 24px' }}>
        {/* 상단 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-noto-serif)',
              fontSize: '26px', fontWeight: 300,
              color: 'var(--deep-brown)', marginBottom: '6px',
            }}>
              내 추모 공간
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--soft-gray)' }}>
              {memorials.length}개의 추모 공간이 있습니다
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: 'var(--deep-brown)',
              color: 'var(--cream)', border: 'none',
              borderRadius: '8px', padding: '12px 24px',
              fontSize: '13px', cursor: 'pointer',
              letterSpacing: '0.05em', fontFamily: 'var(--font-noto-serif)',
            }}
          >
            + 추모 공간 만들기
          </button>
        </div>

        {/* 추모 공간 목록 */}
        {memorials.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 20px',
            background: 'white', borderRadius: '16px',
            border: '2px dashed rgba(61,43,31,0.1)',
          }}>
            <p style={{ fontSize: '40px', marginBottom: '16px' }}>🌸</p>
            <p style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '17px', color: 'var(--deep-brown)', marginBottom: '8px' }}>
              아직 추모 공간이 없습니다
            </p>
            <p style={{ fontSize: '13px', color: 'var(--soft-gray)', marginBottom: '24px' }}>
              소중한 분을 위한 디지털 추모 공간을 만들어보세요
            </p>
            <button
              onClick={() => setShowForm(true)}
              style={{
                background: 'var(--deep-brown)', color: 'var(--cream)',
                border: 'none', borderRadius: '8px',
                padding: '12px 28px', fontSize: '14px', cursor: 'pointer',
              }}
            >
              첫 추모 공간 만들기
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {memorials.map((m) => (
              <div key={m.id} style={{
                background: 'white', borderRadius: '16px',
                overflow: 'hidden', boxShadow: '0 2px 16px rgba(61,43,31,0.07)',
              }}>
                <div style={{
                  background: 'var(--deep-brown)', padding: '28px',
                  textAlign: 'center',
                }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: m.accent_color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 12px',
                    fontSize: m.is_pet ? '24px' : '20px',
                    color: 'white', fontFamily: 'var(--font-noto-serif)',
                  }}>
                    {m.is_pet ? '🐾' : m.name[0]}
                  </div>
                  <p style={{ color: 'var(--cream)', fontFamily: 'var(--font-noto-serif)', fontSize: '17px', marginBottom: '4px' }}>
                    {m.name}
                  </p>
                  {m.is_pet && m.pet_type && (
                    <p style={{ fontSize: '11px', color: 'var(--gold-light)', opacity: 0.8 }}>{m.pet_type}</p>
                  )}
                  {(m.born || m.died) && (
                    <p style={{ fontSize: '12px', color: 'var(--gold-light)', opacity: 0.7, marginTop: '4px' }}>
                      {m.born} {m.born && m.died && '—'} {m.died}
                    </p>
                  )}
                </div>
                <div style={{ padding: '16px 20px', display: 'flex', gap: '8px' }}>
                  <Link
                    href={`/memorial/${m.id}`}
                    style={{
                      flex: 1, textAlign: 'center', padding: '9px',
                      border: '1px solid rgba(61,43,31,0.15)', borderRadius: '6px',
                      fontSize: '12px', color: 'var(--deep-brown)', textDecoration: 'none',
                    }}
                  >
                    방문하기
                  </Link>
                  <button
                    style={{
                      flex: 1, padding: '9px', background: 'var(--deep-brown)',
                      color: 'var(--cream)', border: 'none', borderRadius: '6px',
                      fontSize: '12px', cursor: 'pointer',
                    }}
                  >
                    관리
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 추모 공간 생성 모달 */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px',
        }}>
          <div style={{
            background: 'white', borderRadius: '20px',
            padding: '40px', width: '100%', maxWidth: '480px',
            maxHeight: '90vh', overflowY: 'auto',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-noto-serif)', fontSize: '20px',
              color: 'var(--deep-brown)', fontWeight: 400, marginBottom: '28px',
            }}>
              새 추모 공간 만들기
            </h2>

            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* 반려동물 여부 */}
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { label: '👤 사람', value: false },
                  { label: '🐾 반려동물', value: true },
                ].map(({ label, value }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, is_pet: value }))}
                    style={{
                      flex: 1, padding: '10px',
                      border: `1px solid ${form.is_pet === value ? 'var(--deep-brown)' : 'rgba(61,43,31,0.15)'}`,
                      borderRadius: '8px', fontSize: '13px', cursor: 'pointer',
                      background: form.is_pet === value ? 'var(--deep-brown)' : 'white',
                      color: form.is_pet === value ? 'var(--cream)' : 'var(--mid-brown)',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--mid-brown)', display: 'block', marginBottom: '6px' }}>
                  {form.is_pet ? '반려동물 이름 *' : '성함 *'}
                </label>
                <input
                  style={inputStyle}
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                  placeholder={form.is_pet ? '예: 보리, 나비' : '예: 홍길동'}
                />
              </div>

              {form.is_pet && (
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--mid-brown)', display: 'block', marginBottom: '6px' }}>
                    종류
                  </label>
                  <input
                    style={inputStyle}
                    value={form.pet_type}
                    onChange={e => setForm(f => ({ ...f, pet_type: e.target.value }))}
                    placeholder="예: 골든 리트리버, 코리안 숏헤어"
                  />
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--mid-brown)', display: 'block', marginBottom: '6px' }}>
                    생년월일
                  </label>
                  <input type="date" style={inputStyle}
                    value={form.born}
                    onChange={e => setForm(f => ({ ...f, born: e.target.value }))}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--mid-brown)', display: 'block', marginBottom: '6px' }}>
                    {form.is_pet ? '무지개다리 날짜' : '기일'}
                  </label>
                  <input type="date" style={inputStyle}
                    value={form.died}
                    onChange={e => setForm(f => ({ ...f, died: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--mid-brown)', display: 'block', marginBottom: '6px' }}>
                  추모 문구
                </label>
                <input
                  style={inputStyle}
                  value={form.quote}
                  onChange={e => setForm(f => ({ ...f, quote: e.target.value }))}
                  placeholder="한 줄 추모 문구를 입력하세요"
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--mid-brown)', display: 'block', marginBottom: '6px' }}>
                  소개글
                </label>
                <textarea
                  style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                  value={form.intro}
                  onChange={e => setForm(f => ({ ...f, intro: e.target.value }))}
                  placeholder="간단한 소개를 적어주세요"
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    flex: 1, padding: '13px',
                    border: '1px solid rgba(61,43,31,0.15)',
                    borderRadius: '8px', fontSize: '14px',
                    cursor: 'pointer', background: 'white',
                    color: 'var(--mid-brown)',
                  }}
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 2, padding: '13px',
                    background: loading ? 'rgba(61,43,31,0.4)' : 'var(--deep-brown)',
                    color: 'var(--cream)', border: 'none',
                    borderRadius: '8px', fontSize: '14px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: 'var(--font-noto-serif)',
                  }}
                >
                  {loading ? '생성 중...' : '추모 공간 만들기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
