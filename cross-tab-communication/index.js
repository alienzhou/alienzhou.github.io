// BroadcastChannel
(function () {
    const bc = new BroadcastChannel('AlienZHOU');
    const $container = document.getElementById('broadcast-channel');
    const $input = $container.querySelector('input');
    const $btn = $container.querySelector('button');
    const $info = $container.querySelector('p');
    bc.onmessage = function (e) {
        const data = e.data;
        const text = '[receive] ' + data.msg + ' —— tab ' + data.from;
        console.log('[BroadcastChannel] receive message:', text);
        $info.textContent = text;
    };
    bc.onmessageerror = function (e) {
        console.log(e);
    };

    $btn.addEventListener('click', function () {
        const tab = document.getElementById('js-header').dataset.tab;
        const val = $input.value;
        $input.value = '';
        $info.textContent = '[send] ' + val;
        bc.postMessage({
            from: tab,
            msg: val
        });
    });
})();

// Service Worker
(function () {
    const $container = document.getElementById('service-worker');
    const $input = $container.querySelector('input');
    const $btn = $container.querySelector('button');
    const $info = $container.querySelector('p');
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then(function () {
            console.log('Service Worker 注册成功');
        });
        navigator.serviceWorker.addEventListener('message', function (e) {
            const data = e.data;
            if (document.getElementById('js-header').dataset.tab === data.from) {
                return;
            }
            const text = '[receive] ' + data.msg + ' —— tab ' + data.from;
            console.log('[Service Worker] receive message:', text);
            $info.textContent = text;
        });
    }

    $btn.addEventListener('click', function () {
        const tab = document.getElementById('js-header').dataset.tab;
        const val = $input.value;
        $input.value = '';
        $info.textContent = '[send] ' + val;
        navigator.serviceWorker.controller.postMessage({
            from: tab,
            msg: val
        });
    });
})();

// Local Storage
(function () {
    const $container = document.getElementById('local-storage');
    const $input = $container.querySelector('input');
    const $btn = $container.querySelector('button');
    const $info = $container.querySelector('p');
    window.addEventListener('storage', function (e) {
        if (e.key === 'ctc-msg') {
            const data = JSON.parse(e.newValue);
            const text = '[receive] ' + data.msg + ' —— tab ' + data.from;
            console.log('[Storage I] receive message:', text);
            $info.textContent = text;
        }
    })

    $btn.addEventListener('click', function () {
        const tab = document.getElementById('js-header').dataset.tab;
        const val = $input.value;
        $input.value = '';
        $info.textContent = '[send] ' + val;
        // must have some differences to fire 'storage' event
        // so use timestamp
        localStorage.setItem('ctc-msg', JSON.stringify({
            from: tab,
            msg: val,
            st: +(new Date)
        }));
    });
})();

// Shared Worker
(function () {
    if (typeof SharedWorker === 'undefined') {
        return;
    }
    const sharedWorker = new SharedWorker('./shared.js', 'ctc');
    const $container = document.getElementById('shared-worker');
    const $input = $container.querySelector('input');
    const $btn = $container.querySelector('button');
    const $info = $container.querySelector('p');

    setInterval(function () {
        sharedWorker.port.postMessage({get: true});
    }, 1000);

    sharedWorker.port.addEventListener('message', (e) => {
        const data = e.data;
        if (document.getElementById('js-header').dataset.tab === data.from) {
            return;
        }
        const text = '[receive] ' + data.msg + ' —— tab ' + data.from;
        console.log('[Shared Worker] receive message:', text);
        $info.textContent = text;
    }, false);
    sharedWorker.port.start();

    $btn.addEventListener('click', function () {
        const tab = document.getElementById('js-header').dataset.tab;
        const val = $input.value;
        $input.value = '';
        $info.textContent = '[send] ' + val;
        sharedWorker.port.postMessage({
            from: tab,
            msg: val
        });
    });
})();

// Storage: cookie
(function () {
    function getCookie(cookieName) {
        const strCookie = document.cookie;
        const arrCookie = strCookie.split('; ');
        for(let i = 0; i < arrCookie.length; i++) {
            let arr = arrCookie[i].split('=');
            if(cookieName == arr[0]){
                return arr[1];
            }
        }
        return '';
    }

    const $container = document.getElementById('storage2');
    const $input = $container.querySelector('input');
    const $btn = $container.querySelector('button');
    const $info = $container.querySelector('p');

    openStoreAndInit().then(function (db) {
        setInterval(function () {
            query(db).then(function (res) {
                if (!res || !res.data || document.getElementById('js-header').dataset.tab === res.data.from) {
                    return;
                }
                const data = res.data;
                const text = '[receive] ' + data.msg + ' —— tab ' + data.from;
                console.log('[Storage I] receive message:', text);
                $info.textContent = text;
            });
        }, 1000);
        $btn.addEventListener('click', function () {
            const tab = document.getElementById('js-header').dataset.tab;
            const val = $input.value;
            $input.value = '';
            $info.textContent = '[send] ' + val;
            saveData(db, {
                from: tab,
                msg: val
            });
        });
    });
})();

// Cross-document Messaging
(function () {
    const $container = document.getElementById('post-message');
    const $input = $container.querySelector('input');
    const $btn = $container.querySelector('button');
    const $info = $container.querySelector('p');
    window.addEventListener('message', function (e) {
        const data = e.data;
        if (document.getElementById('js-header').dataset.tab === data.from) {
            return;
        }
        const text = '[receive] ' + data.msg + ' —— tab ' + data.from;
        console.log('[Cross-document Messaging] receive message:', text);
        $info.textContent = text;

        // do not send message back
        if (window.opener && data.fromOpenner) {
            window.opener.postMessage(data);
        }

        // do not send message back
        if (window.childWin && !data.fromOpenner) {
            window.childWin.postMessage(data);
        }
    });

    if (!window.childWin && !window.opener) {
        $input.setAttribute('disabled', true);
        $btn.setAttribute('disabled', true);
        $container.classList.add('disabled');
        $container.querySelector('h2').textContent = $container.querySelector('h2').textContent + ' (no open)';
    }

    $btn.addEventListener('click', function () {
        const tab = document.getElementById('js-header').dataset.tab;
        const val = $input.value;
        $input.value = '';
        $info.textContent = '[send] ' + val;

        if (window.childWin) {
            window.childWin.postMessage({
                from: tab,
                msg: val,
                fromOpenner: false
            });
        }

        if (window.opener) {
            window.opener.postMessage({
                from: tab,
                msg: val,
                fromOpenner: true
            });
        }
    });
})();