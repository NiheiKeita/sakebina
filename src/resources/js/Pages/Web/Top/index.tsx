import React, { useEffect, useState } from 'react'
import { Head } from '@inertiajs/react'
import WebLayout from '@/Layouts/WebLayout'
import axios from 'axios'

// 色・アニメーションの選択肢
const COLORS = [
  { value: '#f00', label: '赤' },
  { value: '#00f', label: '青' },
  { value: '#0c0', label: '緑' },
  { value: '#000', label: '黒' },
  { value: '#fff', label: '白' },
  { value: '#ff0', label: '黄' },
  { value: '#f0f', label: 'ピンク' },
  { value: '#0ff', label: '水' },
]
const ANIMATIONS = [
  { value: 'none', label: 'なし' },
  { value: 'shake', label: '震える' },
  { value: 'explode', label: '爆発' },
  { value: 'wind', label: '風に舞う' },
  { value: 'fade', label: 'フェード' },
]

// 1文字の型
interface CharSetting {
  char: string
  color: string
  animation: string
}

export default function SakebinaTop() {
  // 1文字ごとの状態
  const [chars, setChars] = useState<CharSetting[]>([])
  const [input, setInput] = useState('')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [preview, setPreview] = useState(true)
  const [posting, setPosting] = useState(false)
  const [error, setError] = useState('')

  // タイムライン
  const [shouts, setShouts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 入力欄が変わったらcharsも更新
  useEffect(() => {
    const arr = input.slice(0, 10).split('').map((c, i) => chars[i] ? { ...chars[i], char: c } : { char: c, color: '#f00', animation: 'none' })
    setChars(arr)
  }, [input])

  // 投稿取得
  const fetchShouts = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/shouts')
      setShouts(res.data.data || [])
    } catch (e) {
      setError('タイムライン取得に失敗しました')
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchShouts()
  }, [])

  // 投稿処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPosting(true)
    setError('')
    try {
      await axios.post('/api/shouts', {
        text: chars
      })
      setInput('')
      setChars([])
      fetchShouts()
    } catch (e: any) {
      setError(e?.response?.data?.errors?.text?.[0] || '投稿に失敗しました')
    }
    setPosting(false)
  }

  // 1文字の色・アニメーション変更
  const updateChar = (idx: number, key: 'color' | 'animation', value: string) => {
    setChars(chars => chars.map((c, i) => i === idx ? { ...c, [key]: value } : c))
  }

  return (
    <WebLayout>
      <Head title="さけびな" />
      <div className="mx-auto max-w-lg py-8">
        <h1 className="mb-4 text-center text-3xl font-bold">さけびな</h1>
        <form onSubmit={handleSubmit} className="mb-8 rounded bg-white p-4 shadow">
          <div className="mb-2">
            <input
              type="text"
              maxLength={10}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="叫びたいこと（最大10文字）"
              className="w-full rounded border px-3 py-2 text-lg"
              required
            />
          </div>
          <div className="mb-2 flex flex-wrap gap-1">
            {chars.map((c, i) => (
              <span
                key={i}
                style={{
                  color: c.color,
                  border: selectedIndex === i ? '2px solid #333' : '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '0.2em 0.4em',
                  cursor: 'pointer',
                  background: selectedIndex === i ? '#f0f0f0' : 'transparent',
                  fontSize: '1.5rem',
                  marginRight: '2px',
                  display: 'inline-block',
                  animation:
                    c.animation === 'shake'
                      ? 'shake 0.5s infinite'
                      : c.animation === 'explode'
                        ? 'explode 1s'
                        : c.animation === 'wind'
                          ? 'wind 1s infinite'
                          : c.animation === 'fade'
                            ? 'fade 2s'
                            : 'none',
                }}
                onClick={() => setSelectedIndex(i)}
              >
                {c.char}
              </span>
            ))}
          </div>
          {selectedIndex !== null && chars[selectedIndex] && (
            <div className="mb-2 flex items-center gap-2">
              <span>色:</span>
              <select
                value={chars[selectedIndex].color}
                onChange={e => updateChar(selectedIndex, 'color', e.target.value)}
                className="rounded border px-2 py-1"
              >
                {COLORS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              <span>アニメ:</span>
              <select
                value={chars[selectedIndex].animation}
                onChange={e => updateChar(selectedIndex, 'animation', e.target.value)}
                className="rounded border px-2 py-1"
              >
                {ANIMATIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              <button type="button" className="ml-2 text-xs text-gray-500" onClick={() => setSelectedIndex(null)}>閉じる</button>
            </div>
          )}
          <div className="mb-2">
            <label className="inline-flex items-center">
              <input type="checkbox" checked={preview} onChange={e => setPreview(e.target.checked)} />
              <span className="ml-2">リアルタイムプレビュー</span>
            </label>
          </div>
          {preview && (
            <div className="min-h-[3.5rem] rounded bg-gray-100 p-4 text-center transition-all duration-300">
              {chars.length === 0 ? (
                <span className="text-gray-400">ここに叫びが表示されます</span>
              ) : (
                chars.map((c, i) => (
                  <span
                    key={i}
                    style={{
                      color: c.color,
                      fontSize: '2rem',
                      marginRight: '2px',
                      display: 'inline-block',
                      animation:
                        c.animation === 'shake'
                          ? 'shake 0.5s infinite'
                          : c.animation === 'explode'
                            ? 'explode 1s'
                            : c.animation === 'wind'
                              ? 'wind 1s infinite'
                              : c.animation === 'fade'
                                ? 'fade 2s'
                                : 'none',
                    }}
                  >
                    {c.char}
                  </span>
                ))
              )}
            </div>
          )}
          {error && <div className="mb-2 text-red-500">{error}</div>}
          <button type="submit" className="w-full rounded bg-blue-600 py-2 font-bold text-white" disabled={posting || chars.length === 0}>
            {posting ? '投稿中...' : '叫ぶ！'}
          </button>
        </form>
        <h2 className="mb-2 text-xl font-bold">みんなの叫び</h2>
        {loading ? <div>読み込み中...</div> : (
          <div className="space-y-4">
            {shouts.map((shout: any) => (
              <div key={shout.id} className="flex items-center gap-2 rounded bg-gray-100 p-3 shadow">
                <span className="text-2xl">{shout.text.map((c: any, i: number) => (
                  <span
                    key={i}
                    style={{
                      color: c.color,
                      fontSize: '1.5rem',
                      marginRight: '2px',
                      display: 'inline-block',
                      animation:
                        c.animation === 'shake'
                          ? 'shake 0.5s infinite'
                          : c.animation === 'explode'
                            ? 'explode 1s'
                            : c.animation === 'wind'
                              ? 'wind 1s infinite'
                              : c.animation === 'fade'
                                ? 'fade 2s'
                                : 'none',
                    }}
                  >
                    {c.char}
                  </span>
                ))}</span>
                <span className="ml-auto text-xs text-gray-500">{new Date(shout.created_at).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* 簡易アニメーション用CSS */}
      <style>{`
        @keyframes shake { 0%{transform:translateX(0);} 25%{transform:translateX(-5px);} 50%{transform:translateX(5px);} 75%{transform:translateX(-5px);} 100%{transform:translateX(0);} }
        @keyframes explode { 0%{transform:scale(1);} 50%{transform:scale(1.3) rotate(10deg);} 100%{transform:scale(0.8) rotate(-10deg);} }
        @keyframes wind { 0%{transform:translateX(0);} 50%{transform:translateX(20px) rotate(5deg);} 100%{transform:translateX(0);} }
        @keyframes fade { 0%{opacity:1;} 100%{opacity:0.2;} }
      `}</style>
    </WebLayout>
  )
}
