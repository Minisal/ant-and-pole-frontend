document.addEventListener('DOMContentLoaded', function() {
  // Do after the document fully loaded
});

// ---------------------- Pages ---------------------- //

// Splash Page
var pageSplash = document.querySelector('#pageSplash');
// --
var splashScreenTxt = document.querySelector('#splashScreenTxt');
var splashScreenLogo = document.querySelector('#splashScreenLogo');

// Home Page
var pageHome = document.querySelector('#pageHome');
// --
var StartBtn = document.querySelector('#StartBtn');
var aboutBtn = document.querySelector('#aboutBtn');

// About Page
var pageAbout = document.querySelector('#pageAbout');
// --
var abtPageBackBtn = document.querySelector('#abtPageBackBtn');

// Mode Setting Page
var pageModeSetting = document.querySelector('#pageModeSetting');
// --
var StandardModeBtn = document.querySelector('#StandardModeBtn');
var CustomModeBtn = document.querySelector('#CustomModeBtn');

// Standard Mode Page
var pageStandardMode = document.querySelector('#pageStandardMode');
// --
var DirectionSettingBtn = document.querySelector('#DirectionSettingBtn');
var MaxAndMinTimeBtn = document.querySelector('#MaxAndMinTimeBtn');

// Custom Mode Page
var pageCustomMode = document.querySelector('#pageCustomMode');
// --
var PoleLengthInput = document.querySelector('#PoleLengthInput');
var AntNumInput = document.querySelector('#AntNumInput');
var NextStep1Btn = document.querySelector('#NextStep1Btn');

// Position Setting Page
var pagePositionSetting = document.querySelector('#pagePositionSetting');
// --
var AntPositionInput = document.querySelector('#AntPositionInput');
var AntSpeedInput = document.querySelector('#AntSpeedInput');
var NextStep2Btn = document.querySelector('#NextStep2Btn');

// Direction Setting Page
var pageDirectionSetting = document.querySelector('#pageDirectionSetting');
// --
var ShowBtn = document.querySelector('#ShowBtn');



// Max And Min Time Page
var pageMaxAndMinTime = document.querySelector('#pageMaxAndMinTime');
// --
var mmatPageBackBtn = document.querySelector('#mmatPageBackBtn');

// Total Time Page
var pageTotalTime = document.querySelector('#pageTotalTime');
// --
var ttPageBackBtn = document.querySelector('#ttPageBackBtn');


var pagesArray = [
  pageSplash, pageHome, pageAbout, pageModeSetting, 
  pageCustomMode, pagePositionSetting, pageDirectionSetting, 
  pageMaxAndMinTime, pageTotalTime
];

// glabal data
var poleLength = 300;
var antNum = 5;
var position = 0;
var speed = 5;
var direction = -1;

var ants = [ // position, speed, direction
  [30, 5, -1],
  [80, 5, -1],
  [110, 5, -1],
  [160, 5, -1],
  [250, 5, -1]
]; 
var maxTime = 0;
var minTime = 0;
var customTime = 0;
var maxTimeState;
var minTimeState;
var customTimeState;

var dataPreparedFlag = true;


// ===============================================================
// ===============================================================


// ------------- GENERAL FUNCTIONS ------------- //
toolsBox = {
  delay: function(fun, delayTime) {
    var delayAction = setTimeout(fun, delayTime);
  },
  showPage: function(page) {
    page.style.display = "block";
  },
  hidePage: function(page) {
    page.style.display = "none";
  },
  hideSplashScreen: function() {
    splashScreenTxt.classList.add('fadeOut-animation');
    splashScreenLogo.classList.add('fadeOut-animation');
    toolsBox.delay(function() {
      toolsBox.showPage(pageHome);
      toolsBox.hidePage(pageSplash);
    }, 1500); // Show after 1.5s because the fadeOut-animation takes 0.5s and has 1s delay
  },
  onClickNTouchstart: function(element, fun) { // add click and touchstart event listeners
    element.addEventListener('click', fun, false);
    element.addEventListener('touchstart', fun, false);
  },
  windowSize: { // get the size of the page
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  },
  sleep: function(d){
  for(var t = Date.now();Date.now() - t <= d;);
  }
}


