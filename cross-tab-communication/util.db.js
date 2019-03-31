const STORE_NAME = 'ctc_aleinzhou';
const INDEXDB_TAG = 'ctc_data';
function openStoreAndInit() {
    const storeName = STORE_NAME;
    return new Promise(function (resolve, reject) {
        if (!('indexedDB' in window)) {
            reject('don\'t support indexedDB');
        }
        const request = indexedDB.open('CTC_DB', 1);
        request.onerror = function(e) {
            console.log('connect failed');
            reject(e);
        }
        request.onsuccess = function (e) {
            console.log('connect succeed');
            const db = e.target.result;
            const dbr = saveData(db, null);
            dbr.onsuccess = function (e) {
                resolve(db);
            }
            dbr.onerror = function (e) {
                console.log('init failed', e);
                reject(e);
            }
        }
        request.onupgradeneeded = function (e) {
            console.log('upgrade db');
            const db = e.srcElement.result;
            if (e.oldVersion === 0) {
                if (!db.objectStoreNames.contains(storeName)) {
                    const store = db.createObjectStore(storeName, {
                        keyPath: 'tag'
                    });
                    store.createIndex(storeName + 'Index', 'tag', {unique: false});
                    console.log('create index succeed');
                }
            }
        }
    });
}

function saveData(db, data) {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    return store.put({
        tag: INDEXDB_TAG,
        data
    });
}

function query(db) {
    return new Promise(function (resolve, reject) {
        try {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const dbRequest = store.get(INDEXDB_TAG);
            dbRequest.onsuccess = function (e) {
                resolve(e.target.result);
            };
            dbRequest.onerror = function (err) {
                reject(err);
            };
        }
        catch (err) {
            reject(err);
        }
    });
}