import { useCallback } from "react";

const useIndexedDB = (dbName: string, storeName: string) => {

    const openDB = useCallback(() => {
        return new Promise<IDBDatabase>((resolve, reject) => {
            const req = indexedDB.open(dbName, 1);

            req.onupgradeneeded = () => {
                const db = req.result;
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName, { keyPath: 'songId' });
                }
            };

            req.onsuccess = () => resolve(req.result as IDBDatabase);
            req.onerror = () => reject(req.error);
        });
    }, [dbName, storeName]);

    const withStore = useCallback(async (type: IDBTransactionMode, callback: (store: IDBObjectStore) => IDBRequest<any>) => {
        const db = await openDB();
        const transaction = db.transaction(storeName, type);
        const store = transaction.objectStore(storeName);

        return new Promise<any>((resolve, reject) => {
            const req = callback(store);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }, [openDB, storeName]);

    const addItem = useCallback(async (item: any) => {
        return withStore('readwrite', (store) => store.add(item));
    }, [withStore]);

    const getItem = useCallback(async (songId: string) => {
        return withStore('readonly', (store) => store.get(songId));
    }, [withStore]);

    const getAllItems = useCallback(async () => {
        return withStore('readonly', (store) => store.getAll());
    }, [withStore]);

    const deleteItem = useCallback(async (songId: string) => {
        return withStore('readwrite', (store) => store.delete(songId));
    }, [withStore]);

    const deleteAllItems = useCallback(async () => {
        return withStore('readwrite', (store) => {
            const request = store.clear();
            return request;
        });
    }, [withStore]);

    const logAllItems = useCallback(async () => {
        const items = await withStore('readonly', (store) => store.getAll());
        console.table(items);
    }, [withStore]);

    const itemExists = useCallback(async (songId: string) => {
        const items = await getAllItems();
        return items.some((item: any) => item.songId === songId);
    }, [getAllItems]);

    return { 
        addItem, 
        getItem, 
        getAllItems, 
        deleteItem, 
        deleteAllItems, 
        logAllItems,
        itemExists
    };
};

export default useIndexedDB;