// ===============================================================


// -------------------------------------------- //
// ---------------- Audio Pool --------------- //

var audioPool = {
  sounds: [
    buttonTap = { sound: "buttonTap", preload: true, volume: 1, loop: false },
    delayCount = { sound: "delayCount", preload: true, volume: 1, loop: false }
  ],
  createAudioPlayer: function(element) {
    element.audioPlayer = document.createElement('audio');

    mp3Source = document.createElement('source');
    oggSource = document.createElement('source');

    // Get the name of the sounds from the object inside the array
    mp3Link = "sounds/mp3/" + element.sound + ".mp3";
    oggLink = "sounds/ogg/" + element.sound + ".ogg";

    // Setting the attributes for the source elemnts
    mp3Source.setAttribute('type', 'audio/mpeg');
    oggSource.setAttribute('type','audio/ogg');
    mp3Source.setAttribute('src', mp3Link);
    oggSource.setAttribute('src', oggLink);

    // Appending the sources to the player, and appending the player to the page
    element.audioPlayer.appendChild(mp3Source);
    element.audioPlayer.appendChild(oggSource);
    document.body.appendChild(element.audioPlayer);

    element.audioPlayer.volume = element.volume; // setting the volume

    if (element.preload) {
      element.audioPlayer.load(); // preload the sound
    }
    if (element.loop) { // repeat sound
      element.audioPlayer.loop = true;
    }
  },
  addSounds: function() {
    // Create a player for each  sound
    for (var i = 0; i < audioPool.sounds.length; i++) {
      audioPool.createAudioPlayer(audioPool.sounds[i]);
    }
  },
  playSound: function(soundName) {
    soundName.audioPlayer.currentTime = 0;
    soundName.audioPlayer.play();
  },
  stopSound: function(soundName) {
    soundName.audioPlayer.pause();
    soundName.audioPlayer.currentTime = 0;
  }
}

audioPool.addSounds(); // Add sounds to the page in separate audio players


// ------------------ Buttons ------------------ //

// Home Buttons
// -- Start Button
StartBtn.addEventListener('click', function() {
  audioPool.playSound(buttonTap);

  $.ajax({  
    url : "http://47.100.30.181:8080/clear", 
    type : "post",  
    success:function(result){
      console.log('clear success');
      dataPreparedFlag = false;
    },
    error:function(xhr,textStatus){  
      alert('error', xhr.responseText);
      console.log(xhr);
      console.log(textStatus);  
    }  
  });      

  toolsBox.showPage(pageModeSetting);
  toolsBox.hidePage(pageHome);
}, false);
// -- About Button
aboutBtn.addEventListener('click', function() {
  audioPool.playSound(buttonTap);
  toolsBox.showPage(pageAbout);
  toolsBox.hidePage(pageHome);
}, false);

// About Page Buttons
// -- Back Button
abtPageBackBtn.addEventListener('click', function() {
  audioPool.playSound(buttonTap);
  toolsBox.showPage(pageHome);
  toolsBox.hidePage(pageAbout);
}, false);

// Mode Setting Page Buttons
// -- Standard Mode Button
StandardModeBtn.addEventListener('click', function() {
  audioPool.playSound(buttonTap);

  $.ajax({  
    url : "http://47.100.30.181:8080/initPole", 
    type : "post",  
    data:{
      length: poleLength
    },
    success:function(result){
      console.log('init pole success'+poleLength);
    },
    error:function(xhr,textStatus){  
      alert('error', xhr.responseText);
      console.log(xhr);
      console.log(textStatus);  
    }  
  });

  for(var i=0; i<antNum; i++){
    var count = 0; // count success ajax
    toolsBox.sleep(100); // Prevents the backend incorrectly receiving only one ajax request
    $.ajax({
      url : "http://47.100.30.181:8080/addAnt", 
      type : "post",  
      data:{
        location:ants[i][0],
        speed:ants[i][1]
      },
      success:function(result){
        count++;
        if(count==antNum) {
          toolsBox.showPage(pageStandardMode);
          toolsBox.hidePage(pageModeSetting);
        }
      }
    });
  }
}, false);

