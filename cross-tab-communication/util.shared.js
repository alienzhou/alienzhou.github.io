let data = null;

self.addEventListener('connect', function (e) {
    const port = e.ports[0];
    port.addEventListener('message', function (event) {
        if (event.data.get) {
            data && port.postMessage(data);
        }
        else {
            data = event.data;
        }
    });
    port.start();
});
