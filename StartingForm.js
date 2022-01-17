var path = "a ";
var fullPath="a/";
var lastKey;
var dbData;
var gs;
var pc;
var onlineButton, friendsButton;
var twoButton, threeButton, fourButton;
var startButton, enterButton;
var nameLabel, nameBox, keyLabel, keyBox, startSubmit, enterSubmit;
var database;
var backgroundImage;
function preload()
{
    backgroundImage = loadImage("./assets/background.png");
}
function setup(){
    createCanvas(windowWidth, windowHeight);
  background(backgroundImage);
    database = firebase.database();

    onlineButton =createButton("Online");
    onlineButton.class("mn");
   // onlineButton = createImg("orangebutton12.png");
  //  onlineButton.position(windowWidth/2-250,windowHeight);
   //onlineButton.size(50,50);
 
    friendsButton =createButton("Friends");
    friendsButton.class("mn");
    //friendsButton = createImg("bluebutton12.png");
   // friendsButton.position(windowWidth/2+100, windowHeight/2);
    //friendsButton.size(50,50);
    twoButton =createButton("Two Player");
    twoButton.class("mn");
    threeButton =createButton("Three Player");
    threeButton.class("mn");
    fourButton =createButton("Four Player");
    fourButton.class("mn");
    startButton =createButton("Start");
    enterButton =createButton("Enter");
    nameLabel = createElement("h3", "Enter your name:");
    nameBox = createInput();
    keyLabel = createElement("h3", "Enter the key:");
    keyBox = createInput();
    startSubmit = createButton("Submit");
    enterSubmit = createButton("Submit");
    positionElements();

}

function draw(){
    handleMousePress();
    // console.log(path);
    // console.log(fullPath);
    // console.log(lastKey);
    // console.log(gs);
    // console.log(pc);
    // console.log("***");
}

