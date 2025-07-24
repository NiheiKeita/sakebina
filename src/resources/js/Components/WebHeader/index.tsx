
import React from 'react'

export const WebHeader = React.memo(function WebHeader() {
    return (
        <header className="sticky left-0 top-0 z-50 w-full bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 shadow-md">
            <div className="mx-auto flex items-center justify-center py-3">
                <span className="select-none text-2xl font-extrabold tracking-widest text-white drop-shadow-lg" style={{ letterSpacing: '0.2em' }}>
                    さけびな
                </span>
            </div>
        </header>
    )
})
export default WebHeader
