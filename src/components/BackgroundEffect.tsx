import React from 'react'

const BackgroundEffect = () => {
    return (
        <>
            <div
                className="t-0 absolute top-0 -z-10 h-full w-full opacity-75"
                style={{
                    background: 'linear-gradient(to bottom, #4D6842 30%, #4D6842 70%)'
                }}
            />
            <div className="absolute inset-0 bg-black opacity-20" />
        </>
    )
}

export default BackgroundEffect