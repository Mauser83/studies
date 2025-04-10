import { useContext } from 'react'
import NotificationContext from "../reducers/NotificationContext"

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
    return (
        <>
        {notification && (
            <div
              style={{ color: notification.color }}
              className="Notification"
            >
              {notification.message}
            </div>
          )}
          </>
    )
}

export default Notification