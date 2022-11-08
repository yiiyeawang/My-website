import React ,{useState} from 'react'
import {Button, Card, Form, Input,Typography,Table} from 'antd'

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
            console.log("handleStart")
            const getGameAnswer = [];
            for (let i = 0; i < 4; i++) {
                let randomNum = Math.floor(Math.random() * 10);
                if (getGameAnswer.indexOf(randomNum) == -1) {
                    //console.log('-1='+ randomNum);
                } else {
                    //console.log('1='+ randomNum);
                    randomNum = Math.floor(Math.random() * 10);
                    //console.log('1+=' + randomNum);
                }
                getGameAnswer[i] = randomNum;
            };
            setGameAnswer(getGameAnswer)
            setCurrect(false)
            setGameOver(false)
        }
        const handleReStart = ()=>{
            setGameAnswer("")
            setDataSource([])
        }

        const verify = (value) =>{
            
            //let result = value.userAnswer.map((item)=> gameAnswer.indexOf(item) )
            for (let i = 0; i < gameAnswer.length; i++) {
                let A;
                let B ;
                if (value.userAnswer.indexOf(gameAnswer[i])) {
                     A++;
                }
                
                
            }
            console.log(typeof(value.userAnswer));
        }
        const handleGetAnswer = (values) => {
            let result = verify(values)
            console.log(result);
            let newData = {key:Math.floor(Math.random()*100),userAnswer:values.userAnswer,num:dataSource.length+1,prompt:'3a4b'}
            setDataSource([...dataSource,newData])
            form.resetFields();

        }
        const handleOverGame =() =>{
            setGameOver(true)
            let clearContext = []
            setDataSource(clearContext)
        }
        
  return (
    <div className="container">
        <div className="content">
            <h1>猜數字遊戲</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda hic laboriosam cum ab porro dolorem asperiores animi labore. Deleniti nulla voluptates fugit nesciunt hic aspernatur ipsam natus aut, laborum tempore.</p>
            <Button onClick={handleStart} disabled={gameAnswer?true:false} >開始遊戲</Button>
            <Button onClick={handleReStart} disabled={gameAnswer?false:true}>重置遊戲</Button>
            <Text>答案：{gameOver ?  gameAnswer ? gameAnswer :"" : gameAnswer ?'****':""}</Text>
            <Button onClick={handleOverGame} disabled={gameAnswer?false:true}>公佈答案</Button>
            <Form form={form} onFinish={handleGetAnswer}>
                <Form.Item name="userAnswer"  label="你的答案">
                    <Input  placeholder="請輸入你的答案" maxLength={4} type="number" />
                </Form.Item>
                <Button type="primary" htmlType="submit">送出答案</Button>
            </Form>
            <Card title="結果">
                <Table dataSource={[...dataSource]} columns={columns} />;
            </Card>
        </div>
    </div>
  )
}

export default Guessnum