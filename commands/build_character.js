const bg_config = require("../background_gen")

// Constants
const message_options = {
    max:1,
    time: 30000,
    errors: ['time']
}

// Used for character selection
const dice_role = (sides = 10) => {
    return Math.ceil(Math.random()*sides)
}

class Character{
    constructor(dm){
        this.dm = dm
        this.name = undefined
        this.age = undefined
        this.role = undefined
        this.pronouns = undefined
        this.characteristics = {
            "int": 0,
            "emp": 0,
            "ref": 0,
            "cl": 0,
            "tech": 0,
            "att": 0,
            "ma": 0,
            "lk": 0 
        }
        this.style = undefined
        this.ethnicity = undefined
        this.eurodollars = 500
        this.biodata = {
            "family_ranking": null,
            "parent_status": null,
            "bad_parents": null,
            "family_status": null,
            "childhood_env": null,
            "family_tragedy": null,
            "siblings": null
        }
    }

    setCharacterName = () => {
        return new Promise((resolve, reject) => {
            let filter = m => m.author.id == this.dm.recipient.id
            this.dm.send(`What do you want your character to be called ${this.dm.recipient.username}?`)
            this.dm.awaitMessages(filter, message_options).then(messages => {
                let message = messages.first()
                this.name = message.content
                resolve(this)
            })
        })
    }

    setCharacterAge = () => {
        return new Promise((resolve, reject) => {
            let filter = m => m.author.id == this.dm.recipient.id
            this.dm.send(`How old is ${this.name}? (Must be more than 16!)`)
            this.dm.awaitMessages(filter, message_options).then(messages => {
                let message = messages.first()
                this.age = message.content
                resolve(this)
            })
        })
    }

    setCharacterPronouns = () => {
        return new Promise((resolve, reject) => {
            let filter = m => m.author.id == this.dm.recipient.id
            this.dm.send(`What are ${this.name}'s pronouns? (For example: He/Him/His)`)
            this.dm.awaitMessages(filter, message_options).then(messages => {
                let message = messages.first()
                this.pronouns = message.content
                resolve(this)
            })
        })
    }

    getCharacterInfoReadable = () => {
        return `Here is the character information for ${this.dm.recipient.username}: \n
        \t Name: ${this.name} \n
        \t Age: ${this.age} \n
        \t Role: ${this.role}\n
        \t Pronouns: ${this.pronouns}\n
        -----------END------------`
    }

    generateFamilyRanking = () => {
        return new Promise((resolve, reject) => {
            let filter = m => m.author.id == this.dm.recipient.id
            let message = `What is the family ranking of ${this.name}? Enter a number that corresponds with the name: \n`
            const options = bg_config.background_options.fam_ranking.options
            console.log(typeof options)
            Object.values(options).forEach((option) => {
                message = `${message} \t ${option.ranking}. ${option.name} \n`
            })
            this.dm.send(message)
            this.dm.awaitMessages(filter, message_options).then(messages => {
                let message = messages.first()
                if(parseInt(message.content) < 11){
                    this.biodata.family_ranking = parseInt(message.content)
                    this.dm.send(`Your family ranking has been confirmed as ${Object.values(options).find(element => element.ranking == parseInt(message.content)).name}`)
                } else {
                    this.dm.send(`You have chosen to have this randomly selected. Rolling the dice...`)
                    let selection = this.getRandomBackground(options)
                    this.biodata.family_ranking = selection.ranking
                    this.dm.send(`Your family ranking has been confirmed as ${selection.name}`)
                }
                resolve(this)
            })
        })
    }

     

    getRandomBackground = (attr) => {
        const rolled_dice = dice_role() - 1
        return Object.values(attr)[rolled_dice]
    }

    generateLifeStory = () => {
        // Family Background
            // Family Ranking - Picked
                // 4, 6, 10 get siblings
            // Parents - Random
            // Something Happened to your Parents - Random
            // Family Status - Random
            // Family Tragedy - Random
            // Childhood Environment - Picked
            // Siblings Picked
        
        
        
        // Motivations
            // All picked

        // Big Problems, Big Wins
            // Automate every year past 16\
        
        // Friends and Enemies
            // Automate
        
        // Romantic Life
            // Automate
    }
}


module.exports = {
	name: 'b',
    description: 'Begins the character generation process for everyone in the channel.',
    args: false,
	execute(message, args) {
        message.guild.members.fetch().then((users) => {
            let GM = users.find(user => user.roles.cache.find(r => r.name == "GM"))
            let GM_direct = GM.createDM(); 
            users.forEach((user) => {
                if(!user.user.bot && user.roles.cache.find(r => r.name == "Player")){
                    let direct_message = user.createDM();
                    direct_message.then(dm => {
                        let character = new Character(dm)
                        character.setCharacterName()
                        .then(character => character.setCharacterAge())
                        .then(character => character.setCharacterPronouns())
                        .then(character => {
                            character.dm.send("Basic engram infomation uploaded. Total engram upload 10% complete. Beginning upload of biographical data.", {tts: true})
                            return character
                        })
                        .then(character => character.generateFamilyRanking())
                        .then(character => console.log(character))
                        /* .then(character => {
                            GM_direct.then(dm => dm.send(character.getCharacterInfoReadable()))
                        }) */
                    }).catch(e => {
                        console.log(`An error occured: ${e}`)
                    })
                }
            })

            
        })
        
		message.channel.send(`Please check the console.`);
	},
};

