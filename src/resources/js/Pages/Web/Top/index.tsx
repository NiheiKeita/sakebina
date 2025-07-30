import React, { useEffect, useState } from 'react'
// import { Head } from '@inertiaj  cs/react'
import WebLayout from '@/Layouts/WebLayout'
import axios from 'axios'

// アニメーションの選択肢
const ANIMATIONS = [
    { value: 'none', label: 'なし' },
    { value: 'shake', label: '震える' },
    { value: 'shake2', label: 'ブルブル' },
    { value: 'explode', label: '爆発' },
    { value: 'wind', label: '風に舞う' },
    { value: 'fade', label: 'フェード' },
    { value: 'yell', label: '叫ぶ(黄色く光る)' },
    { value: 'cry', label: '悲しい(下に揺れる)' },
    { value: 'fold', label: '折れる' },
    { value: 'jump', label: 'ジャンプ' },
    { value: 'bigYell', label: '激しく右向きに叫ぶ' },
    { value: 'tilt', label: '左右に傾く' },
    { value: 'spin', label: 'ぐるぐる回る' },
    { value: 'bounce', label: 'バウンド' },
    { value: 'wave', label: '波打つ' },
    { value: 'wiggle', label: '小刻みに揺れる' },
    { value: 'float', label: 'ふわふわ浮く' },
    { value: 'scale', label: '大きくなったり小さくなったり' },
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

    // LP風のランダムアニメーション状態
    const [isShaking, setIsShaking] = useState(false)
    const [isBouncing, setIsBouncing] = useState(false)
    const [isSpinning, setIsSpinning] = useState(false)
    const [isWaving, setIsWaving] = useState(false)
    const [isExploding, setIsExploding] = useState(false)
    const [isCrying, setIsCrying] = useState(false)
    const [isJumping, setIsJumping] = useState(false)

    // 入力欄が変わったらcharsも更新
    useEffect(() => {
        const arr = input.slice(0, 10).split('').map((c, i) => chars[i] ? { ...chars[i], char: c } : { char: c, color: '#f00', animation: 'none' })
        setChars(arr)
    }, [input])

    // LP風のランダムアニメーション
    useEffect(() => {
        const randomAnimation = () => {
            const animations = [
                () => { setIsShaking(true); setTimeout(() => setIsShaking(false), 1000) },
                () => { setIsBouncing(true); setTimeout(() => setIsBouncing(false), 1000) },
                () => { setIsSpinning(true); setTimeout(() => setIsSpinning(false), 1000) },
                () => { setIsWaving(true); setTimeout(() => setIsWaving(false), 1000) },
                () => { setIsExploding(true); setTimeout(() => setIsExploding(false), 1000) },
                () => { setIsCrying(true); setTimeout(() => setIsCrying(false), 1000) },
                () => { setIsJumping(true); setTimeout(() => setIsJumping(false), 1000) },
            ]
            const randomAnim = animations[Math.floor(Math.random() * animations.length)]
            randomAnim()
        }

        const interval = setInterval(randomAnimation, 2000 + Math.random() * 2000)
        return () => clearInterval(interval)
    }, [])

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
            {/* <Head title="さけびな" /> */}

            {/* ヒーローセクション */}
            <div className="relative overflow-hidden bg-gradient-to-br from-pink-400 via-red-400 to-yellow-400 py-10">
                {/* 背景装飾 */}
                <div className="absolute -left-10 -top-10 h-32 w-32 animate-bounce rounded-full bg-white opacity-20"></div>
                <div className="absolute -bottom-10 -right-10 h-24 w-24 animate-spin rounded-full bg-white opacity-30"></div>
                <div className="absolute left-1/4 top-1/4 animate-pulse text-6xl opacity-20">💥</div>
                <div className="absolute bottom-1/4 right-1/4 animate-bounce text-5xl opacity-30">⚡️</div>
                <div className="animate-wiggle absolute left-1/2 top-1/2 text-4xl opacity-25" style={{ transform: 'translate(-50%, -50%)' }}>🌟</div>
                <div className="animate-float absolute right-1/3 top-1/3 text-3xl opacity-20">✨</div>
                <div className="animate-scale absolute bottom-1/3 left-1/3 text-4xl opacity-25">💫</div>

                <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
                    <h1 className={`mb-8 text-6xl font-bold text-white md:text-7xl ${isShaking ? 'animate-shake' :
                        isBouncing ? 'animate-bounce' :
                            isSpinning ? 'animate-spin' :
                                isWaving ? 'animate-wave' :
                                    isExploding ? 'animate-explode' :
                                        isCrying ? 'animate-cry' :
                                            isJumping ? 'animate-jump' : ''
                        }`}>
                        <span className={`inline-block ${isJumping ? 'animate-jump' :
                            isBouncing ? 'animate-bounce' :
                                isWaving ? 'animate-wave' :
                                    isShaking ? 'animate-shake' :
                                        isSpinning ? 'animate-spin' :
                                            isExploding ? 'animate-explode' :
                                                isCrying ? 'animate-cry' : ''
                            }`}>み</span>
                        <span className={`inline-block ${isBouncing ? 'animate-bounce' :
                            isJumping ? 'animate-jump' :
                                isWaving ? 'animate-wave' :
                                    isShaking ? 'animate-shake' :
                                        isSpinning ? 'animate-spin' :
                                            isExploding ? 'animate-explode' :
                                                isCrying ? 'animate-cry' : ''
                            }`}>ん</span>
                        <span className={`inline-block ${isWaving ? 'animate-wave' :
                            isBouncing ? 'animate-bounce' :
                                isJumping ? 'animate-jump' :
                                    isShaking ? 'animate-shake' :
                                        isSpinning ? 'animate-spin' :
                                            isExploding ? 'animate-explode' :
                                                isCrying ? 'animate-cry' : ''
                            }`}>な</span>
                        <span className={`inline-block ${isShaking ? 'animate-shake' :
                            isWaving ? 'animate-wave' :
                                isBouncing ? 'animate-bounce' :
                                    isJumping ? 'animate-jump' :
                                        isSpinning ? 'animate-spin' :
                                            isExploding ? 'animate-explode' :
                                                isCrying ? 'animate-cry' : ''
                            }`}>の</span>
                        <span className={`inline-block ${isSpinning ? 'animate-spin' :
                            isShaking ? 'animate-shake' :
                                isWaving ? 'animate-wave' :
                                    isBouncing ? 'animate-bounce' :
                                        isJumping ? 'animate-jump' :
                                            isExploding ? 'animate-explode' :
                                                isCrying ? 'animate-cry' : ''
                            }`}>叫</span>
                        <span className={`inline-block ${isExploding ? 'animate-explode' :
                            isSpinning ? 'animate-spin' :
                                isShaking ? 'animate-shake' :
                                    isWaving ? 'animate-wave' :
                                        isBouncing ? 'animate-bounce' :
                                            isJumping ? 'animate-jump' :
                                                isCrying ? 'animate-cry' : ''
                            }`}>び</span>
                    </h1>
                    <p className={`mb-8 text-2xl text-white md:text-3xl ${isCrying ? 'animate-cry' :
                        isJumping ? 'animate-jump' :
                            isBouncing ? 'animate-bounce' :
                                isWaving ? 'animate-wave' :
                                    isShaking ? 'animate-shake' :
                                        isSpinning ? 'animate-spin' :
                                            isExploding ? 'animate-explode' : ''
                        }`}>
                        あなたの叫びを世界に届けよう！
                    </p>
                </div>
            </div>

            {/* タイムラインセクション */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
                <div className="mx-auto max-w-4xl px-4">

                    {loading ? (
                        <div className="text-center text-xl text-gray-600">読み込み中...</div>
                    ) : (
                        <div className="space-y-6">
                            {shouts.map((shout: any) => (
                                <div key={shout.id} className="relative overflow-hidden rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-white via-blue-50 to-purple-100 p-6 shadow-lg">
                                    {/* 背景装飾 */}
                                    <div className="absolute -left-4 -top-4 h-8 w-8 animate-bounce rounded-full bg-gradient-to-br from-pink-300 to-yellow-300 opacity-30"></div>
                                    <div className="absolute right-2 top-2 animate-spin text-2xl opacity-40">⭐️</div>
                                    <div className="absolute bottom-0 left-1/2 animate-pulse text-3xl opacity-30" style={{ transform: 'translateX(-50%)' }}>💥</div>
                                    <div className="absolute -bottom-4 right-4 animate-bounce text-2xl opacity-30">⚡️</div>

                                    <div className="relative z-10 flex items-center gap-3">
                                        <span className="text-2xl">{shout.text.map((c: any, i: number) => (
                                            <span
                                                key={i}
                                                style={{
                                                    color: c.color,
                                                    fontSize: '1.5rem',
                                                    marginRight: '2px',
                                                    display: 'inline-block',
                                                    fontWeight: 'bold',
                                                    textShadow: '2px 2px 4px rgba(0,0,0,0.3), 0 0 10px rgba(255,255,255,0.5)',
                                                    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))',
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
                                                                                                                : c.animation === 'wiggle'
                                                                                                                    ? 'wiggle 1.2s infinite'
                                                                                                                    : c.animation === 'float'
                                                                                                                        ? 'float 2s infinite'
                                                                                                                        : c.animation === 'scale'
                                                                                                                            ? 'scale 1.5s infinite'
                                                                                                                            : 'none',
                                                }}
                                            >
                                                {c.char}
                                            </span>
                                        ))}</span>
                                        <span className="ml-auto text-sm text-gray-500">{new Date(shout.created_at).toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
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
                    <div className="animate-fadeIn relative w-full max-w-md rounded-2xl border-2 border-pink-200 bg-gradient-to-br from-white via-yellow-50 to-pink-100 p-6 shadow-xl">
                        <button
                            className="absolute right-2 top-2 text-2xl font-bold text-gray-400 hover:text-gray-700 focus:outline-none"
                            onClick={() => setIsModalOpen(false)}
                            aria-label="閉じる"
                        >
                            ×
                        </button>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    maxLength={10}
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    placeholder="叫びたいこと（最大10文字）"
                                    className="w-full rounded-lg border-2 border-pink-200 px-4 py-3 text-lg focus:border-pink-400 focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <div className="mb-2 text-sm font-bold text-gray-700">
                                    💡 文字をクリックして色やアニメーションを設定できます
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {chars.map((c, i) => (
                                        <span
                                            key={i}
                                            style={{
                                                color: c.color,
                                                border: selectedIndex === i ? '3px solid #ff6b6b' : '2px solid #ddd',
                                                borderRadius: '12px',
                                                padding: '0.4em 0.6em',
                                                cursor: 'pointer',
                                                background: selectedIndex === i
                                                    ? 'linear-gradient(135deg, #fff5f5, #ffe8e8)'
                                                    : 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                                                fontSize: '1.5rem',
                                                marginRight: '2px',
                                                display: 'inline-block',
                                                fontWeight: 'bold',
                                                textShadow: '1px 1px 2px rgba(0,0,0,0.3), 0 0 5px rgba(255,255,255,0.3)',
                                                filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))',
                                                transition: 'all 0.2s ease-in-out',
                                                transform: selectedIndex === i ? 'scale(1.05)' : 'scale(1)',
                                                boxShadow: selectedIndex === i
                                                    ? '0 4px 12px rgba(255, 107, 107, 0.3)'
                                                    : '0 2px 4px rgba(0,0,0,0.1)',
                                                // 入力直下の文字選択エリアではアニメーションを無効
                                                animation: 'none',
                                            }}
                                            onClick={() => setSelectedIndex(i)}
                                            onMouseEnter={(e) => {
                                                if (selectedIndex !== i) {
                                                    e.currentTarget.style.transform = 'scale(1.02)'
                                                    e.currentTarget.style.boxShadow = '0 3px 8px rgba(0,0,0,0.2)'
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (selectedIndex !== i) {
                                                    e.currentTarget.style.transform = 'scale(1)'
                                                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
                                                }
                                            }}
                                        >
                                            {c.char}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {selectedIndex !== null && chars[selectedIndex] && (
                                <div className="mb-4 rounded-lg border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-yellow-50 p-4">
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">🎨</span>
                                            <span className="font-bold text-gray-700">文字の設定</span>
                                        </div>
                                        <button
                                            type="button"
                                            className="rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-600 hover:bg-gray-300 focus:outline-none"
                                            onClick={() => setSelectedIndex(null)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-gray-700">色:</span>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={chars[selectedIndex].color}
                                                    onChange={e => updateChar(selectedIndex, 'color', e.target.value)}
                                                    className="h-10 w-16 cursor-pointer rounded-lg border-2 border-pink-200 focus:border-pink-400 focus:outline-none"
                                                    title="色を選択"
                                                />
                                                <span className="font-mono text-sm text-gray-600">{chars[selectedIndex].color}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-gray-700">アニメ:</span>
                                            <select
                                                value={chars[selectedIndex].animation}
                                                onChange={e => updateChar(selectedIndex, 'animation', e.target.value)}
                                                className="rounded-lg border-2 border-pink-200 px-3 py-2 focus:border-pink-400 focus:outline-none"
                                            >
                                                {ANIMATIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="mb-4">
                                <label className="inline-flex items-center">
                                    <input type="checkbox" checked={preview} onChange={e => setPreview(e.target.checked)} className="mr-2" />
                                    <span className="font-bold text-gray-700">✨ リアルタイムプレビュー</span>
                                </label>
                            </div>
                            {preview && (
                                <div className="mb-4 min-h-[4rem] rounded-2xl border-2 border-pink-200 bg-gradient-to-br from-white via-yellow-50 to-pink-100 p-4 text-center shadow-lg transition-all duration-300">
                                    <div className="mb-2 text-sm font-bold text-gray-600">👀 プレビュー</div>
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
                                                    fontWeight: 'bold',
                                                    textShadow: '3px 3px 6px rgba(0,0,0,0.4), 0 0 15px rgba(255,255,255,0.6)',
                                                    filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.3))',
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
                                                                                                                : c.animation === 'wiggle'
                                                                                                                    ? 'wiggle 1.2s infinite'
                                                                                                                    : c.animation === 'float'
                                                                                                                        ? 'float 2s infinite'
                                                                                                                        : c.animation === 'scale'
                                                                                                                            ? 'scale 1.5s infinite'
                                                                                                                            : 'none',
                                                }}
                                            >
                                                {c.char}
                                            </span>
                                        ))
                                    )}
                                </div>
                            )}
                            {error && <div className="mb-4 font-bold text-red-500">{error}</div>}
                            <button type="submit" className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-red-500 py-3 font-bold text-white shadow-lg transition-transform duration-200 hover:scale-105 disabled:opacity-50" disabled={posting || chars.length === 0}>
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
                @keyframes wiggle { 0%{transform:rotate(0deg);} 25%{transform:rotate(8deg);} 50%{transform:rotate(-8deg);} 75%{transform:rotate(8deg);} 100%{transform:rotate(0deg);} }
                @keyframes float { 0%{transform:translateY(0);} 50%{transform:translateY(-12px);} 100%{transform:translateY(0);} }
                @keyframes scale { 0%{transform:scale(1);} 50%{transform:scale(1.2);} 100%{transform:scale(1);} }
                @keyframes fade { 0%{opacity:1;} 100%{opacity:0.2;} 50%{opacity:0.7;} }
                .animate-shake { animation: shake 0.5s infinite; }
                .animate-shake2 { animation: shake2 0.25s infinite; }
                .animate-explode { animation: explode 1s infinite; }
                .animate-wind { animation: wind 1s infinite; }
                .animate-fade { animation: fade 2s infinite; }
                .animate-yell { animation: yell 0.7s infinite; }
                .animate-cry { animation: cry 1.2s infinite; }
                .animate-fold { animation: fold 1.2s infinite; }
                .animate-jump { animation: jump 0.7s infinite; }
                .animate-bigYell { animation: bigYell 0.8s infinite; }
                .animate-tilt { animation: tilt 1.2s infinite; }
                .animate-spin { animation: spin 1.2s infinite linear; }
                .animate-bounce { animation: bounce 0.8s infinite; }
                .animate-wave { animation: wave 1.2s infinite; }
                .animate-wiggle { animation: wiggle 1.2s infinite; }
                .animate-float { animation: float 2s infinite; }
                .animate-scale { animation: scale 1.5s infinite; }
                .animate-fadeIn { animation: fadeIn 0.2s; }
                @keyframes fadeIn { from { opacity: 0; transform: scale(0.95);} to { opacity: 1; transform: scale(1);} }
            `}</style>
        </WebLayout>
    )
}
