define([

  'crypto'     

], function (Crypto) {

    var Utility = {

        appUrlBase: "http://armadillo.cloudapp.net/",

        generateId: function (seed) {
            return Crypto.MD5(Math.random() + new Date().getMilliseconds() + seed);
        }
    }

    return Utility;

});