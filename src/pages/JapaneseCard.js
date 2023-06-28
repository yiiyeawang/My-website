import React, { useState ,useEffect,useRef } from 'react'
import ReactCardFlip from 'react-card-flip';
import { GrRotateLeft } from "react-icons/gr";
import { BsFillFileFontFill,BsFillCaretRightSquareFill,BsFillCaretLeftSquareFill } from "react-icons/bs";
//音效
import flipingCardSound from '../music/flipingcard.mp3'
import swithModeButton from '../music/swithModeButton.mp3'
import backAndNextButton from '../music/backAndNextButton.mp3'
import timerClock from '../music/clock.mp3'

export default function JapaneseCard() {
    //const [count,setCount] = useState(0)
    const [currentCardIndex, setCurrentCardIndex] = useState(null)
    const [mode,setMode] = useState('BasicText')
    const [countdown, setCountdown] = useState(10000);
    const [isFlipped, setFlipped] = useState(false);
    const [isShowed,setShowed] = useState([])
    const [thisOne,setThisOne] = useState(null)
    const audioRef = useRef(null); // 新增 audio 的 ref
    const BasicText =[
        "あ","い","う","え","お",
        "か","き","く","け","こ",
        "さ","し","す","せ","そ",
        "た","ち","つ","て","と",
        "な","に","ぬ","ね","の",
        "は","ひ","ふ","へ","ほ",
        "ま","み","む","め","も",
        "や","ゆ","よ",
        "ら","り","る","れ","ろ",
        "わ","ん","を"
    ]
    const RomanSound = [
        "a","i","u","e","o",
        "ka","ki","ku","ke","ko",
        "sa","shi","su","se","so",
        "ta","chi","tsu","te","to",
        "na","ni","nu","ne","no",
        "ha","hi","fu","he","ho",
        "ma","mi","mu","me","mo",
        "ya","yu","yo",
        "ra","ri","ru","re","ro",
        "wa","n","wo"
    ]
    const Katakana = [
        "ア","イ","ウ","エ","オ",
        "カ","キ","ク","ケ","コ",
        "サ","シ","ス","セ","ソ",
        "タ","チ","ツ","テ","ト",
        "ナ","ニ","ヌ","ネ","ﾉ",
        "ハ","ヒ","フ","ヘ","ホ",
        "マ","ミ","ム","メ","モ",
        "ヤ","ユ","ヨ",
        "ラ","リ","ル","レ","ロ",
        "ワ","ン","ヲ"
    ]
    
    // const Card = (props) =>{
    //     const [isFlipped,setFlipped] =useState(false)
        const handleClick = (e)=>{
            e.preventDefault();
            const audio = new Audio(flipingCardSound)
            audio.play();
            setFlipped(!isFlipped)
        }
        
    //     return(
    //         <ReactCardFlip  isFlipped={isFlipped} flipDirection="vertical">
    //             <div style={{border:'1px solid #eee',width:"300px",height:"300px",backgroundColor:"#333",color:"#fff",textAlign:"center",lineHeight:"300px"}} onClick={handleClick}>
    //                 <span>{props.text}</span>
                    
    //             </div>
    //             <div style={{border:'1px solid #eee',width:"300px",height:"300px",textAlign:"center",lineHeight:"300px"}}  onClick={handleClick}>
    //                 <span>{props.answer}</span>
    //             </div>
    //         </ReactCardFlip>
    //     )
    // }

    const getRandomIndex = () => {
        //產生一個隨機數，檢查是否在showed內，沒有則填入setShowed內，有則重新敷叫自己
        //console.log("randomIndex");
        let randomNum = Math.floor(Math.random() * BasicText.length);
        let haveRandomNum = isShowed.find((i)=>(i === randomNum))
        //console.log(randomNum);
        //console.log(isShowed.find((i)=>(i === randomNum)));

        if (haveRandomNum) {
            //console.log('有相同')
            return getRandomIndex();
        }else {
            //console.log('沒有相同');
            if(isShowed.length == 45){
                console.log('滿了滿了');
                setShowed(prevNumbers => [randomNum]) 
            }else{
                setShowed(prevNumbers => [...prevNumbers, randomNum]) 
            }
            return randomNum
        }
      };

    const rerender = () => {
        console.log("rerender");
        const randomInex = getRandomIndex()
        //setCurrentCardIndex(randomInex);
        setFlipped(false);
        //setCount(count+1)
    }
    const changeMode = () => {
        //console.log("changeMode");
        const audio = new Audio(swithModeButton);
        audio.play()
        if (mode === "BasicText") {
            setMode("Katakana")
        }else{
        setMode("BasicText")
        }
    }

    useEffect(() => {//產生第一個隨機值
        getRandomIndex();
    },[])

    useEffect(() =>{//設定最新的
        const lastOne = isShowed.length - 1
        setThisOne(lastOne)
    },[isShowed])
    // useEffect(() => {

    // },[thisOne])

    useEffect(() => {//每當時間改變就計算一次
        const timer = setTimeout(() => {
          if (countdown > 0) {
            setCountdown(countdown - 10);
          }
        }, 10);


    
        return () => {
          clearTimeout(timer);
        };
      }, [countdown]);

      useEffect(() => {
        if (countdown > 0) {
          playTimerSound();
        }
      }, [countdown]);

      const playTimerSound = () => {
        if (audioRef.current) {
            const audio = audioRef.current;
            audio.currentTime = 0;//確保每一次播放音樂都是從頭開始
            audio.play().catch((error) => {
              //console.error('Autoplay error:', error);
            });
          }
      };

    const backOneIndex = () => {
        // console.log('backOneIndex');
        // console.log(isShowed)
        if (isShowed.length >= 2) {
            const audio = new Audio(backAndNextButton)
            audio.play();
            const prevIndex = thisOne > 0 ? thisOne - 1 : 0;
            setThisOne(prevIndex);
            setCountdown(10000)
            if (audioRef.current) {
                const audio = audioRef.current;
                audio.pause();
                audio.currentTime = 0;
              }
          }
    }
    const nextOneIndex = () => {
        // console.log('nextOneIndex');
        // console.log(isShowed)
        if (isShowed.length >= 2) {
            const audio = new Audio(backAndNextButton)
            audio.play();
            const nextIndex = thisOne < isShowed.length - 1 ? thisOne + 1 : getRandomIndex;
            setThisOne(nextIndex);
            setCountdown(10000)
            if (audioRef.current) {
                const audio = audioRef.current;
                audio.pause();
                audio.currentTime = 0;
              }
        }
       
    }
    const formatTime = (time) => {
        const seconds = Math.floor((time / 1000)).toString().padStart(2, '0');
        const milliseconds = ((time / 10 )  % 100).toString().padStart(2, '0');
        return `${seconds}:${milliseconds}`;
      };
  const title = mode === "BasicText" ? "平假名" : mode === "Katakana" ? "片假名" : ""

  const currentText =  mode === 'BasicText' ? BasicText[isShowed[thisOne]] : Katakana[isShowed[thisOne]] ;
  const currentAnswer =  RomanSound[isShowed[thisOne]] 

  return (
    <div style={{textAlign:"center",margin:"0 auto",fontSize:"2.5em",}}> 
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <h3>{title}</h3>
            <div>
                <GrRotateLeft style={{cursor:"pointer"}} onClick={rerender}/>
                <BsFillFileFontFill style={{cursor:"pointer"}} onClick={changeMode}/>
            </div>
        </div>
        {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1em' }}>
            <div style={{ width: '200px', height: '20px', border: '1px solid #ccc', position: 'relative' }}>
              <div style={{ width: `${(countdown / 5) * 100}%`, height: '100%', backgroundColor: 'green', position: 'absolute' }}></div>
            </div>
        </div>
        {
            mode === "BasicText" ? <Card text={BasicText[random]} answer={RomanSound[random]}/> :
                mode === "Katakana" ? <Card text={Katakana[random]} answer={RomanSound[random]}/> : ""
        } */}

              {/* {currentText !== '' && ( */}
        <>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1em' }}>
            <div style={{ width: '200px', height: '20px', border: '1px solid #ccc', position: 'relative' }}>
              <div style={{ width: `${(countdown / 10000) * 100}%`, height: '100%', backgroundColor: 'green', position: 'absolute' ,fontSize:"0.3em",textAlign:"center"}}>
                {formatTime(countdown)}
              </div>
              {/* <button onClick={playTimerSound}>Play Sound</button> */}
              <audio ref={audioRef} src={timerClock} /> {/* 將音效檔案添加到音訊元素中，但不要自動播放 */}
            </div>
          </div>
          <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <div style={{ border: '1px solid #eee', width: "300px", height: "300px", backgroundColor: "#333", color: "#fff", textAlign: "center", lineHeight: "300px" }} onClick={handleClick}>
              <span>{currentText}</span>
            </div>
            <div style={{ border: '1px solid #eee', width: "300px", height: "300px", textAlign: "center", lineHeight: "300px" }} onClick={handleClick}>
              <span>{currentAnswer}</span>
            </div>
          </ReactCardFlip>
        </>
      {/* )} */}

      <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",margin:"0.8em 0"}}>
            <BsFillCaretLeftSquareFill  onClick={backOneIndex}/>
            <BsFillCaretRightSquareFill onClick={nextOneIndex} />
        </div>
    </div>
  )
}
