// Storage: indexed DB
(function () {
    const $container = document.getElementById('storage2');
    const $input = $container.querySelector('input');
    const $btn = $container.querySelector('button');
    const $info = $container.querySelector('p');

    openStoreAndInit().then(function (db) {
        const $container = document.getElementById('storage2');
        $container.querySelector('input').removeAttribute('disabled');
        $container.querySelector('button').removeAttribute('disabled');
        $container.classList.remove('disabled');
        $container.querySelector('h2').textContent = $container.querySelector('h2').textContent.replace(' (no open)', '');

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