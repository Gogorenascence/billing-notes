const helper = {
    todaysFormattedDate: function todaysFormattedDate() {
        const timeZone = 'America/Chicago';
        const options = { timeZone: timeZone, year: 'numeric', month: '2-digit', day: '2-digit' };
        const adjustedDate = new Intl.DateTimeFormat('en-US', options).format(new Date());
        const formattedDate = new Date(adjustedDate).toISOString().split('T')[0];
        return formattedDate;
    },
    objectsAreEqual: function objectsAreEqual(obj1, obj2) {
        const obj1Keys = Object.keys(obj1);
        for (const key of obj1Keys) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
        return true;
    },
    deepCopy: function deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    generateRandomString: function (length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';

        for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
        }
        return randomString;
    },
}

export default helper
