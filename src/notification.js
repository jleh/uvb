export const requestPermissions = () => {
  if (Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

export const send = (text) => {
  if (Notification.permission === 'granted') {
    new Notification(text);
  }
}
