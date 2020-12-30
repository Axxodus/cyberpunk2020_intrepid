// Constants
const message_options = {
    max:1,
    time: 30000,
    errors: ['time']
}

class Character{
    constructor(dm){
        this.dm = dm
        this.name = undefined
        this.age = undefined
        this.role = undefined
        this.pronouns = undefined
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
            this.dm.send(`How old is ${this.name}?`)
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

}


module.exports = {
	name: 'build_character.exe',
    description: 'Begins the character generation process for everyone in the channel.',
    args: false,
	execute(message, args) {
        message.guild.members.fetch().then((users) => {
            users.forEach((user) => {
                if(!user.user.bot){
                    let direct_message = user.createDM();
                    direct_message.then(dm => {
                        let character = new Character(dm)
                        character.setCharacterName()
                        .then(character => character.setCharacterAge())
                        .then(character => character.setCharacterPronouns())
                        .then(character => console.log(character))

                    }).catch(e => {
                        console.log(`An error occured: ${e}`)
                    })
                }
            })
        })
        
		message.channel.send(`Please check the console.`);
	},
};

