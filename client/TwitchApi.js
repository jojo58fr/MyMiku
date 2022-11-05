const axios = require('axios').default;
const { clientID, secretID } = require('../config-twitch.json');

class Streamer {
    
    constructor() {

        //Classical infos
        this.id                     = "-1";
        this.bio                    = "DEFAULT USER BIO";
        this.created_at             = "-1";
        this.display_name           = "DEFAULT DISPLAY NAME";
        this.logo                   = "https://default-link.com";
        this.name                   = "DEFAULT_USER_NAME";
        this.type                   = "";
        this.updated_at             = "-1";

        // Infos with oAuth Token provided
        this.email                  = "default@default.com";
        this.email_verified         = false;
        this.notifications          = null;
        this.partnered              = false;
        this.twitter_connected      = false;

        //Streaming Boolean values
        this.isStreaming            = false;
        this.listLastedStream       = []; //Info about the lasted stream
        
        // Oncalled Event
        this.OnStartedStream = function() { };
        this.OnEndedStream = function () { };
    }

}


class TwitchApi {

    constructor(twitchModule) {

        //console.log("HEY");
        setInterval(() => { this.update(this) }, 10000);

        this.api = null //Api Object initialize by Auth

        this._isConnected = false; //Boolean value for Auth
        this._connectedResponse = null; //Debug stack Auth response

        //Get Authentification from Twitch.tv
        this.getAuthentification();

        this.listStreamers = [];

        this.addStreamer.bind(this);
        this.getUserTwitchData.bind(this);
    }

    update(that) {
        
        console.log("[TwitchApi] Update()");

        if(that.getAuthentification())
        {

            if(this.listStreamers.length <= 0) {
                console.log("[TwitchApi] Aucun stream à surveiller");
                //this.addStreamer("minamicchiii");

            }
            else {

                for(const streamer of this.listStreamers) {
                    console.log(`[TwitchApi] Actualisation des informations pour l'utilisateur ${streamer.name}`);
                
                    this.refreshUserInfo(streamer);
                    this.UserOnLive(streamer);
        
                }

            }

        }

    }

    async refreshUserInfo(user) {

        let result = await this.getUserTwitchData(user.name);
        //Classical infos
        user.id                     = result.id;
        user.bio                    = result.description;
        user.created_at             = result.created_at;
        user.display_name           = result.display_name;
        user.logo                   = result.profile_image_url;
        user.name                   = result.login;
        user.type                   = result.type;
        user.updated_at             = result.update_at;

    }

    async addStreamer(username, func)
    {
        let user = new Streamer();
        user.name                   = username;
        if(this._isConnected) {
            let result = await refreshUserInfo(user);
            //Classical infos
            user.id                     = result.id;
            user.bio                    = result.description;
            user.created_at             = result.created_at;
            user.display_name           = result.display_name;
            user.logo                   = result.profile_image_url;
            user.name                   = result.login;
            user.type                   = result.type;
            user.updated_at             = result.update_at;
        }

        console.log(`[TwitchApi] Added ${user.name} to be watched by twitchApi`);

        this.listStreamers.push(user);

        func(user);
    }

    async getAuthentification()
    {
        console.log("getAuthentification");
        if(this._isConnected) return true;

        let result = null;

        await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${secretID}&grant_type=client_credentials`)
        .then(response => result = response);

        this._connectedResponse = result;
        this._isConnected = true;

        
        if(result != null)
        {
            console.log(`[TwitchApi] Connected to twitch API`);
                
            this.api = axios.create({
                headers: {
                    'Client-ID': clientID,
                    'Authorization': `Bearer ${result.data.access_token}`
                }
            });

        }
        else {
            console.log(`[TwitchApi] ERROR TWITCH API`);
        }
    }

    async getUserTwitchData(username)
    {
        console.log(`[TwitchApi] Getting User info ${username}`);

        let result = null;

        result = await this.api.get(`https://api.twitch.tv/helix/users?login=${username}`)
                        .then((response) => result = response.data.data[0]);


        return result;
    }

    async getStreams(idStreamer)
    {
        console.log(`[TwitchApi] Getting User streams ${idStreamer}`);

        let result = null;

        result = await this.api.get(`https://api.twitch.tv/helix/streams?user_id=${idStreamer}`)
                        .then((response) => result = response.data.data);

        //console.log(result);

        return result;
    }

    async UserOnLive(streamer)
    {
        console.log(`[TwitchApi] USERONLIVE des informations pour l'utilisateur ${streamer.name}`);
        streamer.listLastedStream = await this.getStreams(streamer.id);

        if(streamer.listLastedStream.length > 0)
        {

            if(!streamer.isStreaming)
            {
                console.log("[TwitchApi] Lancement du live de l'utilisateur");
                
                //this.twitchModule.beginNotificationLive(this.onLiveEmbed);

                streamer.isStreaming = true;

                streamer.OnStartedStream();
            }

            //this.twitchModule.updateNotificationLive(this.onLiveEmbed);
        }
        else
        {
            if(streamer.isStreaming)
            {
                console.log("[TwitchApi] Live de l'utilisateur terminé");
                

                //this.twitchModule.endNotificationLive(this.onLiveEmbed);

                streamer.isStreaming = false;
                streamer.OnEndedStream();
            }
            else
            {
                console.log("[TwitchApi] Aucun live lancée");
            }
        }
    }

}

exports.TwitchApi = TwitchApi;