new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true
      this.playerHealth = 100
      this.monsterHealth = 100
    },
    attack: function () {

      // Player attacks monster
      let damage = this.calculateDamage(3, 10);
      this.monsterHealth - damage <= 0 ? this.monsterHealth = 0 : this.monsterHealth -= damage;
      if (this.checkWin()) {
        return;
      }
      // Monster attacks player
      damage = this.calculateDamage(5, 12);
      this.playerHealth - damage <= 0 ? this.playerHealth = 0 : this.playerHealth -= damage;
      this.checkWin()
    },
    heal: function () {
      this.playerHealth + 10 >= 100 ? this.playerHealth = 100 : this.playerHealth += 10

      // Monster still can attack player
      let damage = this.calculateDamage(7, 12)
      this.playerHealth - damage <= 0 ? this.playerHealth = 0 : this.playerHealth -= damage;
      this.checkWin()
    },
    giveUp: function () {
      this.gameIsRunning = false
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
