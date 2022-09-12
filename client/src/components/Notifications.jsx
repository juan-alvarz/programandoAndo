import React, { useEffect } from "react";
import NotificationCard from "./NotificationCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotifications } from "../redux/actions";


export default function Notifications() {
    const [displayNotifications, setDisplay] = React.useState(false);
    const handleDisplayNotifications = () => {
        setDisplay(!displayNotifications)
    };
    const dispatch = useDispatch();

    const { notifications } = useSelector((state) => state.programandoando);

    useEffect(() => {
        dispatch(getAllNotifications());
      }, [dispatch]);


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