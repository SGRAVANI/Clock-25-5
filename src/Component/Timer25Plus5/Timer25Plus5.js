import React, { useEffect, useState } from 'react'
import "./Timer25Plus5.css";
export default function Timer25Plus5() {
    let [br,setBr]=useState(5);
    let [session,setSession]=useState(25);
    let [time,setTime] = useState({ seconds:0, minutes:session});
    let [timeLeft,setTimeLeft]=useState(1500)
    let [f,setF]=useState(false);
    let[play,setPlay]=useState(false);
    let [timingType,setTimingType]=useState("Session")
    const timeout=setTimeout(()=>{
        if(timeLeft &&play)
        {
            setTimeLeft(timeLeft-1);
        }

    },1000);
    const handleReset = () => {
        clearTimeout(timeout);
        setPlay(false);
        setTimeLeft(1500);
        setBr(5);
        setSession(25);
        setTimingType("Session");
        const audio = document.getElementById("beep");
        audio.pause()
        audio.currentTime = 0;
      }
      const resetTimer = () => {
        const audio = document.getElementById("beep");
        if(!timeLeft && timingType === "Session"){
          setTimeLeft(br * 60)
          setTimingType("Break")
          audio.play()
        }
        if(!timeLeft && timingType === "Break"){
          setTimeLeft(session * 60)
          setTimingType("Session")
          audio.pause()
          audio.currentTime = 0;
        }
      }
    const clock=()=>
    {
        if(play){
            //timeout;
            resetTimer();
        }
        else{
            clearTimeout(timeout)
        }

    }
    useEffect(()=>{
        clock();
    },[play,timeLeft,timeout])
    const handlePlay=()=>{
        clearTimeout(timeout);
        setPlay(!play);
    }
    function convertTime()
    {
        const minutes=Math.floor(timeLeft/60)
        const seconds=timeLeft-minutes*60;
        let formattedSeconds=seconds<10?'0'+seconds:seconds;
        let formatedMinutes=minutes<10?'0'+minutes:minutes;
        return `${formatedMinutes}:${formattedSeconds}`;
    }
    function handleBreakIncre()
    {
       
        if(br < 60){
            setBr(br+1)
          }
        // setBr((prev)=>prev+1)
    }
    function handleBreakDecre()
    {
    //     setBr((prev)=> {if(prev>1){return prev-1}
    // else{
    //     return 1;
    if(br > 1){
        setBr(br - 1)
      }
    
    }
    function handleSessionIncre()
    {
        //setSession((prev)=>prev+1)
        if(session < 60){
            setSession(session + 1)
            setTimeLeft(timeLeft + 60)
          }
    }
    function handleSessionDecre(){
        // setSession((prev)=>{if(prev>1){return prev-1}
        // else{
        //     return 1;
        // }})
        if(session > 1){
            setSession(session - 1)
            setTimeLeft(timeLeft - 60)
          }

    }
    // function handleReset()
    // {
    //     setF(false)
    //  setTime({seconds:0,minutes:25});
    //  setBr(5);
    //  setSession(25)
    // }
   

    // function timer()
    // {
    //     if(time.seconds==0 )
    //     {
    //         setTime({seconds:59,minutes:time.minutes-1})
    //     }
    //     else{
    //         setTime((prev)=>{return{minutes:prev.minutes,seconds:prev.seconds-1}})
    //        // setTime({minutes:time.minutes,seconds:time.seconds-1})
    //     }
    // }
    let t;
    // useEffect(()=>{
    //     if(f==true)
    //     {
    //     t=setInterval(()=>{if(time.seconds==0 )
    //         {
    //             setTime({seconds:59,minutes:time.minutes-1})
    //         }
    //         else{
    //             setTime((prev)=>{return{minutes:prev.minutes,seconds:prev.seconds-1}})
    //            // setTime({minutes:time.minutes,seconds:time.seconds-1})
    //         }
    // }, 1000);
    // return()=>clearInterval(t)
    // }
    // })
    //         function handleTimer()
    // {
    //     setF(true)
    // }
    const title=timingType==="Session"?"Session":"Break";
    // let min= time.minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    // let sec=time.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    //  useEffect(()=>{
    //     min= time.minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    //      sec=time.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    //  },[time.seconds,time.minutes])
   
  return (
    <div className='wrapper'>

<div className="main-title">25 + 5 Clock</div>
<div className='timer-setting-display'>
<div className="length-control">
    <div id="break-label">Break Length</div>
    <button className="btn-level" id="break-decrement" onClick={handleBreakDecre} value="-"><i className="fa fa-arrow-down "></i></button>
    <div className="btn-level" id="break-length">{br}</div>
    <button className="btn-level" id="break-increment" onClick={handleBreakIncre} value="+"><i className="fa fa-arrow-up "></i></button>
</div>
<div className="length-control">
    <div id="session-label">Session Length</div>
    <button className="btn-level" id="session-decrement" onClick={handleSessionDecre} value="-"><i className="fa fa-arrow-down "></i></button>
    <div className="btn-level" id="session-length">{session}</div>
    <button className="btn-level" id="session-increment" onClick={handleSessionIncre} value="+"><i className="fa fa-arrow-up "></i></button>
</div>
</div>
<div className="timer" style={{color: "rgb(165, 13, 13)"}}>
    <div className="timer-wrapper" style={ timeLeft<=59?{color:"red"}:{color:"white"}}>
        <div id="timer-label">{title}</div>
        <div id="time-left">{convertTime()}</div>
    </div>

{/* <div className="timer-wrapper">
    <div id="timer-label">Session</div>
    <div id="time-left">00:56
</div>
</div> */}
</div>
<div className="timer-control">
    <button id="start_stop"  onClick={handlePlay}>
        <i className="fa fa-play"></i>
        <i className="fa fa-pause " onClick={()=>{setF(false)}}></i>
    </button>
    <button id="reset" onClick={handleReset}>
    <i className="fa fa-refresh"></i>
    </button>
</div>
<audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
</div>
  )
}
