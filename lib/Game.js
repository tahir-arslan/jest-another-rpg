const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
};

Game.prototype.initializeGame = function() {
    // initialize enemy data
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));
    this.currentEnemy = this.enemies[0];

    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        // destructure name from prompt object
        .then(({ name }) => {
            this.player = new Player(name);

            // begin new battle
            this.startNewBattle();
        });
};

Game.prototype.startNewBattle = function() {
    // does player attack first? done by comparing agility values
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }

    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());
    console.log("Your current inventory contains the following:");
    console.log(this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`));
    // begin battle
    this.battle()
};

Game.prototype.battle = function() {
    if (this.isPlayerTurn) {
        inquirer
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use potion']
            })
            .then(({ action }) => {
                if (action === 'Use potion') {
                    // coded logic: if inventory is empty, return false. 
                    // if statement checks if inventory is empty.
                    if (!this.player.getInventory()) {
                        console.log("You don't have any potions!");
                        return this.checkEndOfBattle();
                    }
                    inquirer
                        .prompt({
                            type: 'list',
                            message: 'Which potion would you like to use?',
                            name: 'action',
                            // in this case, output is 'index + 1' don't confuse it with the true index value!
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        .then(({ action }) => {
                            // inquirer choice returns a string, so need to manipulate return accordingly
                            const potionDetails = action.split(': ');

                            // choice returns a string something like "2: Potion" but the actual index would be [1] and not [2]. 
                            // so once string is returned, split at the colon, use the first index (which in this example returns
                            // the number '2', subtract 1, and use that as the index value)
                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion.`);
                            this.checkEndOfBattle();
                        })
                } else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());
                    this.checkEndOfBattle();
                }
            });
    } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
        this.checkEndOfBattle();
    }
};

Game.prototype.checkEndOfBattle = function() {
    // need to define all conditions to end battle, because 'checkEndOfBattle()' will be called after
    // each condition, not just at the end of 'battle()'. since inquirer prompts are asynchronous,
    // we must wait for their promises to be resolved and perform our "end turn" logic in their callbacks

    // purpose of 'checkEndOfBattle()' logic is to see if both characters can continue fighting.
    // Situation 1: both players can continue fighting
    // if they can, switch turns and run 'battle()' again
    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    }
    // Situation 2: Player is alive, but enemy is defeated. Player is awarded a potion, roundNumber++
    // all enemies defeated ? player wins game : start new battle
    else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You've defeated the ${this.currentEnemy.name}`);

        // get potion info from enemy inventory, and add same potion to player inventory
        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);

        // increase roundNumber, and check if there are any more enemies
        this.roundNumber++;
        if (this.roundNumber < this.enemies.length){
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        } else {
            console.log('You win!');
        }
    } 
    // Situation 3: Player is defeated (this is set by default. If not Situation 1, or Situation 2, therefore Situation 3)
    else {
        console.log("You've been defeated!");
    }
};

module.exports = Game;