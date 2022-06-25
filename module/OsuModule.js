const BaseModule = require('../utils/structures/BaseModule');
const { OsuApi } = require("../client/OsuApi");

module.exports = class OsuModule extends BaseModule {
	
    constructor() {
	  super('Osu Module', 'A module that called osu API with exclusives features !', true);
	}
  
	Construct() {
		super.Construct();

		let osuApi = new OsuApi(this);

		this.client = null;
	}

	Update() {
		super.Update();

	}

    async OnReady(client, interaction) {
		await super.OnReady(client, interaction);
    }

	/* Modules functions */



}
