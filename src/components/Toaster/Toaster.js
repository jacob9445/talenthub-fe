import React, { useState, useEffect } from 'react'
import { Close as CloseIcon } from "@material-ui/icons";
import { ToastContainer, toast } from "react-toastify";

import Notification from 'components/Notification'
import useStyles from './styles'

export const Toaster = ({type, position, show}) => {

  useEffect(() => show && handleNotificationCall(type, position), 
    [type, position, show, handleNotificationCall]
  )

  const classes = useStyles()
  var [notificationsPosition, setNotificationPosition] = useState(toast.POSITION.TOP_RIGHT,);
  var [errorToastId, setErrorToastId] = useState(null);
  return (
    <ToastContainer
      className={classes.toastsContainer}
      closeButton={
        <CloseButton className={classes.notificationCloseButton} />
      }
      closeOnClick={false}
      progressClassName={classes.notificationProgress}
    />
  )
  // #############################################################
  function sendNotification(componentProps, options) {

    return toast(
      <Notification
        {...componentProps}
        className={classes.notificationComponent}
      />,
      options,
    );
  }

  function retryErrorNotification() {
    var componentProps = {
      type: "message",
      message: "Message was sent successfully!",
      variant: "contained",
      color: "success",
    };
    toast.update(errorToastId, {
      render: <Notification {...componentProps} />,
      type: "success",
    });
    setErrorToastId(null);
  }

  function handleNotificationCall(notificationType, notificationPosition) {
    var componentProps;

    if (errorToastId && notificationType === "error") return;

    switch (notificationType) {
      case "info":
        componentProps = {
          type: "feedback",
          message: "New user feedback received",
          variant: "contained",
          color: "primary",
        };
        break;
      case "error":
        componentProps = {
          type: "message",
          message: "Message was not sent!",
          variant: "contained",
          color: "secondary",
          extraButton: "Resend",
          extraButtonClick: retryErrorNotification,
        };
        break;
      default:
        componentProps = {
          type: "shipped",
          message: "The item was shipped",
          variant: "contained",
          color: "success",
        };
    }

    var toastId = sendNotification(componentProps, {
      type: notificationType,
      position: notificationPosition,
      progressClassName: classes.progress,
      onClose: notificationType === "error" && (() => setErrorToastId(null)),
      className: classes.notification,
    });

    if (notificationType === "error") setErrorToastId(toastId);
  }

  function changeNotificationPosition(positionId) {
    setNotificationPosition(positionId);
  }
}

// #############################################################
function CloseButton({ closeToast, className }) {
  return <CloseIcon className={className} onClick={closeToast} />;
}
