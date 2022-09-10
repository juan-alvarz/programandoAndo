import React from "react";
import NotificationCard from "./NotificationCard";

export default function Notifications({ notifications }) {
    const [displayNotifications, setDisplay] = React.useState(false);
    const handleDisplayNotifications = () => {
        setDisplay(!displayNotifications)
    };

    return (
        <div>
            <button onClick={handleDisplayNotifications}>
                Notifications
            </button>
            <p>{notifications.length}</p>
            {
                displayNotifications ?
                    <div>
                        {
                            notifications.map(x => <NotificationCard id={x._id} notification={x} />)
                        }
                    </div> : null
            }
        </div>
    )
}