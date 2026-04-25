const Chessboard = ({ n= 8 }) => {
    const board = []

    for(let row = 0; row < n; row++) {
        for(let col = 0; col < n; col++) {
            const color = (row+col)%2 === 0 ? 'white' : 'black'

            board.push({
                id: `${row}-${col}`,
                color: color
            })
        }
    }

    console.log({board})

    return <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${n}, 40px)`,
        gridTemplateRows: `repeat(${n}, 40px)`,
        border: "2px solid #333",
        width: 'fit-content'
      }}>
        {board.map(item => <div key={item.id} style={{ backgroundColor: item.color }}></div>)}
    </div>
}

export default Chessboard
