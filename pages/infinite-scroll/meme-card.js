
const MemeCard = ({ data }) => {
    const { title, preview } = data
 
    return (
        <>
            <div style={{ border: '1px solid grey', width: 'fit-content', padding: '1rem' }} key={title}>
                <img src={preview[0]} alt='title'/>
                <h2>{title}</h2>
            </div>
            <br/>
        </>
    )
}

export default MemeCard
