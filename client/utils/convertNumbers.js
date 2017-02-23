/**
* Silo
* Utils to convert phone numbers to readable format
* author: @patr
*/

module.exports = {
    E164toReadable: function E164toReadable(number) {
        if (number && number.length === 12)
            return number.slice(0, 2) + ' (' + number.slice(2, 5) + ') ' + number.slice(5, 8) + '-' + number.slice(8, 12);

        return number
    },
    nationalToE164: function nationalToE164(number) {
        if (number)
            return "+1 (" + number.slice(0, 3) + ') ' + number.slice(3, 6) + '-' + number.slice(6, 10);

        return number
    },

    blanketConvert: function blanketConvert(s) {
        var s2 = (""+s).replace(/\D/g, '');
        var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
        return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
    },

    onlyDigits: function onlyDigits(s) {
        var s2 = (""+s).replace(/\D/g, '');
        var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
        return (!m) ? null : m[1] + m[2] + m[3];
    }
}