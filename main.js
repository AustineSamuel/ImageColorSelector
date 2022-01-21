const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height =innerHeight;
const ctx = canvas.getContext("2d");
let h = canvas.height;
let w = canvas.width;
let img=null;

ctx.fillText("Image you choose will appear here",100,100);

class ColorReader{//for this class image should be decode to base64 for security reasons
  constructor(imgSrc){
    this.imgSrc=imgSrc;
    this.img=undefined;
  }
  
  createImg(callBack){
    this.img = document.createElement("img")
    this.img.src = this.imgSrc;
    this.img.onload = (e) => {
    callBack(e.target);
    }
  }
  
  drawImg(e){
    ctx.beginPath();
    ctx.drawImage(e,0,0,canvas.width,canvas.height);
    ctx.closePath()
  }

  drawCircle(x,y){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    this.drawImg(this.img);
    ctx.strokeStyle="white";
    ctx.arc((x-7),(y-7),15,0,2*Math.PI,true);
    ctx.stroke();
  }
  
  readImgColor(x,y){
  const imgData=ctx.getImageData(0,0,canvas.width,canvas.height)
  const data=imgData.data;
  const cw=imgData.width
 
          var n = (y * cw + x) * 4;
          //where n equal to the index of data array
          let r = data[n];
          let g = data[n + 1];
          let b = data[n + 2];
          let a = data[n + 3];
          
      const color=('rgba('+r+","+g+","+b+","+a+")");

      document.querySelector("#bgCtn span").style.background=color;
      document.querySelector("#bgCtn span span").innerText=color;
     this.drawCircle(x,y);
  }
}



let selector=new ColorReader('')
///image program
addEventListener("click",()=>{
  if(Selection===undefined) return alert("please load")
})
document.querySelector("input"). onchange=(e)=>{
 let input=e.target;
 
 ctx.clearRect(0,0,w,h);
 ctx.fillText("loading",100,100);
 
  const reader=new FileReader();
  reader.onload=(e)=>{
    selector=new ColorReader(e.target.result)
    selector.createImg(selector.drawImg);
  }
 reader.readAsDataURL(input.files[0])
 document.querySelector("#messageCtn").style.display="none";
}

const point={x:0,y:0}

//click events mobile📱
canvas.addEventListener("touchend", (e) => {
  point.x = e.touches[0].clientX;
  point.y = e.touches[0].clientY;
  alert(JSON.stringify(point));
  selector.readImgColor(point.x,point.y)
});

canvas.addEventListener("mousedown", (e) => {
  point.x = e.clientX;
  point.y = e.clientY;
  selector.readImgColor(point.x,point.y)
});

document.querySelector("#bgCtn span button").addEventListener("click",function(){
copy(document.querySelector("#bgCtn span span").innerText)
})

//add css

const css=`body {
    font-size: 15pt;
}

button,input{
    border:none;
    outline:none;
background:none;
}


canvas{
position:fixed;
}
#bgCtn{
   
    background:rgba(14, 11, 11, 0.097);
    position:fixed;
    right:0;
    top:0;
  
    z-index:2;
    padding: 2px;box-shadow:1px 1px 10px 1px rgb(197, 197, 197);
}

#bgCtn span{
   font-size:small;
   color:rgb(255, 255, 255);
   background:black;
   padding:2px;
   display:block;
}

#bgCtn button{
    color:white;
    background:var(--color2);
    border-radius:2px;
    font-weight:bolder;
}

#bgCtn button:active{
font-size:medium;
}
#bgCtn button:hover{
color:var(--color);
cursor:pointer;
}
#bgCtn #bg{
    width:30px;
    height:30px;
    border-radius:15px;
    background:rgba(19, 14, 14, 0.049);
    border:1px solid white;
    display:none !important;
}
#messageCtn{
   
    position:fixed;
    z-index:5;
background:rgb(255, 255, 255);
width:100%;
height:100%;
display:flex;
align-items:center;
justify-content: center;
background:var(--color);

}



#messageCtn #message{
height:100%;
width:95%;
max-width:550px;
}

:root{
    --color:rgb(0, 30, 85);
    --color2:rgb(33, 110, 255);
    --colorRed:rgb(255, 6, 130);

}

nav{
    display:flex;
justify-content:space-between;
border-bottom:1px solid var(--color2);
padding:20px 0px;
}

nav span{
    font-weight:bolder;
}
nav span:nth-child(1){
    color:rgb(255, 6, 130);
}


nav span:nth-child(2){
    color:var(--color2);
}
h1{
    font-weight:bolder;
    color:rgb(237, 237, 237);
    text-align:center;
}

#msgTxt{
background:rgba(33, 111, 255, 0.145);
width:90%;
padding:16px;
min-height:20px;
border-radius:5px;
box-shadow: 1px 1px 10px 0px rgb(2, 17, 65);
}


#msgTxt span{
color:rgb(252, 239, 239);
font-size:small;
font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

}
label{
border-radius:10px;
background:rgb(0, 110, 255);
color:white;
font-weight:bolder;
padding:8px 16px;
cursor:pointer;
width:92%;
display:block;
}
label cite {
    transition-duration:0.6 ease;
display:none;
font-weight:bolder;
}

label:hover >cite{
    display:inline;
}`;


$("head").append(`<style>${css}</style>`)



 
 //register serviceworker
 if("serviceWorker" in window.navigator){
   navigator.serviceWorker.register("sw.js").then(e => {
     console.log("sw.js" , e)
   });
 }
 
 