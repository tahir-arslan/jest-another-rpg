const Potion = require('./Potion');
const Character = require('./Character');

// inheritance
class Enemy extends Character {
    constructor (name, weapon) {
        // call parent constructor
        super(name);

        // after inheritance from parent, Enemy will obtain additional properties
        this.weapon = weapon;
        this.potion = new Potion();
    
        // enemy will now inherit these from Character
        // this.name = name;
        // this.health = Math.floor(Math.random() * 10 + 85);
        // this.strength = Math.floor(Math.random() * 5 + 5);
        // this.agility = Math.floor(Math.random() * 5 + 5);
    }

    getDescription() {
        return `A ${this.name} holding a ${this.weapon} has appeared!`;
    }
};

module.exports = Enemy;

// removed for refactor, Enemy will now inherit these properties from Character.js
// ===================================================
// Enemy.prototype.getHealth = function() {
//     return `The ${this.name}'s health is now ${this.health}!`;
// };

// Enemy.prototype.isAlive = function() {
//     if (this.health === 0) {
//         return false;
//     }
//     return true;
// };

// Enemy.prototype.getAttackValue = function() {
//     const min = this.strength - 5;
//     const max = this.strength + 5;
//
//     return Math.floor(Math.random() * (max - min) + min);
// };

// Enemy.prototype.reduceHealth = function(health) {
//     this.health -= health;
//
//     if(this.health < 0) {
//         this.health = 0;
//     }
// };
// ===================================================