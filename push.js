var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BH9N11s3dcJe6Ni3ItO3hb_SK2l8WKOC1Ozap6wWXiRo3TluDv5RqyJgjeoAcO_mi_9hiRyruPOSoGCoAVpvj9I",
    "privateKey": "s9plujkn4lP7deIsgxnfzis7aE04NG50V1SX0kjuASY"
};


webPush.setVapidDetails(
    'mailto:alisarip@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cDRr6l4yt3A:APA91bFscB-fC5NAMZSVFBjquuV3YlWSrG85u5MLKs2poUYS-er3rUv4ygQFTmhILy0Hsfk0AmXp0PzDwFtJ21EgGfH8lAxHn3qEiOFchYx6eOl5TWcbsBe2xUamhZDimcJEWzcLpHll",
    "keys": {
        "p256dh": "BBvGcu4Mci7yhQhcWkTn9ZNG8eTKkkYcuMQZNNbOtmtUJCWv+5J8xhLD0C8u78si8FUONznCjMx3FELhpzwsn5w=",
        "auth": "h+9AmP3BcC1uPgUd8QQpHw=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '369561036640',
    TTL: 60
};
webPush.sendNotification(pushSubscription, payload, options).then(status => {
        console.log(status);

    })
    .catch(err => {

        console.log(err);

    });