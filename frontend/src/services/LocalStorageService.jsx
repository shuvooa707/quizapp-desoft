function LocalStorageService() {
    return {
        save: (key, value) => {
            localStorage.setItem(key, JSON.stringify(value));
        },
        get: key => {
            return localStorage.getItem(key);
        },
        remove: key => {
            localStorage.removeItem(key);
        },
        clear: _ => {
            localStorage.clear();
        }
    }
}

const lss = LocalStorageService()

export default lss;
