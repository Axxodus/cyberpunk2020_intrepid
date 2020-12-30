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

    generateLifeStory = () => {
        // Family Background
            // Family Ranking - Picked
                // 4, 6, 10 get siblings
            // Parents - Random
            // Something Happened to your Parents - Random
            // Family Status - Random
            // Family Tragedy - Random
            // Childhood Environment - Picked
            // Picked
        
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
                            GM_direct.then(dm => dm.send(character.getCharacterInfoReadable()))
                        })
                    }).catch(e => {
                        console.log(`An error occured: ${e}`)
                    })
                }
            })

            
        })
        
		message.channel.send(`Please check the console.`);
	},
};

