import React, { useEffect, useState } from 'react'
import { Head } from '@inertiajs/react'
import WebLayout from '@/Layouts/WebLayout'
import axios from 'axios'

// 感情テーマ・フォント・背景・アニメーションの選択肢
const EMOTIONS = [
  { value: '怒', label: '怒' },
  { value: '哀', label: '哀' },
  { value: '喜', label: '喜' },
  { value: '恐', label: '恐' },
]
const FONTS = [
  { value: 'default', label: '標準' },
  { value: 'serif', label: '明朝' },
  { value: 'rounded', label: '丸ゴシック' },
  { value: 'impact', label: 'インパクト' },
]
const BACKGROUNDS = [
  { value: 'red', label: '赤' },
  { value: 'blue', label: '青' },
  { value: 'gradient', label: 'グラデ' },
  { value: 'pattern', label: 'パターン' },
]
const ANIMATIONS = [
  { value: 'shake', label: '震える' },
  { value: 'explode', label: '爆発' },
  { value: 'wind', label: '風に舞う' },
  { value: 'fade', label: 'フェード' },
]

export default function SakebinaTop() {
  // 投稿フォームの状態
  const [text, setText] = useState('')
  const [emotion, setEmotion] = useState('怒')
  const [font, setFont] = useState('default')
  const [background, setBackground] = useState('red')
  const [animation, setAnimation] = useState('shake')
  const [preview, setPreview] = useState(true)
  const [posting, setPosting] = useState(false)
  const [error, setError] = useState('')

  // タイムライン
  const [shouts, setShouts] = useState([])
  const [loading, setLoading] = useState(true)

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
        text, emotion, font, background, animation
      })
      setText('')
      fetchShouts()
    } catch (e: any) {
      setError(e?.response?.data?.errors?.text?.[0] || '投稿に失敗しました')
    }
    setPosting(false)
  }

  // プレビュー用スタイル
  const previewStyle = {
    fontFamily: font === 'serif' ? 'serif' : font === 'rounded' ? 'Rounded Mplus 1c' : font === 'impact' ? 'Impact' : 'sans-serif',
    background: background === 'gradient' ? 'linear-gradient(90deg, #f00, #00f)' : background === 'pattern' ? 'repeating-linear-gradient(45deg, #eee, #eee 10px, #ccc 10px, #ccc 20px)' : background,
    color: background === 'red' ? '#fff' : '#222',
    padding: '2rem',
    borderRadius: '1rem',
    fontSize: '2rem',
    textAlign: 'center' as const,
    margin: '1rem 0',
    animation: animation === 'shake' ? 'shake 0.5s infinite' : animation === 'explode' ? 'explode 1s' : animation === 'wind' ? 'wind 1s infinite' : animation === 'fade' ? 'fade 2s' : 'none',
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
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="叫びたいこと（最大10文字）"
              className="w-full rounded border px-3 py-2 text-lg"
              required
            />
          </div>
          <div className="mb-2 flex flex-wrap gap-2">
            <select value={emotion} onChange={e => setEmotion(e.target.value)} className="rounded border px-2 py-1">
              {EMOTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            <select value={font} onChange={e => setFont(e.target.value)} className="rounded border px-2 py-1">
              {FONTS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            <select value={background} onChange={e => setBackground(e.target.value)} className="rounded border px-2 py-1">
              {BACKGROUNDS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            <select value={animation} onChange={e => setAnimation(e.target.value)} className="rounded border px-2 py-1">
              {ANIMATIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className="mb-2">
            <label className="inline-flex items-center">
              <input type="checkbox" checked={preview} onChange={e => setPreview(e.target.checked)} />
              <span className="ml-2">リアルタイムプレビュー</span>
            </label>
          </div>
          {preview && (
            <div style={previewStyle} className="transition-all duration-300">
              {text || 'ここに叫びが表示されます'}
            </div>
          )}
          {error && <div className="mb-2 text-red-500">{error}</div>}
          <button type="submit" className="w-full rounded bg-blue-600 py-2 font-bold text-white" disabled={posting || !text}>
            {posting ? '投稿中...' : '叫ぶ！'}
          </button>
        </form>
        <h2 className="mb-2 text-xl font-bold">みんなの叫び</h2>
        {loading ? <div>読み込み中...</div> : (
          <div className="space-y-4">
            {shouts.map((shout: any) => (
              <div key={shout.id} className="flex items-center gap-2 rounded bg-gray-100 p-3 shadow">
                <span className="text-2xl">{shout.emotion}</span>
                <span style={{ fontFamily: shout.font }} className="text-lg font-bold">{shout.text}</span>
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
