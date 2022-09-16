import React from "react";

export default function NotificationCard({ notification }) {

    return (
        <div className="pl-3 w-full">
            <h2 style={{color: 'red'}} className="font-semibold text-gray-900 dark:text-white">{notification.title}</h2>
            <p>{notification.description}</p>
        </div>
    )
}