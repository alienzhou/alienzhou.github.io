// window.open
(function () {
    let childWins = [];
    document.getElementById('js-link').addEventListener('click', function () {
        const win = window.open('./?new=1');
        childWins.push(win);

        const $container = document.getElementById('post-message');
        $container.querySelector('input').removeAttribute('disabled');
        $container.querySelector('button').removeAttribute('disabled');
        $container.classList.remove('disabled');
        $container.querySelector('h2').textContent = $container.querySelector('h2').textContent.replace(' (no open)', '');
    });

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
        if (window.opener && !window.opener.closed && data.fromOpenner) {
            window.opener.postMessage(data);
        }

        // release reference when window closed
        childWins = childWins.filter(w => !w.closed);
        // do not send message back
        if (childWins && !data.fromOpenner) {
            childWins.forEach(w => w.postMessage(data));
        }
    });

    if (childWins.length === 0 && !window.opener) {
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

        // release reference when window closed
        childWins = childWins.filter(w => !w.closed);

        if (childWins.length > 0) {
            childWins.forEach(w => w.postMessage({
                from: tab,
                msg: val,
                fromOpenner: false
            }));
        }

        if (window.opener && !window.opener.closed) {
            window.opener.postMessage({
                from: tab,
                msg: val,
                fromOpenner: true
            });
        }
    });
})();