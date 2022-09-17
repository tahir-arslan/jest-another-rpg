const Potion = require('../lib/Potion');
const Character = require('./Character');



// thanks to ES6, can set parameter to emply string by default like shown below
// inheritance
class Player extends Character {
    constructor(name=``){
        // call parent constructor
        super(name);
    
        // after inheritance from parent, Player will obtain additional properties
        this.inventory = [new Potion('health'), new Potion()];    
    
        // player will now inherit these from Character
        // this.name = name;
        // this.health = Math.floor(Math.random() * 10 + 95);
        // this.strength = Math.floor(Math.random() * 5 + 7);
        // this.agility = Math.floor(Math.random() * 5 + 7);
    }

    getStats() {
        // return object with various player properties
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    }

    getInventory() {
        // returns inventory array or false if empty
        if (this.inventory.length) {
            return this.inventory
        }
        return false;
    }

    addPotion(potion) {
        this.inventory.push(potion);
    }

    usePotion(index) {
        const potion = this.inventory.splice(index, 1)[0];
        switch (potion.name) {
            case 'agility':
                this.agility += potion.value;
                break;
            case 'health':
                this.health += potion.value;
                break;
            case 'strength':
                this.strength += potion.value;
                break;
        }
    }
};

module.exports = Player;

// removed for refactor, Player will now inherit these properties from Character.js
// with ES6 syntax, the old `prototype declarations including `Object.create()` is removed,
// this breaks the game since inheritence is now gone. if tests are run, inheretence tests will
// fail but other tests should still pass
// ===================================================
// Player.prototype.getHealth = function() {
//     return `${this.name}'s health is now ${this.health}|!`
// };

// Player.prototype.isAlive = function() {
//     if (this.health === 0) {
//         return false;
//     } 
//     return true;
// };

// Player.prototype.reduceHealth = function(health) {
//     this.health -= health;
//     if (this.health < 0) {
//         this.health = 0;
//     }
// };

// Player.prototype.getAttackValue = function() {
//     const min = this.strength -5;
//     const max = this.strength + 5;
// 
//     return Math.floor(Math.random() * (max - min) + min);
// };
// ===================================================

// thanks to ES6, can set parameter to emply string by default like shown below
// function Player(name = '') {
//     this.name = name;
// 
//     this.health = Math.floor(Math.random() * 10 + 95);
//     this.strength = Math.floor(Math.random() * 5 + 7);
//     this.agility = Math.floor(Math.random() * 5 + 7);
// 
//     this.inventory = [new Potion('health'), new Potion()];
// };

// // inherit protptype methods from Character
// Player.prototype = Object.create(Character.prototype);

// Player.prototype.getStats = function() {
// // return object with various player properties
//     return {
//         potions: this.inventory.length,
//         health: this.health,
//         strength: this.strength,
//         agility: this.agility
//     };
// };

// Player.prototype.getInventory = function() {
// // returns inventory array or false if empty
//     if (this.inventory.length) {
//         return this.inventory
//     }
//     return false;
// };

// Player.prototype.addPotion = function(potion) {
//     this.inventory.push(potion);
// };

// Player.prototype.usePotion = function(index) {
//     const potion = this.getInventory().splice(index, 1)[0];
// 
//     switch (potion.name) {
//         case 'agility':
//             this.agility += potion.value;
//             break;
//         case 'health':
//             this.health += potion.value;
//             break;
//         case 'strength':
//             this.strength += potion.value;
//             break;
//     }
// };