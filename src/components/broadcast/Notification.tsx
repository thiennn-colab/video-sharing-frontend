import React, { useState, useEffect } from "react";
import * as ActionCable from "actioncable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import env from "../../env";

const Notification: React.FC = () => {
  const [data, setData] = useState<any>();
  let channel: any = null;
  const history = useHistory();

  useEffect(() => {
    // Create an Action Cable consumer
    const cable = ActionCable.createConsumer(`${env.VITE_API_URL}/cable`);

    // Subscribe to the channel
    channel = cable.subscriptions.create("NotificationChannel", {
      received: (data: any) => {
        setData(data);
      },
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const handleClick = () => {
    history.push(`/video/${data.post_id}`);
    setData(null);
  };

  useEffect(() => {
    console.log(data)
    if (data && !(data.posted_user == localStorage.getItem("email"))) {
      toast.info(data.message, {
        onClose: () => setData(null),
        toastId: "action-cable-toast",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClick: handleClick,
      });
    }
  }, [data]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Notification;
