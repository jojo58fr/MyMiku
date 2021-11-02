module.exports = class BaseModule {
  
    constructor(name, description, active) {
      this.name             = name;
      this.description      = description;
      this.active           = active;
    }

    Construct() {

        let stateModule = "{OFF}";

        if(this.active)
            stateModule = "[ON]";

        console.log(`[MYMIKU] Module: ${this.name} - State: ${stateModule}`);
        
        //debug purposes
        console.log(`***********************************`);
        console.log(`* ${this.description} *`);
        console.log(`***********************************`);

        setInterval(() => { this.Update(this) }, 250);

    }

    Update() {

    }

    /* Events */

    async OnReady(client, interaction) {
        this.Construct();
    }

    async OnInteractionCreate() {

    }

    async OnGuildMemberAdd(client, interaction) {

    }


}