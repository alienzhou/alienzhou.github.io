// Shared Worker
(function () {
    if (typeof SharedWorker === 'undefined') {
        return;
    }
    const sharedWorker = new SharedWorker('./util.shared.js', 'ctc');
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