const { MessageEmbed } = require('discord.js');

const moment = require('moment');
const humanizeDuration = require("humanize-duration");

//Data container for the embed On Live
module.exports = class OnLiveEmbed {

    constructor() {
        this.logo               = "";
        this.user_login         = "";
        this.user_name          = "";
        this.title              = "";
        this.started_at         = "";
        this.viewer_count       = "";
        this.game_name          = "";
        this.thumbnail_url      = "";

        this.createdEmbed       = null;
    }

    createEmbed(endedLive = false) {

        let usernameTwitch = String(this.user_login || this.user_name).toLowerCase();
        let twitchUrl = `https://twitch.tv/${usernameTwitch}`;

        // Add uptime
        let now = moment();
        let startedAt = moment(this.started_at);

        if(this.createdEmbed != null) {

            //Updating infos

            if(endedLive)
            {
                msgEmbed.setColor("#7289da");
                this.createdEmbed.setAuthor(`${this.user_name} is now ended !`, this.logo, twitchUrl);
                return this.createdEmbed;
            }


            this.createdEmbed.setAuthor(`${this.user_name} is now live on Twitch.tv !`, this.logo, twitchUrl);
            this.createdEmbed.setTitle(`${this.title}`);
            this.createdEmbed.setURL(twitchUrl);

            this.createdEmbed.setDescription(`🔴 Viewers: ${this.viewer_count} | ⏰ Uptime: ${humanizeDuration(now - startedAt, {
                delimiter: ", ",
                largest: 2,
                round: true,
                units: ["y", "mo", "w", "d", "h", "m"]
            })}`);
            this.createdEmbed.fields[0] = { name: "Category", value: `${this.game_name} \n\n [Click here to watch stream.](${twitchUrl})`, inline: true } ;

            // Image
            let imageStream     = null;
            imageStream         = String(this.thumbnail_url);
            imageStream         = imageStream.replace("{width}", "1920");
            imageStream         = imageStream.replace("{height}", "1080");
            
            let thumbnailBuster = (Date.now() / 1000).toFixed(0);
            
            imageStream         += `?t=${thumbnailBuster}`;
            
            this.createdEmbed.setImage(imageStream);
    
            // Thumbnail
            let thumbnail       = `https://static-cdn.jtvnw.net/ttv-boxart/${encodeURI(this.game_name)}-340x396.jpg`;
            this.createdEmbed.setThumbnail(thumbnail);

        } else {
            
            //Creating embed
            
            let msgEmbed = new MessageEmbed();
            msgEmbed.setColor("#bf0000");
    
            msgEmbed.setAuthor(`${this.user_name} just started a live on Twitch.tv !`, this.logo, twitchUrl);
            msgEmbed.setTitle(`${this.title}`);
            msgEmbed.setFooter(`MyMiku • ${moment().format('DD-MM-YYYY hh:mm:ss')}`);
            msgEmbed.setURL(twitchUrl);
            
            msgEmbed.setDescription(`🔴 Viewers: ${this.viewer_count} | ⏰ Uptime: ${humanizeDuration(now - startedAt, {
                delimiter: ", ",
                largest: 2,
                round: true,
                units: ["y", "mo", "w", "d", "h", "m"]
            })}`);
            msgEmbed.addField("Category", `${this.game_name} \n\n [Click here to watch stream.](${twitchUrl})`, true);
            //msgEmbed.addField("Watch Stream", ` \n [Click here to watch stream.](${twitchUrl})`, true);
            // Image
            let imageStream     = null;
            imageStream         = String(this.thumbnail_url);
            imageStream         = imageStream.replace("{width}", "1920");
            imageStream         = imageStream.replace("{height}", "1080");
            
            let thumbnailBuster = (Date.now() / 1000).toFixed(0);
            
            imageStream         += `?t=${thumbnailBuster}`;
            
            msgEmbed.setImage(imageStream);
    
            // Thumbnail
            let thumbnail       = `https://static-cdn.jtvnw.net/ttv-boxart/${encodeURI(this.game_name)}-340x396.jpg`;
            msgEmbed.setThumbnail(thumbnail);
    

            this.createdEmbed = msgEmbed;
        }


        return this.createdEmbed;
    }

}