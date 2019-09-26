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
var antImageSize = 38;
var antImageDeviation = 20; // and image's size / 2


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

  var parent = document.getElementById("DirectionRadio");

  while (parent.hasChildNodes()){
    parent.removeChild(parent.firstChild); }

  for(var i=0; i<antNum; i++){

    var directionRadioElement = document.createElement("form");
    var antLeftElement = document.createElement('input');
    var antRightElement = document.createElement('input');
    var antLeftLabel = document.createElement('label');
    var antRightLabel = document.createElement('label');

    directionRadioElement.setAttribute('id','DirectionForm'+i);


    antLeftElement.setAttribute('type','radio');
    antLeftElement.setAttribute('name',"ant"+i+"Left");
    antLeftElement.setAttribute('onclick',"selectDirection"+i+",this.value");
    antLeftElement.setAttribute('value',-1);
    antLeftElement.setAttribute('id',"Left"+i);


    antRightElement.setAttribute('type','radio');
    antRightElement.setAttribute('name',"ant"+i+"Right");
    antRightElement.setAttribute('onclick',"selectDirection"+i+",this.value");
    antRightElement.setAttribute('value',1);
    antRightElement.setAttribute('id',"Right"+i);

    antLeftLabel.setAttribute('for',"Left"+i);
    antLeftLabel.setAttribute('id','radio-Left-label'+i);


    antRightLabel.setAttribute('for',"Right"+i);
    antRightLabel.setAttribute('id','radio-Right-label'+i);





    parent.appendChild(directionRadioElement);
    var directionRadio = document.getElementById('DirectionForm'+i);
    console.log(directionRadio.appendChild(antLeftElement));
    directionRadio.appendChild(antLeftElement);
    console.log(directionRadio);
    directionRadio.appendChild(antLeftLabel);
    directionRadio.appendChild(antRightElement);
    directionRadio.appendChild(antRightLabel);
    console.log(directionRadio);


    document.getElementById('DirectionForm'+i).innerHTML="蚂蚁 "+i+" 方向 : ";
    console.log(document.getElementById("Left"+i))
    document.getElementById('Left'+i).checked=true;


    document.getElementById("Right"+i).checked=false;
    document.getElementById('radio-Left-label'+i).innerHTML="Left";
    document.getElementById('radio-Right-label'+i).innerHTML="Right";

  };
  toolsBox.hidePage(pageStandardMode);
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
          document.getElementById("MinTimeTitle").innerHTML="Min Time:   "+minTime;
        }
      });
    }
  });
  toolsBox.sleep(100);
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
          document.getElementById("MaxTimeTitle").innerHTML="Max Time:   "+maxTime;
        }
      });
    }
  });
  toolsBox.sleep(1000);

  var MaxTimeElement = document.getElementById("MaxTime");
  var MinTimeElement = document.getElementById("MinTime");

  while (MaxTimeElement.hasChildNodes()){ // Remove previous ants
    MaxTimeElement.removeChild(MaxTimeElement.firstChild);
    MinTimeElement.removeChild(MinTimeElement.firstChild);
  }

  for(var i=0; i<antNum; i++){
    position = ants[i][0]/poleLength*400;
    position += antImageDeviation; // Correct picture deviation

    var antOfMaxElement = document.createElement('img');
    var antOfMinElement = document.createElement('img');
    var antImageSource = "images/ant"+i%15+".png";

    antOfMaxElement.setAttribute('class','ant-of-max'+i);
    antOfMaxElement.setAttribute('src',antImageSource);
    antOfMaxElement.setAttribute('alt','ant');
    antOfMaxElement.setAttribute('style',"left:"+position+"px;"+
        "height:"+antImageSize+"px;width:"+antImageSize+"px;position:absolute;");

    antOfMinElement.setAttribute('class','ant-of-min'+i);
    antOfMinElement.setAttribute('src',antImageSource);
    antOfMinElement.setAttribute('alt','ant');
    antOfMinElement.setAttribute('style',"left:"+position+"px;"+
        "height:"+antImageSize+"px;width:"+antImageSize+"px;position:absolute;");

    MaxTimeElement.appendChild(antOfMaxElement);
    MinTimeElement.appendChild(antOfMinElement);
  }

  toolsBox.hidePage(pageStandardMode);
  toolsBox.showPage(pageMaxAndMinTime);

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
    }
  });    

  

  var PositionSettingInputElement = document.getElementById("PositionSetting");
  while (PositionSettingInputElement.hasChildNodes()){
    PositionSettingInputElement.removeChild(PositionSettingInputElement.firstChild); }
  for(var i=0; i<antNum; i++){

    var antPositionElement = document.createElement('input');
    var antSpeedElement = document.createElement('input');

    antPositionElement.setAttribute('type','text');
    antPositionElement.setAttribute('oninput',"inputPosition("+i+",this.value)");
    antPositionElement.setAttribute('class','ant-data-input');
    if(ants[i])
      antPositionElement.setAttribute('value',ants[i][0]);
    else
      antPositionElement.setAttribute('value',0);

    antSpeedElement.setAttribute('type','text');
    antSpeedElement.setAttribute('oninput',"inputPosition("+i+",this.value)");
    antSpeedElement.setAttribute('id',"speed"+i);
    antSpeedElement.setAttribute('class','ant-data-input');
    if(ants[i])
      antSpeedElement.setAttribute('value',ants[i][1]);
    else
      antSpeedElement.setAttribute('value',0);
    $('.position-setting').append('蚂蚁 '+i+' 位置 : ');
    PositionSettingInputElement.appendChild(antPositionElement);
    $('.position-setting').append('   速度 : ');
    PositionSettingInputElement.appendChild(antSpeedElement);
    $('.position-setting').append('<br>');
    
  };
  toolsBox.hidePage(pageCustomMode);
  toolsBox.showPage(pagePositionSetting);

}, false);


  
// Position Setting Buttons
// -- Next Step2 Button
NextStep2Btn.addEventListener('click', function() {
  audioPool.playSound(buttonTap);
  var count = 0;
  for(var i=0; i<antNum; i++){
    toolsBox.sleep(100);
    if (ants[i][0]>poleLength) ants[i][0]=poleLength;
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
    }
  }); 


  $.ajax({  
      url : "http://47.100.30.181:8080/getTime", 
      type : "post",  
      success:function(result){
        console.log('get time success');
        customTime = result;
        console.log(customTime);
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
          }
          if (i > 0 && minTimeState[i][j].id==id) {
            var moveDistance = minTimeState[i][j].location - minTimeState[i-1][lastOrder[id]].location;
            lastOrder[id]=j;
            moveDistance = moveDistance > 0 ? moveDistance : -moveDistance;
            var moveTime = moveDistance / minTimeState[i][j].speed;
            var htmlPosition = minTimeState[i][j].location * 400 / poleLength;
            htmlPosition += antImageDeviation; // Correct picture deviation
            $(".ant-of-min" + minTimeState[i][j].id).animate(
                {left: htmlPosition+ 'px'}, moveTime*200, "linear");
          }
        }
      }
    }

    for(var i in maxTimeState){ // i state
      for(var id=0; id<antNum; id++) { // id ant
        for (var j in maxTimeState[i]) { // j live ant
          if( i == 0&& minTimeState[i][j].id==id)
            lastOrder[id] =j;
          if (i > 0 && maxTimeState[i][j].id==id) {
            var moveDistance = maxTimeState[i][j].location - maxTimeState[i-1][lastOrder[id]].location;
            lastOrder[id] = j;
            moveDistance = moveDistance > 0 ? moveDistance : -moveDistance;
            var moveTime = moveDistance / maxTimeState[i][j].speed;
            var htmlPosition = maxTimeState[i][j].location * 400 / poleLength;
            htmlPosition += antImageDeviation; // Correct picture deviation
            $(".ant-of-max" + maxTimeState[i][j].id).animate(
                {left: htmlPosition + 'px'}, moveTime*200,"linear");
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















