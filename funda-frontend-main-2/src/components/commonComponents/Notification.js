import { notification, message } from "antd";

export function successNotification(title) {
  const args = {
    message: title,
    duration: 2,
  };
  notification.info(args);
}

export function errorNotification(title) {
  let type = typeof title;
  if (type === "object") {
    title = "Network Error: Failed to refresh";
  }
  const args = {
    message: title,
    duration: 3,
    placement : "topRight"
  };
 
  notification.error(args);
}

export function infoNotification(title, duration = 3) {
  let type = typeof title;
  if (type === "object") {
    title = "Network Error: Failed to refresh";
  }
  const args = {
    message: title,
    duration,
  };
  notification.info(args);
}

export function errorToaster(title) {
  message.error(title);
}

export function infoToaster(title) {
  message.info(title);
}