// -- Custom Mode Button
CustomModeBtn.addEventListener('click', function() {
  audioPool.playSound(buttonTap);
  toolsBox.showPage(pageCustomMode);
  toolsBox.hidePage(pageModeSetting);
}, false);

// Standard Mode Page Buttons
// -- Direction Setting Button
function selectDirection(i,direction){
  ants[i][2]=direction;
};
DirectionSettingBtn.addEventListener('click', function() {
  audioPool.playSound(buttonTap);

  var div = document.getElementById("ulDirectionSetting");  
  while (div.hasChildNodes()){ 
    div.removeChild(div.firstChild); }

  toolsBox.hidePage(pageStandardMode);
  for(var i=0; i<antNum; i++){
    $('ul').append(
          '<form>蚂蚁'+i+'方向 :'+
          '<input type="radio" name="direction" '+
          'onclick="selectDirection('+i+',this.value)" value="-1" checked>左 '+
          '<input type="radio" name="direction" '+
          'onclick="selectDirection('+i+',this.value)" value="1">右</form>'
          )
  };
  toolsBox.showPage(pageDirectionSetting);
}, false);

// -- Max And Min Time Button
MaxAndMinTimeBtn.addEventListener('click', function() {
  audioPool.playSound(buttonTap);

  console.log("get min");
  $.ajax({
    url : "http://47.100.30.181:8080/getMinTimeState",
    type : "post",
    success:function(result){
      minTimeState = JSON.parse(result);
      console.log(minTimeState);
      $.ajax({
        url : "http://47.100.30.181:8080/getMinTime",
        type : "post",
        success:function(result){
          minTime = result;
          console.log('minTime:'+minTime);
        }
      });
    }
  });
  toolsBox.sleep(1000);
  console.log("get max");
  $.ajax({
    url : "http://47.100.30.181:8080/getMaxTimeState",
    type : "post",
    success:function(result){
      maxTimeState = JSON.parse(result);
      console.log(maxTimeState);
      $.ajax({
        url : "http://47.100.30.181:8080/getMaxTime",
        type : "post",
        success:function(result){
          maxTime = result;
          console.log('maxTime:'+maxTime);
        }
      });
    }
  });
  toolsBox.sleep(1000);

  var MaxTime = document.getElementById("MaxTime");
  var MinTime = document.getElementById("MinTime");
  while (MaxTime.hasChildNodes()){
    MaxTime.removeChild(MaxTime.firstChild);
    MinTime.removeChild(MinTime.firstChild);
  }

  toolsBox.hidePage(pageStandardMode);
  toolsBox.showPage(pageMaxAndMinTime);

  for(var i=0; i<antNum; i++){
    $(".MaxTime").append(
        '<img class = "antOfMax'+i+'" src="images/ant'+i%15+'.png"'+
        'alt="Ant" style="left:'+ants[i][0]/poleLength*400+'px;'+
        'height:40px;width:40px;position:absolute;">'
    );
    $(".MinTime").append(
        '<img class = "antOfMin'+i+'" src="images/ant'+i%15+'.png"'+
        'alt="Ant" style="left:'+ants[i][0]/poleLength*400+'px;'+
        'height:42px;width:42px;position:absolute;">'
    )
  }

}, false);