function handleMousePress(){
    onlineButton.mousePressed(()=>{
        path+="online ";
        fullPath+="online/";
        onlineButton.hide();
        friendsButton.hide();
        twoButton.show();
        threeButton.show();
        fourButton.show();

        twoButton.mousePressed(()=>{
            path+="two ";
            fullPath+="two/";
            onlineButton.hide();
            friendsButton.hide();
            twoButton.hide();
            threeButton.hide();
            fourButton.hide();

            console.log("Inside 2");
            

            database.ref(fullPath+"/lastKey/").once("value",(data)=>{
                lastKey = data.val();
                console.log(lastKey);
                database.ref(fullPath+"/"+lastKey+"/gameState/").once("value",(data)=>{
                    gs = data.val();
                });
                database.ref(fullPath+"/"+lastKey+"/playerCount/").once("value",(data)=>{
                    pc = data.val();
                    if(gs == 0 && pc<2){
                        window.open("sketch.html?p="+fullPath+"&l="+lastKey+"&g="+gs+"&p="+pc);
                    }
                });
            });
            
        });

        threeButton.mousePressed(()=>{
            path+="three ";
            fullPath+="three/";
            onlineButton.hide();
            friendsButton.hide();
            twoButton.hide();
            threeButton.hide();
            fourButton.hide();

            database.ref(fullPath+"/lastKey/").once("value",(data)=>{
                lastKey = data.val();
                database.ref(fullPath+"/"+lastKey+"/gameState/").once("value",(data)=>{
                    gs = data.val();
                });
                database.ref(fullPath+"/"+lastKey+"/playerCount/").once("value",(data)=>{
                    pc = data.val();
                    if(gs == 0 && pc<3){
                        window.open("sketch.html?p="+fullPath+"&l="+lastKey+"&g="+gs+"&p="+pc);
                    }
                });
            });
            

        });

        fourButton.mousePressed(()=>{
            path+="four ";
            fullPath+="four/";
            onlineButton.hide();
            friendsButton.hide();
            twoButton.hide();
            threeButton.hide();
            fourButton.hide();

            database.ref(fullPath+"/lastKey/").once("value",(data)=>{
                lastKey = data.val();
                database.ref(fullPath+"/"+lastKey+"/gameState/").once("value",(data)=>{
                    gs = data.val();
                });
                database.ref(fullPath+"/"+lastKey+"/playerCount/").once("value",(data)=>{
                    pc = data.val();
                    if(gs == 0 && pc<4){
                        window.open("sketch.html?p="+fullPath+"&l="+lastKey+"&g="+gs+"&p="+pc);
                    }
                    
                });
            });
            
        });
    });

    friendsButton.mousePressed(()=>{
        path+="friends ";
        fullPath+="friends/";
        onlineButton.hide();
        friendsButton.hide();
        twoButton.show();
        threeButton.show();
        fourButton.show();



        twoButton.mousePressed(()=>{
            path+="two ";
            fullPath+="two/";
            onlineButton.hide();
            friendsButton.hide();
            twoButton.hide();
            threeButton.hide();
            fourButton.hide();
            startButton.show();
            enterButton.show();

            startButton.mousePressed(()=>{
                database.ref(fullPath+"/lastKey/").once("value",(data)=>{
                    lastKey = data.val();
                    database.ref(fullPath+"/"+lastKey+"/gameState/").once("value",(data)=>{
                        gs = data.val();
                    });
                    database.ref(fullPath+"/"+lastKey+"/playerCount/").once("value",(data)=>{
                        pc = data.val();
                        if(gs == 0 && pc<2){
                            window.open("sketch.html?p="+fullPath+"&l="+lastKey+"&g="+gs+"&p="+pc);
                        }
                    });
                });
            });


            enterButton.mousePressed( async()=>{
                startButton.hide();
                enterButton.hide();
                keyLabel.show();
                keyBox.show();
                enterSubmit.show();

                enterSubmit.mousePressed(()=>{
                    

                    database.ref(fullPath).once("value", (data)=>{
                        var keysdata = data.val();
                        console.log(keysdata);
                        var uKeys = Object.keys(keysdata);
            
            console.log(uKeys);
                    for(var i=0; i<uKeys.length; i++){
                        console.log("inside for");
                        if(uKeys[i] == keyBox.value()){
                            console.log(uKeys[i]);
                            console.log("exists");
                            c=1;

                            database.ref(fullPath+keyBox.value()+"/playerCount").once("value", (data)=>{
                                pc =  data.val();
                                if(pc >0 && pc<2){

                                    database.ref(fullPath+keyBox.value()+"/gameState").once("value", (data)=>{
                                        gs=data.val();
                                        window.open("sketch.html?p="+fullPath+"&l="+keyBox.value()+"&g="+gs+"&p="+pc);
                                
                                    });

                                    }
                                else{
                                    alert("No place");
                                }
                            });

                        }
                        
                    }
                    if(c==0){
                        alert("Wrong Key");
                    }

                    });
                    





                });
            });

            


            
        });


//////////////////////////////////////////////////////////////////////////////////


threeButton.mousePressed(()=>{
    path+="three ";
    fullPath+="three/";
    onlineButton.hide();
    friendsButton.hide();
    twoButton.hide();
    threeButton.hide();
    fourButton.hide();
    startButton.show();
    enterButton.show();

    startButton.mousePressed(()=>{
        database.ref(fullPath+"/lastKey/").once("value",(data)=>{
            lastKey = data.val();
            database.ref(fullPath+"/"+lastKey+"/gameState/").once("value",(data)=>{
                gs = data.val();
            });
            database.ref(fullPath+"/"+lastKey+"/playerCount/").once("value",(data)=>{
                pc = data.val();
                if(gs == 0 && pc<3){
                    window.open("sketch.html?p="+fullPath+"&l="+lastKey+"&g="+gs+"&p="+pc);
                }
            });
        });
    });


    enterButton.mousePressed( async()=>{
        startButton.hide();
        enterButton.hide();
        keyLabel.show();
        keyBox.show();
        enterSubmit.show();

        enterSubmit.mousePressed(()=>{
            

            database.ref(fullPath).once("value", (data)=>{
                var keysdata = data.val();
                console.log(keysdata);
                var uKeys = Object.keys(keysdata);
    
    console.log(uKeys);
            for(var i=0; i<uKeys.length; i++){
                console.log("inside for");
                if(uKeys[i] == keyBox.value()){
                    console.log(uKeys[i]);
                    console.log("exists");
                    c=1;

                    database.ref(fullPath+keyBox.value()+"/playerCount").once("value", (data)=>{
                        pc =  data.val();
                        if(pc >0 && pc<3){
                            database.ref(fullPath+keyBox.value()+"/gameState").once("value", (data)=>{
                                gs=data.val();
                                window.open("sketch.html?p="+fullPath+"&l="+keyBox.value()+"&g="+gs+"&p="+pc);
                        
                            });
                        }
                        else{
                            alert("No place");
                        }
                    });

                }
                
            }
            if(c==0){
                alert("Wrong Key");
            }

            });
            





        });
    });

    


    
});
//////////////////////////////////////////////////////////////////////////




fourButton.mousePressed(()=>{
    path+="four ";
    fullPath+="four/";
    onlineButton.hide();
    friendsButton.hide();
    twoButton.hide();
    threeButton.hide();
    fourButton.hide();
    startButton.show();
    enterButton.show();

    startButton.mousePressed(()=>{
        database.ref(fullPath+"/lastKey/").once("value",(data)=>{
            lastKey = data.val();
            database.ref(fullPath+"/"+lastKey+"/gameState/").once("value",(data)=>{
                gs = data.val();
            });
            database.ref(fullPath+"/"+lastKey+"/playerCount/").once("value",(data)=>{
                pc = data.val();
                if(gs == 0 && pc<4){
                    window.open("sketch.html?p="+fullPath+"&l="+lastKey+"&g="+gs+"&p="+pc);
                }
            });
        });
    });


    enterButton.mousePressed( async()=>{
        startButton.hide();
        enterButton.hide();
        keyLabel.show();
        keyBox.show();
        enterSubmit.show();

        enterSubmit.mousePressed(()=>{
            database.ref(fullPath).once("value", (data)=>{
                var keysdata = data.val();
                console.log(keysdata);
                var uKeys = Object.keys(keysdata);
    
    console.log(uKeys);
            for(var i=0; i<uKeys.length; i++){
                console.log("inside for");
                if(uKeys[i] == keyBox.value()){
                    console.log(uKeys[i]);
                    console.log("exists");
                    c=1;

                    database.ref(fullPath+keyBox.value()+"/playerCount").once("value", (data)=>{
                        pc =  data.val();
                        if(pc >0 && pc<4){
                            database.ref(fullPath+keyBox.value()+"/gameState").once("value", (data)=>{
                                gs=data.val();
                                window.open("sketch.html?p="+fullPath+"&l="+keyBox.value()+"&g="+gs+"&p="+pc);
                        
                            });
                        }
                        else{
                            alert("No place");
                        }
                    });
                }   
            }
            if(c==0){
                alert("Wrong Key");
            }
            });
        });
    });    
});
////////////////////////////////////////////////////






    });

    

}

