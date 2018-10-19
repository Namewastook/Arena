function refreshPage() {
    window.location.reload();
}

class Creature {
    constructor(options) {
        if (!options.name) {
            throw (new Error("Name is a required field!"));
        } else {
            this.name = options.name;
        }
        this.health = options.health || 50;
        this.maxHealth = this.health * 2;
        this.chanceToCrit = options.chanceToCrit || 0.1;
        this.chanceToMiss = options.chanceToMiss || 0.3;
        this.baseDamage = options.baseDamage || 10;
        this.fight = function (creature) {

            let message
            if (Math.random() < this.chanceToMiss) {
                message = `${this.name} missed ${creature.name} with its attack!`;
            } else {
                const dmg = Math.random() < this.chanceToCrit ?
                    this.baseDamage * 2 :
                    this.baseDamage;
                creature.health -= dmg;
                message = `${creature.name} has been hit by ${this.name}! ${creature.name} is now at ${creature.health} health.`;
            }
            let newDiv = document.createElement("div");
            let battleMessage = document.createTextNode(message);
            newDiv.appendChild(battleMessage);
            document.body.appendChild(newDiv);

        };
        console.log("message")
    }
}

class Hero extends Creature {
    constructor(options) {
        super(options);
        this.health = options.health || 100;
    }
}

class Monster extends Creature {
    constructor(options) {
        super(options);
    }
}

function battle(hero, ...monsters) {
    if (monsters.length === 0) {
        monsters = [new Creature({
            name: "The Invisible Man"
        })]
    }

    monsters.forEach(monster => {
        if (hero.health <= 0 || monster.health <= 0) {
            let newDiv = document.createElement("div");
            let victory = document.createTextNode(
                hero.health > 0 ?
                hero.name + ' has won the battle!. ' :
                monster.name + ` has defeated ${hero.name}. `
            )
            newDiv.appendChild(victory);
            document.body.appendChild(newDiv);
        } else if (hero.health > 0 && monster.health > 0) {
            hero.fight(monster)
            monster.fight(hero)
            let newDiv = document.createElement("div")
            let battleMessage2 = document.createTextNode(hero.name + ' is at ' + hero.health + ' health and ' + monster.name + ' is at ' + monster.health + ' health. ')
            newDiv.appendChild(battleMessage2)
            document.body.appendChild(newDiv)
            return
        }
    })

}


const Fighter = new Hero({
    name: 'The Fighter',

})

const Ninja = new Monster({
    name: 'The Ninja',
    chanceToCrit: 0.9,
})

const Rogue = new Hero({
    name: 'The Rogue',
    maxHealth: 50,
    chanceToCrit: .9
})

const Barbarian = new Hero({
    name: 'The Barbarian',
    baseDamage: 20,
    chanceToMiss: .6
})

const Dragonslayer = new Hero({
    name: "The Dragon Slayer",
    health: 1000,
    baseDamage: 125
})

const Kobold = new Monster({
    name: 'The Kobold',
    health: 20,
})


const Goblin = new Monster({
    name: 'The Goblin',
})


const Thug = new Monster({
    name: 'The Petty criminal',
    health: 100
})

const Dragon = new Monster({
    name: 'The Dragon',
    health: 1000,
    baseDamage: 100,

})

const creatureReferences = {
    'Fighter': Fighter,
    'Rogue': Rogue,
    'Barbarian': Barbarian,
    'Kobold': Kobold,
    'Ninja': Ninja,
    'Goblin': Goblin,
    'Thug': Thug,
    'Dragon': Dragon,
    'Dragon Slayer': Dragonslayer,
}

let fight = document.getElementById("Fight").addEventListener("click", function () {
    const thing1 = document.getElementById("First").value;
    const thing2 = document.getElementById("Second").value;
    const thingy1 = creatureReferences[thing1];
    const thingy2 = creatureReferences[thing2];
    battle(thingy1, thingy2);
});


//Hero.class.constructor = Hero
//Hero.class = "Power Attack"
//Hero.class = "Healing Potion"


//Monster.class.constructor = Monster
//Monster.class = "Power Attack"
//Monster.class = "Healing Potion"

function run() {
    document.getElementById("First").value = document.getElementById("Ultra").value;
}

function running() {
    document.getElementById("Second").value = document.getElementById("Mega").value;
}