// Custom Mode Page Buttons
// -- Next Step1 Button
function inputPosition(i,position){
  if(ants[i])
    ants[i][0]=position;
  else
    ants.push([position,0,-1])
};
function inputSpeed(i,speed){
    ants[i][1]=speed; 
};
NextStep1Btn.addEventListener('click', function() {
  audioPool.playSound(buttonTap);
  poleLength = document.getElementById("poleLength").value;
  antNum = document.getElementById("antNum").value;

  if (poleLength==null||poleLength=="" || antNum==null||antNum=="")
  {
    alert("请填写数据");
    return false;
  };

  $.ajax({  
    url : "http://47.100.30.181:8080/initPole", 
    type : "post",  
    data:{
      length:poleLength
    },
    success:function(result){
      console.log('init pole success');
    },
    error:function(xhr,textStatus){  
      alert('error', xhr.responseText);
      console.log(xhr);
      console.log(textStatus);  
    }  
  });    

  
  toolsBox.hidePage(pageCustomMode);
  var ul = document.getElementById("positionSetting");
  while (ul.hasChildNodes()){
    ul.removeChild(div.firstChild); }
  for(var i=0; i<antNum; i++){
    if(ants[i]){
      $('ulPositionSetting').append(
          '蚂蚁'+i+'位置 :'+
          '<input type="text" value="'+ants[i][0]+'" oninput="inputPosition('+i+',this.value)" class="form-control"> cm'+
          '速度 :'+
          '<input type="text" value="'+ants[i][1]+'" oninput="inputSpeed('+i+',this.value)"id="speed'+i+'" class="form-control"> cm/s'+
          '<br>')
    }else{
      $('ulPositionSetting').append(
          '蚂蚁'+i+'位置 :'+
          '<input type="text" value="0" oninput="inputPosition('+i+',this.value)" class="form-control"> cm'+
          '速度 :'+
          '<input type="text" value="0" oninput="inputSpeed('+i+',this.value)"id="speed'+i+'" class="form-control"> cm/s'+
          '<br>')
    }
    
  };
  toolsBox.showPage(pagePositionSetting);

}, false);
  
// Position Setting Buttons
// -- Next Step2 Button
NextStep2Btn.addEventListener('click', function() {
  audioPool.playSound(buttonTap);
  var count = 0;
  for(var i=0; i<antNum; i++){
    toolsBox.sleep(100);
    $.ajax({  
      url : "http://47.100.30.181:8080/addAnt", 
      type : "post",  
      data:{
        location:ants[i][0],
        speed:ants[i][1]
      },
      success:function(result){
        console.log(result);
        count++;
        if(count==antNum){
          toolsBox.hidePage(pagePositionSetting);
          toolsBox.showPage(pageStandardMode);
        }
      }
    });
  };

  
}, false);

// Direction Setting Buttons
// -- show Button
ShowBtn.addEventListener('click', function() {
  audioPool.playSound(buttonTap);
  for(var i=0; i<antNum; i++){
    $.ajax({  
      url : "http://47.100.30.181:8080/setDirection", 
      type : "post",  
      data:{
        direction:ants[i][2],
        id:i
      },
      success:function(result){
        console.log('set deriction success'+i);
      },
      error:function(xhr,textStatus){  
        alert('error'+i, xhr.responseText);
        console.log(xhr);
        console.log(textStatus);  
      }  
    }); 
  };

  $.ajax({  
    url : "http://47.100.30.181:8080/getState", 
    type : "post",  
    success:function(result){
      customTimeState=JSON.parse(result);
      console.log(customTimeState);
      console.log(result);
    },
    error:function(xhr,textStatus){  
      alert('error', xhr.responseText);
      console.log('error'+i+xhr+textStatus);
    }  
  }); 


  $.ajax({  
      url : "http://47.100.30.181:8080/getTime", 
      type : "post",  
      success:function(result){
        console.log('get time success');
        customTime = result;
        console.log(customTime);
      },
      error:function(xhr,textStatus){  
        alert('error', xhr.responseText);
        console.log(xhr);
        console.log(textStatus);  
      }  
  }); 

  toolsBox.hidePage(pageDirectionSetting);
  toolsBox.showPage(pageTotalTime);

}, false);


