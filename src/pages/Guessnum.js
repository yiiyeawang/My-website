import React ,{useState,useRef} from 'react'
import {Button, Card, Form, Input,Typography,Table, Modal,message,Row, Col, Space} from 'antd'

const{ Text } = Typography

function Guessnum() {
    // 開始遊戲，產生答案
    // 輸入答案，送出答案，比對答案
    // 比對位置接著比對值，是則Ａ，＋＋，若位置不同，但有相同的值則顯示為Ｂ，＋＋
    // 顯示結果
    // 直到答案完全一致，結束遊戲，重新來過

    // const userAnswerData = [];
   
    const [userAnwser,setUserAnwser] = useState("");
    const [gameAnswer,setGameAnswer] = useState("");
    const [currect,setCurrect] = useState("");
    const [gameOver,setGameOver ] = useState(false);
    const [form] = Form.useForm();
    const [dataSource,setDataSource] =useState([]) ;
    const nextone_btn = useRef(null);
    const columns = [
    {
        title: '次序',
        dataIndex: 'num',
        key: 'bum',
    },
    {
        title: '你的答案',
        dataIndex: 'userAnswer',
        key: 'userAnswer',
    },
    {
        title: '提示',
        dataIndex: 'prompt',
        key: 'prompt',
    }
    ]

        const handleStart = ()=>{
            const getGameAnswer = [];
            randomAnswer()
            function randomAnswer() {
                for (let i = 0; i < 4; i++) {
                    let randomNum = Math.floor(Math.random() * 10);
                    getGameAnswer[i] = randomNum;
                };
                let condition =  getGameAnswer.map((item,key)=> getGameAnswer.includes(item,key+1) ).includes(true)
                if (condition) {
                    randomAnswer() 
                }
                return getGameAnswer
            };
            //存入
            setGameAnswer(getGameAnswer)
            setCurrect(false)
            setGameOver(false)
        }
        const handleReStart = ()=>{
            setGameAnswer("")
            setDataSource([])
        }

        const verify = (values) =>{
            let A =0;
            let B =0;
            for (let i = 0; i < gameAnswer.length; i++) {
                if (values.userAnswer.indexOf(gameAnswer[i]) == -1 ) {
                }else {
                    let site = values.userAnswer.indexOf(gameAnswer[i])
                    B++;
                    if (values.userAnswer[site] == gameAnswer[site]) {
                        A++;
                        B--;
                    }
                }
            }
            let result = `${A}A${B}B`
            return result
        }
        const handleGetAnswer = (values ) => {
            let result = verify(values)
            //let result ="4A0B";
            let time;
            const success = (time) => {
                message.success({
                  content: `恭喜您猜對了，答案為：[${gameAnswer}]一共花費的時間是${time},3秒後將重置遊戲`,
                  className: 'custom-class',
                  style: {
                    marginTop: '50%',
                  },
                });
            };
            if (result === "4A0B" ) {
                success(time);
                setTimeout(()=>handleReStart(),3000)
            }
            let newData = {key:Math.floor(Math.random()*100),userAnswer:values.userAnswer,num:dataSource.length+1,prompt:result}
            setDataSource([...dataSource,newData])
            form.resetFields();

        }
        const handleOverGame =() =>{
            setGameOver(true)
            setTimeout(()=>handleReStart(),3000)
        }

        //進入網頁只顯示welcome 頁面
        //將所有的.page 定位在position:absurution,top:0,left:0的地方
        //當點擊開始，隱藏welcoem,顯示page1....以此類推

        //         頁面顯示
        // * 每當按下按鈕時才可以顯示下一頁
        // 每一頁顯示transition 為淡入淡出，可以透過透明度ope從0-1的變化產生淡入淡出效果
        // * 每一頁的位置應該調整在視窗中央
        // 可以設定為 position:relative ,top:0,,left:0
        // 聲音
        // * 按鍵點擊時與hover 狀態應該觸發聲音音效。
        // * 在進入頁面之後，即播放背景音效
        // * ?:判斷進入頁面的關鍵是什麼？
        // 鍵盤關係
        // * 按鈕與鍵盤的聯動關係設定
        // * 在Button 底下下 keydown ？（查鍵盤鍵的key值，綁定關係
        // 延伸功能
        // * 改為3D呈現，需要花多少時間

    



                
       const getNumber = (e) => {
        console.log("getNumver",e.target);
       } 
        
  return (
    <div className="container">
        {/* <div className='page welcome'>
            <Card bordered={false}> 
            <Row style={{height:"100px"}}>
                <Col offset={6} span={12}><div className='welcome-title'></div></Col>
            </Row>
            <Row style={{height:"100px"}}>
                <Col offset={8} span={8}><Button className='welcome-start-btn'></Button></Col>
            </Row>
            </Card>
        </div>
        <div className='page page1 undisplay'>
            <div className='box' >
                <Space className='head'><h3>隻身一人</h3><span> 1 / 7</span></Space>
                <Row className='row' >
                    <Col span={16}>
                        <div className=' page1-left'>
                            <p className='storyText'>預言世界末日的日子2020/12/20…. <br />
                                那天仍然是一個上班累得像狗的日子<br />
                                樓上的狗，仍然在那邊玩弄樓板，<br />
                                吵的樓板嘎茲嘎茲作響：<br />
                                外頭的施工，依舊還放著重低音的音樂，<br />
                                表現著他那獨特的音樂品味：<br />
                                對面的鄰居，還是很準時得到陽台抽著他那<br />
                                廉價的雪茄：<br />
                                躺在沙發上的我，厭世的轉著台，<br />
                                電視台，怎麼都在播些政客的厭惡嘴臉，令人作嘔.<br />
                                這瓶啤酒，怎麼那麼食之無味．．．<br />
                                為何．．．這個世界還沒有任何動靜呢．．．<br />
                            </p>
                            <div className='nextone'>
                                <p>3秒後自動下一步</p>
                                <Button></Button>
                            </div>
                        </div>
                    </Col>
                    <Col span={8}><div className='page1-right'></div></Col>
                </Row>
            </div> 
        </div>
        <div className='page page2 undisplay'>
            <div className="box">
                <Space className='head'><h3>隻身一人</h3><span> 2 / 7</span></Space>
                <div className="story">
                    <p className='storyText'>一道陽光，照醒了我<br />
                    這世界有點安靜，平常樓上的房客會在這時間點遛狗的．．．<br />
                    『咦！』<br />
                    我不是昨天在沙發上看電視嗎！？<br />
                    怎麼在床上了呢！？<br />
                    難道世界末日的願望夢寐以求了，我是在天堂嗎！？<br />
                    </p>
                    <div className="nextone">
                        <p>3秒後自動下一步</p>
                        <div className='nextone-btn'></div>
                    </div>
                </div>
            </div>
        </div>
        <div className='page page3 undisplay'>
            <div className="box">
                <Space className='head'><h3>隻身一人</h3><span> 3 / 7</span></Space>
                <div className="story">
                    <p className="storyText">
                    這是哪裡！？<br />
                    看起來是我家呀！？<br />
                    為什麼變成這個樣子！？<br />
                    是發生什麼事了？<br />
                    </p>
                    <div className="nextone">
                        <p>3秒後自動下一步</p>
                        <div className='nextone-btn'></div>
                    </div>
                </div>
            </div>
        </div>
        <div className='page page4 undisplay'>
            <div className="box">
                <Space className='head'><h3>隻身一人</h3><span> 4 / 7</span></Space>
                <div className="story">
                    <p className="storyText">
                    臨亂的桌上，放了一句話「待在家」<br />
                    是發生什麼事情了！？<br />
                    為何窗戶都打不開了！？<br />
                    大門也緊鎖著<br />
                    </p>
                    <div className="nextone">
                        <p>3秒後自動下一步</p>
                        <div className='nextone-btn'></div>
                    </div>
                </div>
            </div>
        </div>
        <div className='page page5 undisplay'>
            <div className="box">
                <Space Space className='head'><h3>隻身一人</h3><span> 5 / 7</span></Space>
                <Row className='row' >
                    <Col span={8}><div className='page5-left '></div></Col>
                    <Col span={16}>
                        <div className='page5-right'>
                            <p className='storyText'>
                            房裡的廊道，燈具也壞了…<br />
                            好暗….<br />
                            我想離開…<br />
                            </p>
                            <div className='nextone'>
                                <p>3秒後自動下一步</p>
                                <div className='nextone-btn'></div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <div className='page page6 undisplay'>
            <div className="box">
                <Space className='head'><h3>隻身一人</h3><span> 6 / 7</span></Space>
                <div className="story">
                    <div className="storyText">
                        <p className='text1'>遠方…</p>
                        <p className='text2'>有道黃光…</p>
                        <p className='text3 rule'>
                        黃光旁寫著<br />
                        請輸入<span className='mark'>四個數字</span>密碼，該密碼數字<span className='mark'>不得重複</span>，<br />
                        每一次輸入都會獲得Ａ/Ｂ的提示：<br />
                        <span className='mark'>Ａ</span>：代表與密碼有相同數字，相對位置亦相同<br />
                        <span className='mark'>Ｂ</span>：代表與密碼有相同數字，但相對位置不相同<br />
                        獲得 4A0B 時即為解鎖成功。<br />
                        <span className='instance'>例如：<br />
                        答案為0981，你輸入的密碼為0123，會得到提示為1A1B。<br /></span>
                        </p>
                        <p className='text4 penalty'>
                        最後用著紅色的字體，提醒著的小字<br />
                        <span className='mark'>「請小心，一但開始，請在15分鐘內逃離，在第七次輸入密碼後，<br />
                        會每一次加深視覺的干擾你逃離這裡…」<br /></span>
                        </p>
                    </div>
                    <div className="nextone">
                        <p>3秒後自動下一步</p>
                        <div className='nextone-btn'></div>
                    </div>
                </div>
            </div>
        </div> */}
        <div className="page game">
            <div className='panel'>
                <input className='NumBTN-1' onClick={getNumber} values={1}></input>
                <div className='NumBTN-2' values={2} ></div>
                <div className='NumBTN-3'></div>
                <div className='NumBTN-4'></div>
                <div className='NumBTN-5'></div>
                <div className='NumBTN-6'></div>
                <div className='NumBTN-7'></div>
                <div className='NumBTN-8'></div>
                <div className='NumBTN-9'></div>
                <div className='ruleBTN'></div>
                <div className='NumBTN-0'></div>
                <div className='CheckBTN'></div>
            </div>
            {/* <h1>猜數字遊戲</h1>
            <p>試著猜看看密碼鎖是多少吧！我們將會提示你每一次嘗試的答案是否正確。當你的位置與數字是對的，我們會給你Ａ的回覆;若只有數字對了，位置不對時，我們會給你Ｂ的回覆。加油！快逃離這個密室吧！</p>
            <Button onClick={handleStart} disabled={gameAnswer?true:false} >開始遊戲</Button>
            <Button onClick={handleReStart} disabled={gameAnswer?false:true}>重新開始</Button>
            <Text>答案：{gameOver ?  gameAnswer ? gameAnswer :"" : gameAnswer ?'****':""}</Text>
            <Button onClick={handleOverGame} disabled={gameAnswer?false:true}>公佈答案</Button>
            <Form form={form} onFinish={handleGetAnswer}>
                <Form.Item name="userAnswer"  label="你的答案">
                    <Input  placeholder="請輸入你的答案" maxLength={4} type="number" />
                </Form.Item>
                <Button type="primary" htmlType="submit" disabled={gameAnswer ?false:true}>送出答案</Button>
            </Form>
            <Card title="結果">
                <Table dataSource={[...dataSource]} columns={columns} />
            </Card> */}
            {/* <Row wrap={false} style={{height:"100%"}}>
                <Col className='leftbox' span={11}> */}
                    {/* <div className="result ">
                        <div className="timer"></div>
                        <div className="inputdispaly"></div>
                        <div className="point">

                        </div>
                    </div>
                </Col>
                <Col className='rightbox' offset={0} span={11}>
                    <div className="panel ">  */}
                    {/* <div className="NumBTN-1"></div>  */}
                        {/* <Form style={{}}>
                            <Form.Item name={1} className="NumBTN-1">
                                <div ></div>    
                            </Form.Item> */}
                            {/* <Form.Item name={2}>
                                <div className="NumBTN-2"></div>
                            </Form.Item> */}
                            {/* <Form.Item name={3}>
                                <div className="NumBTN-3"></div>
                            </Form.Item> */}
                            {/* <Form.Item name={4}>
                                <div className="NumBTN-4"></div>
                            </Form.Item>
                            <Form.Item name={5}>
                                <div className="NumBTN-5"></div>
                            </Form.Item>
                            <Form.Item name={6}>
                                <div className="NumBTN-6"></div>
                            </Form.Item>
                            <Form.Item name={7}>
                                <div className="NumBTN-7"></div>
                            </Form.Item>
                            <Form.Item name={8}>
                                <div className="NumBTN-8"></div>
                            </Form.Item>
                            <Form.Item name={9}>
                                <div className="NumBTN-9"></div>
                            </Form.Item>
                            <Form.Item name={'rule'}>
                                <div className="ruleBTN"></div>
                            </Form.Item>
                            <Form.Item name={0}>
                                <div className="NumBTN-0"></div>
                            </Form.Item>
                            <Form.Item name={'check'}>
                            <div className="CheckBTN"></div>
                            </Form.Item> */}
                        {/* </Form> */}
                    {/* </div>
                </Col>
            </Row>*/}

            
        </div> 
        {/* <div className="page success undisplay">
            <div className="box">
                <Space Space className='head'><h3>隻身一人</h3><span>作者：哞哞牛</span></Space>
                <div className="story">
                    <div className="storyText">
                        <p>
                        恭喜你！！！！<br />
                        成功的逃離這裡，其實這只是你的一場夢<br />
                        因為你對工作、對生活的壓力過於龐大，<br />
                        而產生一個把自己捆綁著的心理作用而生成的夢境內容<br />
                        <br />
                        希望這份遊戲，可以讓你細想一下，<br />
                        我們的生活是否就像這樣的人物，對生活總是充滿著厭惡<br />
                        在工作中無法獲得成就感、<br />
                        在生活中家人無法給你溫暖、<br />
                        在假期中朋友對你的不諒解、、、<br />
                        但試著換一個角度看看，你會發現就像這道鎖一樣<br />
                        發現答案就在那裡等著你解開，一切就光明了<br />
                        </p>
                    </div>
                    <div className="gameOver">
                        <div className="BTN"></div>
                    </div>
                </div>
            </div>    
        </div> 
        <div className="page fail undisplay">
            <div className="box">
                <Space Space className='head'><h3>隻身一人</h3><span>作者：哞哞牛</span></Space>
                <div className="story">
                    <div className="storyText">
                        <p>
                        對不起，逃離失敗了！！！！<br />
                        你將一直關在這裡，與我相伴、、、<br />
                        但，只要你願意，你可以選擇重新挑戰一次<br />
                        重新再一次面對它，挑戰他吧！<br />
                        當然，你也可以一直留在這！<br />
                        </p>
                    </div>
                    <div className="reGame">
                        <div className="reGameBTN"></div>
                        <div className="failGameOverBTN"></div>
                    </div>
                </div>
            </div>    
        </div>  */}
    </div>
  )
}

export default Guessnum