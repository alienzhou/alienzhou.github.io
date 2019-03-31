// Service Worker
(function () {
    const $container = document.getElementById('service-worker');
    const $input = $container.querySelector('input');
    const $btn = $container.querySelector('button');
    const $info = $container.querySelector('p');
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../util.sw.js').then(function () {
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