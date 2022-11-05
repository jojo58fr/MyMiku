module.exports = class BaseModule {
  
    constructor(name, description, active) {
      this.name             = name;
      this.description      = description;
      this.active           = active;

      this.Construct.bind(this);
      this.Start.bind(this);
      this.Update.bind(this);
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

        this.Start(this);
        setInterval(() => { this.Update(this) }, 250);

    }

    Start() {

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