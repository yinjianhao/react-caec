import Notification from './Notification.jsx'

let notificationInstance = null;

function getNotificationInstance(props) {
    if (!notificationInstance) {
        notificationInstance = Notification.newInstance(props);
    }

    return notificationInstance;
}

function notice(content, duration, type, onClose) {
    let instance = getNotificationInstance();
}

export default {
    info(content, duration, onClose) {
        return notice(content, duration, 'info', onClose);
    },
}