import { NotificationHubsClient } from "@azure/notification-hubs";

if (!process.env.NOTIFICATION_HUB_CONN) {
    throw new Error("NOTIFICATION_HUB_CONN is missing");
}

if (!process.env.NOTIFICATION_HUB_NAME) {
    throw new Error("NOTIFICATION_HUB_NAME is missing");
}

export const hubClient = new NotificationHubsClient(
    process.env.NOTIFICATION_HUB_CONN,
    process.env.NOTIFICATION_HUB_NAME
);
