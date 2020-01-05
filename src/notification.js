export const requestPermissions = () => {
  if (!Notification) {
    return;
  }

  if (Notification.permission === 'default') {
    Notification.requestPermission();
  }
};

export const send = (text) => {
  if (!Notification) {
    return;
  }

  if (Notification.permission === 'granted') {
    new Notification(text);
  }
};
