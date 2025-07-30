import React, { useEffect, useState } from 'react'
import WebLayout from '@/Layouts/WebLayout'

// Inertia.jsのHeadコンポーネントをモック
const Head = ({ children, title }: any) => {
    if (title && typeof document !== 'undefined') {
        document.title = title
    }
    return null
}

export default function LandingPage() {
    const [isVisible, setIsVisible] = useState(false)
    const [isShaking, setIsShaking] = useState(false)
    const [isBouncing, setIsBouncing] = useState(false)
    const [isSpinning, setIsSpinning] = useState(false)
    const [isWaving, setIsWaving] = useState(false)
    const [isExploding, setIsExploding] = useState(false)
    const [isCrying, setIsCrying] = useState(false)
    const [isJumping, setIsJumping] = useState(false)

    useEffect(() => {
        setIsVisible(true)

        // ランダムなアニメーション
        const animations = [
            () => { setIsShaking(true); setTimeout(() => setIsShaking(false), 500) },
            () => { setIsBouncing(true); setTimeout(() => setIsBouncing(false), 800) },
            () => { setIsSpinning(true); setTimeout(() => setIsSpinning(false), 1000) },
            () => { setIsWaving(true); setTimeout(() => setIsWaving(false), 600) },
            () => { setIsExploding(true); setTimeout(() => setIsExploding(false), 800) },
            () => { setIsCrying(true); setTimeout(() => setIsCrying(false), 700) },
            () => { setIsJumping(true); setTimeout(() => setIsJumping(false), 600) },
        ]

        const randomAnimation = () => {
            const randomIndex = Math.floor(Math.random() * animations.length)
            animations[randomIndex]()
        }

        // 2-4秒間隔でランダムアニメーション
        const animationInterval = setInterval(() => {
            randomAnimation()
        }, 2000 + Math.random() * 2000)

        return () => {
            clearInterval(animationInterval)
        }
    }, [])

    return (
        <WebLayout>
            <Head title="さけびな - 心の叫びを表現しよう" />

            {/* ヒーローセクション */}
            <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-orange-100">
                {/* 背景の装飾要素 */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -left-10 -top-10 h-40 w-40 animate-pulse rounded-full bg-gradient-to-br from-pink-300 to-red-300 opacity-20"></div>
                    <div className="absolute -right-20 top-20 h-32 w-32 animate-bounce rounded-full bg-gradient-to-br from-yellow-300 to-orange-300 opacity-20"></div>
                    <div className="absolute bottom-20 left-20 h-24 w-24 animate-spin rounded-full bg-gradient-to-br from-blue-300 to-purple-300 opacity-20"></div>

                    {/* ギャグマンガ日和風の装飾 */}
                    <div className="absolute left-1/4 top-1/4 animate-ping text-4xl opacity-10">💥</div>
                    <div className="absolute right-1/3 top-1/3 animate-bounce text-3xl opacity-15">⚡</div>
                    <div className="absolute bottom-1/3 right-1/4 animate-spin text-5xl opacity-10">🌀</div>
                    <div className="absolute left-1/3 top-2/3 animate-pulse text-3xl opacity-20">🎭</div>

                    {/* 吹き出し風の装飾 */}
                    <div className="absolute right-10 top-10 animate-bounce rounded-full bg-white p-3 opacity-30">
                        <span className="text-2xl">😤</span>
                    </div>
                    <div className="absolute bottom-10 left-10 animate-bounce rounded-full bg-white p-3 opacity-30" style={{ animationDelay: '0.5s' }}>
                        <span className="text-2xl">😱</span>
                    </div>
                </div>

                <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
                    {/* メインタイトル */}
                    <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="relative">
                            <h1 className={`relative z-10 mb-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-6xl font-black text-transparent md:text-8xl ${isShaking ? 'animate-shake' :
                                    isSpinning ? 'animate-spin' :
                                        isWaving ? 'animate-wave' :
                                            isExploding ? 'animate-explode' :
                                                isCrying ? 'animate-cry' :
                                                    isJumping ? 'animate-jump' : ''
                                }`}>
                                さけびな
                            </h1>
                            {/* 影の効果 */}
                            <h1 className="absolute left-2 top-2 -z-10 text-6xl font-black text-black opacity-20 md:text-8xl">
                                さけびな
                            </h1>
                        </div>
                        <div className="space-y-2">
                            <p className={`text-2xl font-bold text-gray-800 md:text-3xl ${isBouncing ? 'animate-bounce' :
                                    isWaving ? 'animate-wave' : ''
                                }`}>
                                心の叫びを
                            </p>
                            <p className={`rotate-1 transform text-2xl font-bold text-gray-800 md:text-3xl ${isJumping ? 'animate-jump' :
                                    isSpinning ? 'animate-spin' : ''
                                }`}>
                                表現しよう！
                            </p>
                        </div>
                    </div>

                    {/* キャラクター風の説明 */}
                    <div className={`mb-12 max-w-2xl transition-all delay-500 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="rounded-3xl border-4 border-pink-300 bg-white p-8 shadow-2xl">
                            <div className="mb-4 text-4xl">😤</div>
                            <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                                日々のストレスや嬉しい気持ちを<br />
                                <span className="font-bold text-pink-600">カラフルでアニメーション豊かな文字</span>で<br />
                                思いっきり表現してみませんか？
                            </p>
                        </div>
                    </div>

                    {/* CTAボタン */}
                    <div className={`transition-all delay-1000 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <button
                            className={`hover:shadow-3xl transform rounded-full border-4 border-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 px-12 py-6 text-2xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 ${isBouncing ? 'animate-bounce' :
                                    isShaking ? 'animate-shake' :
                                        isSpinning ? 'animate-spin' :
                                            isWaving ? 'animate-wave' :
                                                isExploding ? 'animate-explode' :
                                                    isCrying ? 'animate-cry' :
                                                        isJumping ? 'animate-jump' : ''
                                }`}
                            onClick={() => window.location.href = '/top'}
                        >
                            <span className={`inline-block ${isShaking ? 'animate-shake' :
                                    isSpinning ? 'animate-spin' :
                                        isWaving ? 'animate-wave' :
                                            isExploding ? 'animate-explode' :
                                                isCrying ? 'animate-cry' :
                                                    isJumping ? 'animate-jump' : ''
                                }`}>
                                🗣️
                            </span>
                            {' '}今すぐ叫んでみる！
                        </button>
                    </div>

                    {/* スクロールインジケーター */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
                        <div className="text-sm text-gray-600">↓ スクロールして詳細を見る ↓</div>
                    </div>
                </div>
            </div>

            {/* 特徴セクション */}
            <div className="bg-white py-20">
                <div className="mx-auto max-w-6xl px-4">
                    <h2 className="mb-16 text-center text-4xl font-bold text-gray-800 md:text-5xl">
                        さけびなの特徴
                    </h2>

                    <div className="grid gap-8 md:grid-cols-3">
                        {/* 特徴1 */}
                        <div className="group text-center">
                            <div className="mb-6 transform rounded-2xl bg-gradient-to-br from-pink-100 to-red-100 p-8 transition-transform duration-300 group-hover:scale-105">
                                <div className={`mb-4 text-6xl ${isSpinning ? 'animate-spin' :
                                        isBouncing ? 'animate-bounce' :
                                            isWaving ? 'animate-wave' :
                                                isShaking ? 'animate-shake' : ''
                                    }`}>🎨</div>
                                <h3 className="mb-4 text-2xl font-bold text-gray-800">カラフルな表現</h3>
                                <p className="text-gray-600">
                                    文字一つ一つに色やアニメーションを設定して、あなただけのオリジナルな叫びを作ろう！
                                </p>
                            </div>
                        </div>

                        {/* 特徴2 */}
                        <div className="group text-center">
                            <div className="mb-6 transform rounded-2xl bg-gradient-to-br from-yellow-100 to-orange-100 p-8 transition-transform duration-300 group-hover:scale-105">
                                <div className={`mb-4 text-6xl ${isExploding ? 'animate-explode' :
                                        isJumping ? 'animate-jump' :
                                            isCrying ? 'animate-cry' :
                                                isSpinning ? 'animate-spin' : ''
                                    }`}>✨</div>
                                <h3 className="mb-4 text-2xl font-bold text-gray-800">豊富なアニメーション</h3>
                                <p className="text-gray-600">
                                    震える、爆発、ジャンプなど、様々なアニメーションで感情を表現しよう！
                                </p>
                            </div>
                        </div>

                        {/* 特徴3 */}
                        <div className="group text-center">
                            <div className="mb-6 transform rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 p-8 transition-transform duration-300 group-hover:scale-105">
                                <div className={`mb-4 text-6xl ${isWaving ? 'animate-wave' :
                                        isBouncing ? 'animate-bounce' :
                                            isShaking ? 'animate-shake' :
                                                isJumping ? 'animate-jump' : ''
                                    }`}>🌍</div>
                                <h3 className="mb-4 text-2xl font-bold text-gray-800">みんなで共有</h3>
                                <p className="text-gray-600">
                                    他の人の叫びを見て、一緒に楽しもう！新しい発見があるかも？
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 使用例セクション */}
            <div className="bg-gradient-to-br from-pink-50 to-yellow-50 py-20">
                <div className="mx-auto max-w-6xl px-4">
                    <h2 className="mb-16 text-center text-4xl font-bold text-gray-800 md:text-5xl">
                        使用例
                    </h2>

                    <div className="grid items-center gap-12 md:grid-cols-2">
                        <div>
                            <h3 className="mb-6 text-3xl font-bold text-gray-800">こんな時に使ってみて！</h3>
                            <ul className="space-y-4 text-lg text-gray-700">
                                <li className="flex items-center">
                                    <span className={`mr-3 text-2xl ${isShaking ? 'animate-shake' :
                                            isExploding ? 'animate-explode' : ''
                                        }`}>😤</span>
                                    仕事のストレスを発散したい時
                                </li>
                                <li className="flex items-center">
                                    <span className={`mr-3 text-2xl ${isBouncing ? 'animate-bounce' :
                                            isJumping ? 'animate-jump' : ''
                                        }`}>🎉</span>
                                    嬉しいことがあった時
                                </li>
                                <li className="flex items-center">
                                    <span className={`mr-3 text-2xl ${isSpinning ? 'animate-spin' :
                                            isWaving ? 'animate-wave' : ''
                                        }`}>💪</span>
                                    やる気を出したい時
                                </li>
                                <li className="flex items-center">
                                    <span className={`mr-3 text-2xl ${isCrying ? 'animate-cry' :
                                            isWaving ? 'animate-wave' : ''
                                        }`}>😭</span>
                                    悲しい気持ちを表現したい時
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-2xl bg-white p-8 shadow-xl">
                            <h4 className="mb-4 text-center text-xl font-bold">サンプル叫び</h4>
                            <div className="space-y-4">
                                <div className="rounded-lg bg-gray-100 p-4 text-center">
                                    <span className="text-3xl" style={{ color: '#ff0000', animation: 'shake 0.5s infinite' }}>や</span>
                                    <span className="text-3xl" style={{ color: '#00ff00', animation: 'jump 0.7s infinite' }}>っ</span>
                                    <span className="text-3xl" style={{ color: '#0000ff', animation: 'spin 1.2s infinite linear' }}>た</span>
                                    <span className="text-3xl" style={{ color: '#ffff00', animation: 'bounce 0.8s infinite' }}>ー</span>
                                    <span className="text-3xl" style={{ color: '#ff00ff', animation: 'explode 1s infinite' }}>！</span>
                                </div>
                                <div className="rounded-lg bg-gray-100 p-4 text-center">
                                    <span className="text-3xl" style={{ color: '#ff6600', animation: 'yell 0.7s infinite' }}>つ</span>
                                    <span className="text-3xl" style={{ color: '#6600ff', animation: 'wave 1.2s infinite' }}>か</span>
                                    <span className="text-3xl" style={{ color: '#00ff66', animation: 'tilt 1.2s infinite' }}>れ</span>
                                    <span className="text-3xl" style={{ color: '#ff0066', animation: 'cry 1.2s infinite' }}>た</span>
                                    <span className="text-3xl" style={{ color: '#666666', animation: 'fold 1.2s infinite' }}>ー</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 最終CTAセクション */}
            <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 py-20">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <h2 className="mb-8 text-4xl font-bold text-white md:text-5xl">
                        さあ、あなたの叫びを聞かせて！
                    </h2>
                    <p className="mb-12 text-xl text-white opacity-90">
                        心の奥底に眠る感情を、カラフルで楽しい文字で表現してみませんか？
                    </p>
                    <button
                        className="hover:shadow-3xl transform rounded-full border-4 border-pink-300 bg-white px-12 py-6 text-2xl font-bold text-pink-600 shadow-2xl transition-all duration-300 hover:scale-105"
                        onClick={() => window.location.href = '/top'}
                    >
                        🚀 今すぐ始める！
                    </button>
                </div>
            </div>

            {/* アニメーション用CSS */}
            <style>{`
        @keyframes shake {
          0%{transform:translateX(0);}
          25%{transform:translateX(-5px);}
          50%{transform:translateX(5px);}
          75%{transform:translateX(-5px);}
          100%{transform:translateX(0);}
        }
        @keyframes explode {
          0%{transform:scale(1);}
          50%{transform:scale(1.3) rotate(10deg);}
          100%{transform:scale(0.8) rotate(-10deg);}
        }
        @keyframes yell {
          0%{transform:scale(1);}
          20%{transform:scale(1.5) skewX(-10deg); color:#ff0;}
          40%{transform:scale(1.2) skewX(10deg); color:#f00;}
          60%{transform:scale(1.4) skewX(-8deg); color:#ff0;}
          80%{transform:scale(1.1) skewX(8deg); color:#f00;}
          100%{transform:scale(1);}
        }
        @keyframes cry {
          0%{transform:translateY(0);}
          20%{transform:translateY(10px) scaleY(0.9); color:#00f;}
          40%{transform:translateY(20px) scaleY(0.8); color:#00f;}
          60%{transform:translateY(10px) scaleY(0.9); color:#00f;}
          80%{transform:translateY(0);}
          100%{transform:translateY(0);}
        }
        @keyframes fold {
          0%{transform:rotateX(0);}
          20%{transform:rotateX(60deg);}
          40%{transform:rotateX(120deg);}
          60%{transform:rotateX(180deg);}
          80%{transform:rotateX(120deg);}
          100%{transform:rotateX(0);}
        }
        @keyframes jump {
          0%{transform:translateY(0);}
          20%{transform:translateY(-20px) scaleY(1.2);}
          40%{transform:translateY(-30px) scaleY(0.8);}
          60%{transform:translateY(-20px) scaleY(1.2);}
          80%{transform:translateY(0);}
          100%{transform:translateY(0);}
        }
        @keyframes tilt {
          0%{transform:rotate(-10deg);}
          20%{transform:rotate(10deg);}
          40%{transform:rotate(-10deg);}
          60%{transform:rotate(10deg);}
          80%{transform:rotate(-10deg);}
          100%{transform:rotate(0);}
        }
        @keyframes wave {
          0%{transform:skewY(0);}
          20%{transform:skewY(10deg);}
          40%{transform:skewY(-10deg);}
          60%{transform:skewY(10deg);}
          80%{transform:skewY(-10deg);}
          100%{transform:skewY(0);}
        }
        @keyframes rainbow {
          0%{color:#ff0000;}
          16%{color:#ff8000;}
          33%{color:#ffff00;}
          50%{color:#00ff00;}
          66%{color:#0080ff;}
          83%{color:#8000ff;}
          100%{color:#ff0000;}
        }
        @keyframes pulse-glow {
          0%{text-shadow:0 0 5px currentColor;}
          50%{text-shadow:0 0 20px currentColor, 0 0 30px currentColor;}
          100%{text-shadow:0 0 5px currentColor;}
        }
        @keyframes bounce-rotate {
          0%{transform:translateY(0) rotate(0deg);}
          25%{transform:translateY(-10px) rotate(5deg);}
          50%{transform:translateY(-20px) rotate(0deg);}
          75%{transform:translateY(-10px) rotate(-5deg);}
          100%{transform:translateY(0) rotate(0deg);}
        }
        @keyframes wiggle {
          0%{transform:rotate(0deg);}
          25%{transform:rotate(5deg);}
          50%{transform:rotate(0deg);}
          75%{transform:rotate(-5deg);}
          100%{transform:rotate(0deg);}
        }
        .animate-shake { animation: shake 0.5s infinite; }
        .animate-explode { animation: explode 0.8s infinite; }
        .animate-cry { animation: cry 1.2s infinite; }
        .animate-jump { animation: jump 0.7s infinite; }
        .animate-wave { animation: wave 1.2s infinite; }
        .animate-rainbow { animation: rainbow 2s infinite; }
        .animate-pulse-glow { animation: pulse-glow 1.5s infinite; }
        .animate-bounce-rotate { animation: bounce-rotate 1s infinite; }
        .animate-wiggle { animation: wiggle 0.5s infinite; }
      `}</style>
        </WebLayout>
    )
}
