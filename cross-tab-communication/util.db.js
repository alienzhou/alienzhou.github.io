const STORE_NAME = 'ctc_aleinzhou';
const INDEXDB_TAG = 'ctc_data';
function openStore() {
    const storeName = STORE_NAME;
    return new Promise(function (resolve, reject) {
        if (!('indexedDB' in window)) {
            reject('don\'t support indexedDB');
            return
        }
        const request = indexedDB.open('CTC_DB', 1);
        request.onerror = function(e) {
            console.log('connect failed');
            reject(e);
        };
        request.onsuccess = function (e) {
            console.log('connect succeed');
            const db = e.target.result;
            resolve(db);
        };
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
        };
    });
}

function saveData(db, data) {
    return new Promise(function (resolve, reject) {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const request = store.put({
            tag: INDEXDB_TAG,
            data
        });
        request.onsuccess = function (e) {
            resolve(db);
        };
        request.onerror = function (e) {
            console.log('save failed', e);
            reject(e);
        };
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