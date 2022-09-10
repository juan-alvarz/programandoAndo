import React from "react";

export default function NotificationCard({ notification }) {

    return (
        <div>
            <h2>{notification.title}</h2>
            <p>{notification.description}</p>
        </div>
    )
}