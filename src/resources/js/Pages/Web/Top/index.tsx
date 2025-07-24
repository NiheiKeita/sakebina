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
  { value: 'shake2', label: 'ブルブル' },
  { value: 'explode', label: '爆発' },
  { value: 'wind', label: '風に舞う' },
  { value: 'fade', label: 'フェード' },
  { value: 'yell', label: '叫ぶ' },
  { value: 'cry', label: '悲しい' },
  { value: 'fold', label: '折れる' },
  { value: 'jump', label: 'ジャンプ' },
  { value: 'bigYell', label: '激しく右向きに叫ぶ' },
  { value: 'tilt', label: '左右に傾く' },
  { value: 'spin', label: 'ぐるぐる回る' },
  { value: 'bounce', label: 'バウンド' },
  { value: 'wave', label: '波打つ' },
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
  const [isModalOpen, setIsModalOpen] = useState(false)

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
      setIsModalOpen(false)
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

  // モーダルの外側クリックで閉じる
  const handleModalBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setIsModalOpen(false)
  }

  return (
    <WebLayout>
      <Head title="さけびな" />
      {/* タイムラインのみ常時表示 */}
      <div className="mx-auto max-w-lg py-8">
        <h1 className="mb-4 text-center text-3xl font-bold">さけびな</h1>
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
                          : c.animation === 'shake2'
                            ? 'shake2 0.25s infinite'
                            : c.animation === 'explode'
                              ? 'explode 1s infinite'
                              : c.animation === 'wind'
                                ? 'wind 1s infinite'
                                : c.animation === 'fade'
                                  ? 'fade 2s infinite'
                                  : c.animation === 'yell'
                                    ? 'yell 0.7s infinite'
                                    : c.animation === 'cry'
                                      ? 'cry 1.2s infinite'
                                      : c.animation === 'fold'
                                        ? 'fold 1.2s infinite'
                                        : c.animation === 'jump'
                                          ? 'jump 0.7s infinite'
                                          : c.animation === 'bigYell'
                                            ? 'bigYell 0.8s infinite'
                                            : c.animation === 'tilt'
                                              ? 'tilt 1.2s infinite'
                                              : c.animation === 'spin'
                                                ? 'spin 1.2s infinite linear'
                                                : c.animation === 'bounce'
                                                  ? 'bounce 0.8s infinite'
                                                  : c.animation === 'wave'
                                                    ? 'wave 1.2s infinite'
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
      {/* 右下のプラスボタン */}
      <button
        className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 via-red-400 to-yellow-400 text-4xl text-white shadow-lg transition-transform duration-200 hover:scale-110 focus:outline-none"
        onClick={() => setIsModalOpen(true)}
        aria-label="叫びを投稿"
      >
        ＋
      </button>
      {/* 投稿モーダル */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={handleModalBgClick}
        >
          <div className="animate-fadeIn relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <button
              className="absolute right-2 top-2 text-2xl font-bold text-gray-400 hover:text-gray-700 focus:outline-none"
              onClick={() => setIsModalOpen(false)}
              aria-label="閉じる"
            >
              ×
            </button>
            <form onSubmit={handleSubmit}>
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
                          : c.animation === 'shake2'
                            ? 'shake2 0.25s infinite'
                            : c.animation === 'explode'
                              ? 'explode 1s infinite'
                              : c.animation === 'wind'
                                ? 'wind 1s infinite'
                                : c.animation === 'fade'
                                  ? 'fade 2s infinite'
                                  : c.animation === 'yell'
                                    ? 'yell 0.7s infinite'
                                    : c.animation === 'cry'
                                      ? 'cry 1.2s infinite'
                                      : c.animation === 'fold'
                                        ? 'fold 1.2s infinite'
                                        : c.animation === 'jump'
                                          ? 'jump 0.7s infinite'
                                          : c.animation === 'bigYell'
                                            ? 'bigYell 0.8s infinite'
                                            : c.animation === 'tilt'
                                              ? 'tilt 1.2s infinite'
                                              : c.animation === 'spin'
                                                ? 'spin 1.2s infinite linear'
                                                : c.animation === 'bounce'
                                                  ? 'bounce 0.8s infinite'
                                                  : c.animation === 'wave'
                                                    ? 'wave 1.2s infinite'
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
                              : c.animation === 'shake2'
                                ? 'shake2 0.25s infinite'
                                : c.animation === 'explode'
                                  ? 'explode 1s infinite'
                                  : c.animation === 'wind'
                                    ? 'wind 1s infinite'
                                    : c.animation === 'fade'
                                      ? 'fade 2s infinite'
                                      : c.animation === 'yell'
                                        ? 'yell 0.7s infinite'
                                        : c.animation === 'cry'
                                          ? 'cry 1.2s infinite'
                                          : c.animation === 'fold'
                                            ? 'fold 1.2s infinite'
                                            : c.animation === 'jump'
                                              ? 'jump 0.7s infinite'
                                              : c.animation === 'bigYell'
                                                ? 'bigYell 0.8s infinite'
                                                : c.animation === 'tilt'
                                                  ? 'tilt 1.2s infinite'
                                                  : c.animation === 'spin'
                                                    ? 'spin 1.2s infinite linear'
                                                    : c.animation === 'bounce'
                                                      ? 'bounce 0.8s infinite'
                                                      : c.animation === 'wave'
                                                        ? 'wave 1.2s infinite'
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
              <button type="submit" className="mt-4 w-full rounded bg-blue-600 py-2 font-bold text-white" disabled={posting || chars.length === 0}>
                {posting ? '投稿中...' : '叫ぶ！'}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* 簡易アニメーション用CSS */}
      <style>{`
        @keyframes shake { 0%{transform:translateX(0);} 25%{transform:translateX(-5px);} 50%{transform:translateX(5px);} 75%{transform:translateX(-5px);} 100%{transform:translateX(0);} }
        @keyframes shake2 { 0%{transform:translateX(0);} 10%{transform:translateX(-8px);} 20%{transform:translateX(8px);} 30%{transform:translateX(-8px);} 40%{transform:translateX(8px);} 50%{transform:translateX(-8px);} 60%{transform:translateX(8px);} 70%{transform:translateX(-8px);} 80%{transform:translateX(8px);} 90%{transform:translateX(-8px);} 100%{transform:translateX(0);} }
        @keyframes explode { 0%{transform:scale(1);} 50%{transform:scale(1.3) rotate(10deg);} 100%{transform:scale(0.8) rotate(-10deg);} }
        @keyframes wind { 0%{transform:translateX(0);} 50%{transform:translateX(20px) rotate(5deg);} 100%{transform:translateX(0);} }
        @keyframes fade { 0%{opacity:1;} 100%{opacity:0.2;} }
        @keyframes yell { 0%{transform:scale(1);} 20%{transform:scale(1.5) skewX(-10deg); color:#ff0;} 40%{transform:scale(1.2) skewX(10deg); color:#f00;} 60%{transform:scale(1.4) skewX(-8deg); color:#ff0;} 80%{transform:scale(1.1) skewX(8deg); color:#f00;} 100%{transform:scale(1);} }
        @keyframes cry { 0%{transform:translateY(0);} 20%{transform:translateY(10px) scaleY(0.9); color:#00f;} 40%{transform:translateY(20px) scaleY(0.8); color:#00f;} 60%{transform:translateY(10px) scaleY(0.9); color:#00f;} 80%{transform:translateY(0);} 100%{transform:translateY(0);} }
        @keyframes fold { 0%{transform:rotateX(0);} 20%{transform:rotateX(60deg);} 40%{transform:rotateX(120deg);} 60%{transform:rotateX(180deg);} 80%{transform:rotateX(120deg);} 100%{transform:rotateX(0);} }
        @keyframes jump { 0%{transform:translateY(0);} 20%{transform:translateY(-20px) scaleY(1.2);} 40%{transform:translateY(-30px) scaleY(0.8);} 60%{transform:translateY(-20px) scaleY(1.2);} 80%{transform:translateY(0);} 100%{transform:translateY(0);} }
        @keyframes bigYell { 0%{transform:scale(1) rotate(0);} 10%{transform:scale(1.7) rotate(10deg) skewX(10deg);} 30%{transform:scale(2.2) rotate(20deg) skewX(20deg);} 50%{transform:scale(2.5) rotate(25deg) skewX(30deg);} 70%{transform:scale(2.2) rotate(20deg) skewX(20deg);} 90%{transform:scale(1.7) rotate(10deg) skewX(10deg);} 100%{transform:scale(1) rotate(0);} }
        @keyframes tilt { 0%{transform:rotate(-10deg);} 20%{transform:rotate(10deg);} 40%{transform:rotate(-10deg);} 60%{transform:rotate(10deg);} 80%{transform:rotate(-10deg);} 100%{transform:rotate(0);} }
        @keyframes spin { 0%{transform:rotate(0);} 100%{transform:rotate(360deg);} }
        @keyframes bounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-30px);} }
        @keyframes wave { 0%{transform:skewY(0);} 20%{transform:skewY(10deg);} 40%{transform:skewY(-10deg);} 60%{transform:skewY(10deg);} 80%{transform:skewY(-10deg);} 100%{transform:skewY(0);} }
        .animate-fadeIn { animation: fadeIn 0.2s; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95);} to { opacity: 1; transform: scale(1);} }
      `}</style>
    </WebLayout>
  )
}
