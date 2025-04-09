function Notification({ message }) {
    if (!message) return null
    return (
        <div className="Notification">{message}</div>
    )
}

export default Notification