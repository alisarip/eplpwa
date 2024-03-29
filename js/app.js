const registration = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then(() => console.log('Register Success'))
                .catch(() => console.log('Register Not Success'))
        })
    } else {
        console.log('Service Worker it is not supported!')
    }
}
const notification = () => {
    if ('Notification' in window) {
        Notification.requestPermission()
            .then(result => {
                if (result === 'denied') {
                    console.log('Denied')
                    return
                } else if (result === 'default') {
                    console.log('Default!')
                    return
                }
                if ('PushManager' in window) {
                    navigator.serviceWorker.getRegistration()
                        .then(reg => {
                            reg.pushManager
                                .subscribe({
                                    userVisibleOnly: true,
                                    applicationServerKey: urlBase64ToUint8Array("BH9N11s3dcJe6Ni3ItO3hb_SK2l8WKOC1Ozap6wWXiRo3TluDv5RqyJgjeoAcO_mi_9hiRyruPOSoGCoAVpvj9I")
                                })
                                .then(sub => {
                                    console.log('Berhasil Subscribe dengan endpoint', sub.endpoint)
                                    console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('p256dh')))))
                                    console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth')))))
                                })
                                .catch(err => console.log('Gagal Subscribe : ', err))
                        })
                }
            })
    }
}
export default {
    registration,
    notification
}