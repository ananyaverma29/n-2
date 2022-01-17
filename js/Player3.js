class Player {
    constructor(){
      this.index = null;
      this.distance = 0;
      this.name = null;
      this.rank = null;
    }
  
    getCount(){
      database.ref(rootPath+'playerCount').on("value",(data)=>{
        playerCount = data.val();
      })
    }
  
    updateCount(count){
      database.ref(rootPath).update({
        playerCount: count
      });
    }
  
    update(){
      var playerIndex = rootPath+"players/player" + this.index;
      database.ref(playerIndex).set({
        name:this.name,
        distance:this.distance
      });
    }
  
    static getPlayerInfo(){
      database.ref(rootPath+'players').on("value",(data)=>{
        allPlayers = data.val();
      })
    }
  
    getCarsAtEnd() {
      database.ref(rootPath+'CarsAtEnd').on("value",(data)=>{
        this.rank = data.val();
      })
    }
  
    static updateCarsAtEnd(rank) {
      database.ref(rootPath).update({
        CarsAtEnd:rank
      })
    }
  }