// Max And Min Time Buttons
// -- Back Button
var pageClick1 = 0;
mmatPageBackBtn.addEventListener('click', function() {
  audioPool.playSound(buttonTap);

  if(pageClick1%2==0){
    //animation
    var lastOrder = new Array();
    for(var i in minTimeState){

      for(var id=0; id<antNum; id++) {

        for (var j in minTimeState[i]) {
          if(i == 0 && minTimeState[i][j].id==id){
            lastOrder[id]=j;
     //       console.log("last order["+id+"]="+j);
          }
          if (i > 0 && minTimeState[i][j].id==id) {
      //      console.log(i-1+":"+id+":"+lastOrder[id]);
      //      console.log(minTimeState[i - 1][lastOrder[id]]);

            var moveDistance = minTimeState[i][j].location - minTimeState[i - 1][lastOrder[id]].location;
            lastOrder[id]=j;
            //            console.log("last order["+id+"]="+j);
            moveDistance = moveDistance > 0 ? moveDistance : -moveDistance;
            var moveTime = moveDistance / minTimeState[i][j].speed;
            var position = minTimeState[i][j].location * 400 / poleLength;
            //   console.log("state" + i + " ant" + id + ":" + moveDistance+","+moveTime);
            $(".antOfMin" + minTimeState[i][j].id).animate(
                {left: position + 'px'}, moveTime*200,"linear");
          }
        }
      }
    }

    for(var i in maxTimeState){ // i state
      for(var id=0; id<antNum; id++) {

        for (var j in maxTimeState[i]) { // j live ant
          if( i == 0&& minTimeState[i][j].id==id) lastOrder[id] =j;
          //      console.log("last order["+id+"]="+j);
          if (i > 0 && maxTimeState[i][j].id==id) {
            var moveDistance = maxTimeState[i][j].location - maxTimeState[i - 1][lastOrder[id]].location;
            lastOrder[id] = j;
            //          console.log("last order["+id+"]="+j);
            moveDistance = moveDistance > 0 ? moveDistance : -moveDistance;
            var moveTime = moveDistance / maxTimeState[i][j].speed;
            var position = maxTimeState[i][j].location * 400 / poleLength;
            //          console.log("state" + i + " ant" + id + ":" + moveDistance+","+moveTime);
            $(".antOfMax" + maxTimeState[i][j].id).animate(
                {left: position + 'px'}, moveTime*200,"linear");
          }

        }
      }
    }




  }
  if(pageClick1%2==1){
    // back to home
    poleLength = 300;
    antNum = 5;
    position = 0;
    speed = 5;
    direction = -1;
    ants = [ // position, speed, direction
      [30, 5, -1],
      [80, 5, -1],
      [110, 5, -1],
      [160, 5, -1],
      [250, 5, -1]
    ];
    maxTime, minTime, customTime = 0;
    maxTimeState, minTimeState, customTimeState = null;

    toolsBox.showPage(pageHome);
    toolsBox.hidePage(pageMaxAndMinTime);

  }

  pageClick1++;
}, false);

// Total Time Page Buttons
// -- Back Button
ttPageBackBtn.addEventListener('click', function() {
  audioPool.playSound(buttonTap);

  poleLength = 300;
  antNum = 5;
  position = 0;
  speed = 5;
  direction = -1;
  ants = [ // position, speed, direction
    [30, 5, -1],
    [80, 5, -1],
    [110, 5, -1],
    [160, 5, -1],
    [250, 5, -1]
  ]; 
  maxTime, minTime, customTime = 0;
  maxTimeState, minTimeState, customTimeState = null;

  toolsBox.showPage(pageHome);
  toolsBox.hidePage(pageTotalTime);
}, false);


// Hide Splash Screen when everything is loaded
toolsBox.hideSplashScreen();















