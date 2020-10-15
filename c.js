const inputcontainer=document.getElementById('input-container');
const countdownform=document.getElementById('countdownform');
const dateel=document.getElementById('date-picker');

const countdownel=document.getElementById('countdown');
const countdowneltitle=document.getElementById('countdown-Title');
const countdownbtn=document.getElementById('countdown-button');
const timeelemnts=document.querySelectorAll('span');

const completeel=document.getElementById('complete');
const completeinfo=document.getElementById('complete-info');
const completebtn=document.getElementById('complete-button');

let countdowntitle='';
let countdowndate='';
let countdownvalue=Date;
let countdownactive;
let savedcountdown;

const second=1000;
const min=second*60;
const hour=min*60;
const day=hour*24;

//Seet date input
const today = new Date().toISOString().split('T')[0];
dateel.setAttribute('min',today);

//populate coutdown/complete ui
function updatedom()
{
    countdownactive=setInterval(()=>{
        const now=new Date().getTime();
        const distance= countdownvalue-now;
       // console.log('distance',distance);
    
        const days=Math.floor(distance/day);
        const hours=Math.floor((distance % day)/hour);
        const mins=Math.floor((distance % hour)/min);
        const secs=Math.floor((distance % min)/second);
       //console.log(days,hours,mins,secs);
      
       //hide input
       inputcontainer.hidden=true;

       //If the coountdown has ended , show complete
       if(distance<0)
       {
           countdownel.hidden=true;
           clearInterval(countdownactive);
           completeinfo.textContent=`${countdowntitle} finished on ${countdowndate}`;
           completeel.hidden=false;
       }
       else
       {
           //show the countdown in progress
           countdowneltitle.textContent=`${countdowntitle}`;
          timeelemnts[0].textContent=`${days}`;
          timeelemnts[1].textContent=`${hours}`;
          timeelemnts[2].textContent=`${mins}`;
          timeelemnts[3].textContent=`${secs}`;
          completeel.hidden=true;
          countdownel.hidden=false;
       }

       //populate countedown
       /*countdowneltitle.textContent=`${countdowntitle}`;
       timeelemnts[0].textContent=`${days}`;
       timeelemnts[1].textContent=`${hours}`;
       timeelemnts[2].textContent=`${mins}`;
       timeelemnts[3].textContent=`${secs}`;
        
       //show countdown
       countdownel.hidden=false;*/
    },second);

}

//Take value from form Input
function updatecountdown(e){
    e.preventDefault();
    countdowntitle=e.srcElement[0].value;
    countdowndate=e.srcElement[1].value;
    savedcountdown={
        title:countdowntitle,
        date:countdowndate,
    };
  localStorage.setItem('countdown',JSON.stringify(savedcountdown));
  //get the numbeer veersion  of curreentdat,update dom
  countdownvalue=new Date(countdowndate).getTime();//getTime convert the miliseconds format
  //console.log('count down value: ',countdownvalue);
  updatedom();
}
 
//reset All values
function reset()
{
    //hide countdowns,show input
    countdownel.hidden=true;
    completeel.hidden=true;
    //completeel.hidden=true;
    inputcontainer.hidden=false;
    //stop the countdown
    clearInterval(countdownactive);
    //reset values
    countdowntitle='';
    countdowndate='';
    localStorage.removeItem('countdown');
}

function restore(){
    //get the countdown from localstorage if available
    if(localStorage.getItem('countdown'))
    {
        inputcontainer.hidden=true;
        savedcountdown=JSON.parse(localStorage.getItem('countdown'));
        countdowntitle=savedcountdown.title;
        countdowndate=savedcountdown.date;
        countdownvalue=new Date(countdowndate).getTime();
        updatedom();
    }
}

//event listner
countdownform.addEventListener('submit',updatecountdown);
countdownbtn.addEventListener('click',reset);
completebtn.addEventListener('click',reset);
 
//onload
restore();