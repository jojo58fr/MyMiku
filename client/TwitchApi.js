const axios = require('axios').default;
const { clientID, secretID } = require('../config-twitch.json');

const OnLiveEmbed = require('./embeds/OnLiveEmbed');
const TwitchModule = require('../module/stream/TwitchModule');

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


        this.onLiveEmbed = new OnLiveEmbed();

        var myMikuClient = require('../client/MyMikuClient').instance;
        this.twitchModule = twitchModule;
    }

    update(that) {
        
        console.log("Je suis l'update de Twitch API");

        if(that.getAuthentification())
        {

            if(this.listStreamers.length <= 0) {
                console.log("Ajout des streamers à la base");
                this.addStreamer("TakuDev");
                //this.addStreamer("minamicchiii");

            }
            else {

                for(const streamer of this.listStreamers) {
                    console.log(`Actualisation des informations pour l'utilisateur ${streamer.name}`);
                
                    this.UserOnLive(streamer);
        
                }

            }

        }

    }

    async addStreamer(username)
    {
        let user = new Streamer();

        let result = await this.getUserTwitchData(username);

        //Classical infos
        user.id                     = result.id;
        user.bio                    = result.description;
        user.created_at             = result.created_at;
        user.display_name           = result.display_name;
        user.logo                   = result.profile_image_url;
        user.name                   = result.login;
        user.type                   = result.type;
        user.updated_at             = result.update_at;

        this.listStreamers.push(user);
    }

    async getAuthentification()
    {
        if(this._isConnected) return true;

        let result = null;

        await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${secretID}&grant_type=client_credentials`)
        .then(response => result = response);

        this._connectedResponse = result;
        this._isConnected = true;

        if(result != null)
        {
            console.log(`Connected to twitch API`);
            //console.log(`Connected to twitch API: ${result.data.token_type}`);
            //console.log(`Connected to twitch API: ${result.data.token_type} ${result.data.access_token}`);
    
            this.api = axios.create({
                headers: {
                    'Client-ID': clientID,
                    'Authorization': `Bearer ${result.data.access_token}`
                }
            });

        }
    }

    async getUserTwitchData(username)
    {
        console.log(`Getting User info ${username}`);

        let result = null;

        result = await this.api.get(`https://api.twitch.tv/helix/users?login=${username}`)
                        .then((response) => result = response.data.data[0]);


        return result;
    }

    async getStreams(idStreamer)
    {
        console.log(`Getting User streams ${idStreamer}`);

        let result = null;

        result = await this.api.get(`https://api.twitch.tv/helix/streams?user_id=${idStreamer}`)
                        .then((response) => result = response.data.data);

        //console.log(result);

        return result;
    }

    async UserOnLive(streamer)
    {
        console.log(`USERONLIVE des informations pour l'utilisateur ${streamer.name}`);
        streamer.listLastedStream = await this.getStreams(streamer.id);


        let lastedStream = streamer.listLastedStream[0];

        if(streamer.listLastedStream.length > 0)
        {

            this.onLiveEmbed.logo               = streamer.logo;
            this.onLiveEmbed.user_login         = streamer.name;
            this.onLiveEmbed.user_name          = streamer.display_name;
            this.onLiveEmbed.title              = lastedStream.title;
            this.onLiveEmbed.started_at         = lastedStream.started_at;
            this.onLiveEmbed.viewer_count       = lastedStream.viewer_count;
            this.onLiveEmbed.game_name          = lastedStream.game_name;
            this.onLiveEmbed.thumbnail_url      = lastedStream.thumbnail_url;

            if(!streamer.isStreaming)
            {
                console.log("Lancement du live de l'utilisateur");
                
                this.twitchModule.beginNotificationLive(this.onLiveEmbed);

                streamer.isStreaming = true;
            }

            this.twitchModule.updateNotificationLive(this.onLiveEmbed);
        }
        else
        {
            if(streamer.isStreaming)
            {
                console.log("Live de l'utilisateur terminé");
                

                this.twitchModule.endNotificationLive(this.onLiveEmbed);

                streamer.isStreaming = false;
            }
            else
            {
                console.log("Aucun live lancée");
            }
        }
    }

}

exports.TwitchApi = TwitchApi;