

export default function Text({ text, ...prop }) {

    return (
        <p {...prop} style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: 0 }}>{text}</p>
    )
}