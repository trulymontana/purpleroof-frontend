import React from 'react'

// #4D6842 - dark contrast
// #659153 - text headers
// #657160 - main text
// #a4c4a8 - link
// #7fa484 - link 2 (dark bg)

const BackgroundEffect = () => {
    return (
        <>
            <div
                className="t-0 absolute top-0 -z-10 h-full w-full opacity-90"
                style={{
                    background: 'linear-gradient(to bottom, #4D6842 30%, #4D6842 70%)'
                }}
            />
            <div className="absolute inset-0 bg-black opacity-20" />
        </>
    )
}

export default BackgroundEffect