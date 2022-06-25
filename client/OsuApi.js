const Banchojs = require("bancho.js"); // Replace .. by bancho.js when coding outside of the library
const client = new Banchojs.BanchoClient(require("../config-irc-osu.json"));
const { clientID, secretID } = require('../config-osu.json');

class OsuApi {

    constructor(osuModule) {

        //console.log("HEY");
        setInterval(() => { this.update(this) }, 10000);

        this.api = null //Api Object initialize by Auth

        this._isConnected = false; //Boolean value for Auth
        this._connectedResponse = null; //Debug stack Auth response

        //Get Authentification from Osu
        this.getAuthentification();


        var myMikuClient = require('../client/MyMikuClient').instance;
        this.osuModule = osuModule;
    }

    update(that) {
        
        console.log("Je suis l'update de Osu API");

    }

    async getAuthentification()
    {
        if(this._isConnected) return true;

        /*client.connect().then(() => {
            console.log("We're online! Now listening for incoming messages.");
            client.on("PM", (message) => {
                console.log(`${message.user.ircUsername}: ${message.message}`);
            });
            this._isConnected = true;

        }).catch(console.error);*/
    }

}

exports.OsuApi = OsuApi;