(function () {
    var BIRTHDAY = new Date(2001, 2, 6); // 6 March 2001 (month is 0-indexed)

    function isBST(date) {
        // BST runs from the last Sunday of March at 01:00 UTC
        // to the last Sunday of October at 01:00 UTC
        var lastSundayOfMonth = function (year, month) {
            var d = new Date(Date.UTC(year, month + 1, 0)); // last day of month
            d.setUTCDate(d.getUTCDate() - d.getUTCDay()); // rewind to Sunday
            return d;
        };

        var year = date.getUTCFullYear();
        var bstStart = lastSundayOfMonth(year, 2); // last Sun of March
        bstStart.setUTCHours(1, 0, 0, 0);
        var bstEnd = lastSundayOfMonth(year, 9);   // last Sun of October
        bstEnd.setUTCHours(1, 0, 0, 0);

        return date >= bstStart && date < bstEnd;
    }

    function getAge(now) {
        var age = now.getFullYear() - BIRTHDAY.getFullYear();
        var m = now.getMonth() - BIRTHDAY.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < BIRTHDAY.getDate())) age--;
        return age;
    }

    var now = new Date();
    var age = getAge(now);
    var tz  = isBST(now) ? 'BST' : 'GMT';

    document.getElementById('meta-line').textContent = age + ' | ' + tz;
})();
