new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true
      this.playerHealth = 100
      this.monsterHealth = 100
      this.turns = []
    },
    attack: function () {
      // Player attacks monster
      let damage = this.calculateDamage(3, 10);
      this.monsterHealth - damage <= 0 ? this.monsterHealth = 0 : this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits monster for ' + damage
      })
      if (this.checkWin()) {
        return;
      }
      // Monster attacks player
      this.monsterAttack()
      this.checkWin()
    },
    specialAttack: function () {

      // Player attacks monster
      let damage = this.calculateDamage(10, 20);
      this.monsterHealth - damage <= 0 ? this.monsterHealth = 0 : this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits monster for ' + damage
      })
      if (this.checkWin()) {
        return;
      }

      // Monster attacks player
      this.monsterAttack()
      this.checkWin()
    },
    heal: function () {
      this.playerHealth + 10 >= 100 ? this.playerHealth = 100 : this.playerHealth += 10
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals for 10'
      })
      // Monster still can attack player
      this.monsterAttack()
      this.checkWin()
    },
    giveUp: function () {
      this.gameIsRunning = false
    },
    monsterAttack: function () {
      damage = this.calculateDamage(5, 12);
      this.playerHealth - damage <= 0 ? this.playerHealth = 0 : this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits player for ' + damage
      })
    },
    calculateDamage: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    checkWin: function () {
      if (this.playerHealth <= 0) {
        this.gameIsRunning = false
        setTimeout(() => {
          alert('You lost!')
        }, 500);
        return true;
      }
      else if (this.monsterHealth <= 0) {
        this.gameIsRunning = false
        setTimeout(() => {
          alert('You won!')
        }, 500);
        return true;
      }

      return false;
    }
  }
})
