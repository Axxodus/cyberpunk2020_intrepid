module.exports = {
    "background_options": {
        "fam_ranking": {
            "roll_type": 10,
            "options": {
                "corp_exec": {
                    "ranking": 1,
                    "name": "Corporate Executive"
                },
                "corp_mang": {
                    "ranking": 2,
                    "name": "Corporate Manager"
                },
                "corp_tech": {
                    "ranking": 3,
                    "name": "Corporate Technician"
                },
                "nomad_pack": {
                    "ranking": 4,
                    "name": "Nomad Pack"
                },
                "pirate_fleet": {
                    "ranking": 5,
                    "name": "Pirate Fleet"
                },
                "gang_family": {
                    "ranking": 6,
                    "name": "Gang Family"
                },
                "crime_lord": {
                    "ranking": 7,
                    "name": "Crime Lord"
                },
                "comb_zone_poor": {
                    "ranking": 8,
                    "name": "Combat Zone Poor"
                },
                "u_homeless": {
                    "ranking": 9,
                    "name": "Urban homeless"
                },
                "arc_family": {
                    "ranking": 10,
                    "name": "Arcology family"
                },
                "random": {
                    "ranking": 11,
                    "name": "Randomly Select Option"
                }
            },
            "next": "parent_status"
        },
        "parent_status": {
            "roll_type": 10,
            "next": (parent_status) => {
                return parent_status > 6 ? "bad_parents" : "family_status"
            },
            "low_roll": "Both of your parents are still alive",
            "high_roll": "Something has happened to one or both of your parents.",
            "threshold": 6
        },
        "bad_parents": {
            "roll_type": 10,
            "next": "family_status",
            "options": {
                "warefare":{
                    "ranking": 1,
                    "description": "They died in combat during a war."
                },
                "accident":{
                    "ranking": 2,
                    "description": "They died in an accident"
                },
                "murdered":{
                    "ranking": 3,
                    "description": "They were brutally murdered."
                },
                "amnesia":{
                    "ranking": 4,
                    "description": "They have amnesia and can't remember you."
                },
                "orphan":{
                    "ranking": 5,
                    "description": "You never knew them."
                },
                "hiding":{
                    "ranking": 6,
                    "description": "They had to go into hiding to protect you."
                },
                "relatives":{
                    "ranking": 7,
                    "description": "They left you with close relatives to keep you safe."
                },
                "no_parents":{
                    "ranking": 8,
                    "description": "You didn't have any. You didn't meed them. You grew up on the street."
                },
                "adopted":{
                    "ranking": 9,
                    "description": "They gave you up for adoption."
                },
                "sold":{
                    "ranking": 10,
                    "description": "They sold you for money."
                }
            }
        },
        "family_status":{
            "roll_type": 10,
            "next": (family_status) => {
                return family_status > 6 ? "childhood_env" : "family_tragedy"
            },
            "low_roll": "Currently, your family is in danger and you risk losing everyting (if you haven't already).",
            "high_roll": (bad_family) => {
                bad_family ? "Currently, your family is OK even if your parents are missing or dead." :
                "Currently, your family is OK."
            }
        },
        "childhood_env":{
            "roll_type": 10,
            "next": "siblings",
            "options": {
                "streets": {
                    "ranking": 1,
                    "description": "You spent most of your childhood on the street with little to no adult supervision."
                },
                "corpo": {
                    "ranking": 2,
                    "description": "You were lucky. You spent most of your childhood in the safety of Corporate Suburbia"
                },
                "nomad": {
                    "ranking": 3,
                    "description": "You spent most of your childhood moving from town to town in a Nomad pack."
                },
                "decay": {
                    "ranking": 4,
                    "description": "You spent most of your childhood in a decaying, once upscale, neighborhood."
                },
                "corpo_defended": {
                    "ranking": 5,
                    "description": "You spent most of your childhood in a defended Corporate Zone in the central City."
                },
                "combat": {
                    "ranking": 6,
                    "description": "You spent most of your childhood in the heart of the Combat Zone."
                },
                "village": {
                    "ranking": 7,
                    "description": "You spent most of your childhood in a small town or village far from the city."
                },
                "arc_city": {
                    "ranking": 8,
                    "description": "You spent most of your childhood in a large arcology city."
                },
                "pirate": {
                    "ranking": 9,
                    "description": "You spent most of your childhood in an aquatic Pirate Pack."
                },
                "corpo_outpost": {
                    "ranking": 10,
                    "description": "You spent most of your childhood on Corporate controlled Farm or Research Facility."
                }
            }
        },
        "family_tragedy":{
            "next": "childhood_env",
            "roll_type": 10,
            "options": {
                "betrayal":{
                    "ranking": 1,
                    "description": "Your family lost everything through betrayal."
                },
                "bad_management":{
                    "ranking": 2,
                    "description": "Your family lost everything through bad management."
                },
                "exile":{
                    "ranking": 3,
                    "description": "Your family was exiled or driven from their original home/nation/corporation."
                },
                "imprisoned":{
                    "ranking": 4,
                    "description": "Your family was imprisoned and you are the sole person who escaped."
                },
                "vanished":{
                    "ranking": 5,
                    "description": "Your family disappeared without a trace and you are the remaining member."
                },
                "murdered":{
                    "ranking": 6,
                    "description": "Your entire family was murdered and you are the sole survivor."
                },
                "conspiracy":{
                    "ranking": 7,
                    "description": "Your family is involved in a long term conspiracy, criminal organisation, or revolutionary group."
                },
                "scattered":{
                    "ranking": 8,
                    "description": "Your family was scattered to the winds due to misfortune."
                },
                "hereditary_feud":{
                    "ranking": 9,
                    "description": "Your family is cursed with a hereditary feud that has lasted for generations."
                },
                "debt":{
                    "ranking": 10,
                    "description": "You have inherited your family's debt and you must honor it before you can move on with your life."
                }
            }
        },
        "siblings":{
            "roll_type": 10,
            "next": null,
            "sibling_count": (roll) => {
                return roll < 8 ? roll : 0
            },
            "sibling_gen": (roll_gender, roll_age, roll_feelings) => {
                let age = null
                let feelings = null
                let gender = null

                if(roll_age < 5){
                    age = "younger"
                } else if (roll_age >= 5 && roll_age < 10){
                    age = "older"
                } else {
                    age = "twin"
                }

                switch(roll_feelings){
                    case 1:
                    case 2: feelings =  "This sibling dislikes you."; break;
                    case 3:
                    case 4: feelings = "This sibling likes you."; break;
                    case 5:
                    case 6: feelings = "This sibling is neutral towards you."; break;
                    case 7:
                    case 8: feelings = "This sibling hero worships you."; break;
                    case 9:
                    case 10: feelings = "This sibling hates you."; break;
                    default: return null;
                }

                gender = roll_gender % 2 ? "Male" : "Female"

                return {
                    "age": age,
                    "feelings": feelings,
                    "gender": gender
                }
            }
        }
    }
}