import { useState, useEffect } from 'react'

const ProgressBar = () => {
    const progress = [5, 25, 40, 70, 100]

    return (
        <div>{progress.map((item) => <div>()`{item}</div>)}</div>
    )
}

export default ProgressBar
