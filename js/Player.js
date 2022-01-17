class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.distance=0;
    this.rank=0;
    this.fuel = 185;
    this.life = 185;
    this.score = 0;
  }

  addPlayer() {
    var playerIndex = rootPath+"players/player" + this.index;

    // if (this.index === 1) {
    //   this.positionX = width / 2 - 100;
    // } else {
    //   this.positionX = width / 2 + 100;
    // }
    if(choice=="two"){
      if(pc==0){
        this.positionX = width/2-100;
      }
      else if(pc==1){
        this.positionX = width/2+100;
      }
    }
    else if(choice=="three"){
      if(pc==0){
        this.positionX = width/2-150;
      }
      else if(pc==1){
        this.positionX = width/2;
      }
      else if(pc==2){
        this.positionX = width/2+150;
      }
    }
    else if(choice=="four"){
      if(pc==0){
        this.positionX = width/2 - 250;
      }
      else if(pc==1){
        this.positionX = width/2 - 100;
      }
      else if(pc==2){
        this.positionX = width/2+100;
      }
      else if(pc==3){
        this.positionX = width/2 + 250;
      }
    }


    // else if(choice=="four"){
    //   if(pc==0){
    //     this.positionX = width/4;
    //   }
    //   else if(pc==1){
    //     this.positionX = 3*(width/4);
    //   }
    //   else if(pc==2){
    //     this.positionX = 5*(width/4);
    //   }
    //   else if(pc==3){
    //     this.positionX = 7*(width/4);
    //   }
    // }





    database.ref(playerIndex).update({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      distance:this.distance,
      rank:this.rank,
      score: this.score
    });
    console.log(pc);
    if(choice=="two"){
      if(pc==1){
        database.ref(p+"/").update({
          lastKey:(lastKey+1)
        });
        database.ref(p+"/"+(lastKey+1)+"/").update({
          carsAtEnd:0,
          gameState:0,
          playerCount:0
        });
      }
    }
    else if(choice=="three"){
      if(pc==2){
        database.ref(p+"/").update({
          lastKey:(lastKey+1)
        });
        database.ref(p+"/"+(lastKey+1)+"/").update({
          carsAtEnd:0,
          gameState:0,
          playerCount:0
        });
      }
    }
    else if(choice=="four"){
      if(pc==3){
        database.ref(p+"/").update({
          lastKey:(lastKey+1)
        });
        database.ref(p+"/"+(lastKey+1)+"/").update({
          carsAtEnd:0,
          gameState:0,
          playerCount:0
        });
      }
    }
  }

  getCount() {
    var playerCountRef = database.ref(rootPath+"playerCount/");
    playerCountRef.once("value", (data) => {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    database.ref(rootPath).update({
      playerCount: count
    });
  }
  update(){
    var playerIndex = rootPath+"players/player" + this.index;
    database.ref(playerIndex).update({
      positionX: this.positionX,
      positionY: this.positionY,
      name:this.name,
      distance:this.distance,
      rank:this.rank,
      score: this.score,
      life: this.life
    });
  }
  getCarsAtEnd() {
    database.ref(rootPath+'carsAtEnd').once("value",(data)=>{
      this.rank = data.val();
    })
  }
  static getPlayersInfo() {
    var playerInfoRef = database.ref(rootPath+"players");
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
    });
  }
  static updateCarsAtEnd(rank) {
    database.ref(rootPath).update({
      carsAtEnd:rank
    })
    // var playerIndex = rootPath+"players/player" + this.index;
    // database.ref(playerIndex).update({
    //   rank:this.rank
    // });
  }
}