// function check(){
//   console.log(path);
//     console.log(fullPath);
//     console.log(lastKey);
//     console.log(gs);
//     console.log(pc);
//     console.log("***");

//         var playerCountRef = database.ref(fullPath+keyBox.value()).once("value");
// if(playerCountRef.exists()){
// console.log("exists");
// }
// else{
// console.log("doesn't exist");
// }

// }

function positionElements(){
    onlineButton.position(width/2-340, height/2-100);
    friendsButton.position(width/2+115, height/2-100);
    twoButton.position(width/2-400, height/2-100);
    threeButton.position(width/2-90, height/2-100);
    fourButton.position(width/2+200, height/2-100);
    startButton.position(width/2-200, height/2-100);
    enterButton.position(width/2+200, height/2-100);
    nameLabel.position(width/2-100, height/2-200);
    nameBox.position(width/2-100, height/2-160);
    startSubmit.position(width/2-100, height/2-130);
    keyLabel.position(width/2-100, height/2-150);
    keyBox.position(width/2-100, height/2-110);
    enterSubmit.position(width/2-100, height/2-80);

    twoButton.hide();
    threeButton.hide();
    fourButton.hide();
    startButton.hide();
    enterButton.hide();
    nameLabel.hide();
    nameBox.hide();
    startSubmit.hide();
    keyLabel.hide();
    keyBox.hide();
    enterSubmit.hide();
    

}
