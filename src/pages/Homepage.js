import React from 'react'
//icon
import behance from './../images/icon/behance-brands.svg'
import welcomeIcon from './../images/icon/room-24px.svg'
import UIUXIcon from './../images/icon/Group 1.svg'
import devClassName from './../images/icon/divclass.svg'
import ACIcon from './../images/icon/bc.svg'
//image
import background from './../images/background.png'
import StSFontpage from './../images/StSFontpage.png'
import GDIMG from './../images/GD.jpg'
import paintIMG from './../images/Paint.jpg'
import myPhoto from './../images/about-pic.png'

import {useSpring,animated} from 'react-spring'



function Number({n}) {
    const {number} = useSpring({
        from:{number:0},
        number:n,
        config:{mass:1,tension:25,friction:5,}
    })
    return <animated.div>{number.to((n)=>n.toFixed(0))}</animated.div>
}

function Homepage() {
  return (
    <>
        <div className="hero">
            <div className="content">
            <h1>YII YEA WANG </h1>
            <h1>Beautifully Crafted Web Experiences</h1>
            <div className="meet">
                <p>National Kaohsiung Normal University | Department of Fine Arts</p>
            </div>
            <svg  className=" scroll stagger1"  width="50" height="80" viewBox="0 0 73 98">
                <g id="icon-scroll" transform="translate(-848 -101)">
                <g id="Rectangle_1" data-name="Rectangle 1" transform="translate(848 101)" fill="none" stroke="#fff" stroke-width="5">
                    <rect width="73" height="98" rx="36.5" stroke="none"/>
                    <rect x="2.5" y="2.5" width="68" height="93" rx="34" fill="none"/>
                </g>
                <rect className="scrollAnima" id="Rectangle_2" data-name="Rectangle 2" width="8" height="27" rx="4" transform="translate(881 120)" fill="#c43c3c"/>
                </g>
            </svg>
            </div>
            <div className="hero-design">
            <img src={background} alt="背景圖"/>
            </div>
        </div>


        <section className="featured" id="mywork">
            <img className="left transition2" src={myPhoto} alt="Featured Project"/>
            <div className="right">
                <div className="inner transition2">
                    <p className="subtitle">About me <span>關於我</span></p>
                    <a href="#" className="featured-title">WHO AM I?</a>

                    <p className="featured-desc">
                    我曾經是一名中學教師，授課內容以培養「生活美感」為主的「視覺藝術」科目。如今我是一名網頁設計師，也是一名軟體工程師，建築網頁的一名建築工！
                    長年的美感經驗的薰陶，讓我在資訊發展時代下，擁有一塊可拓展的天地，是「UI/UX」、是「前端」，將過去教育的心情轉嫁到網頁的構築上，同樣也是一種教育方式。
                    讓我在這個轉職過程中，感到十分愉悅！
                    </p>
                    <div className="exper">
                    <ul className=" ex inner transition2">
                        <li className="ex-l">
                        <p className="ex-til">工作經驗</p>
                        <p className="ex-qua">  <span><Number n={7} /></span>years</p>
                        </li>
                        <li className="ex-r">
                        <p className="ex-til">美感經驗</p>
                        <p className="ex-qua">  <span> <Number n={13} /></span>years</p>
                        </li> 
                    </ul>
                    </div>
                </div>
            </div>
        </section>

        <section className="skills" id="myskills">
            <div className="skills-container">
                <ul>
                <li className="transition2">
                    <div className="icon-container one">
                    <img src={UIUXIcon} alt="UI/UX Icon" />
                    </div>
                    <p className="skill-tilte">UI UX Design</p>
                    <p className="featured-desc skill-desc">使用ADOBE XD、ILLUSTRATOR 和 PHOTOSHOP的軟體執行製作，並利用Xmind思考使用者體驗流程，進而繪製完整的PROTOTYPE。金流資訊公司擔任網頁設計師經驗</p>
                </li>
                <li className="transition2">
                    <div className="icon-container two">
                    <img src={devClassName} alt="Frontend Development" />
                    </div>
                    <p className="skill-tilte">Frontend Development</p>
                    <p className="featured-desc skill-desc">自我進修獲得前端網頁語言技術能力，並且以第二名資格從一百零九年職訓單位中彰投分署網頁設計實務應用班結訓。擔任友上科技軟體工程師一職！</p>
                </li>
                <li className="transition2">
                    <div className="icon-container three">
                    <img src={ACIcon} alt="Aesthetic Creation" />
                    </div>
                    <p className="skill-tilte">Aesthetic Creation</p>
                    <p className="featured-desc skill-desc">從高中美術班起，至學士後五年的視覺教師經歷，培養學生美感。擁有十三年長期與美感相處，促使我具備充分的美感營造能力。</p>
                </li>
                </ul>
            </div>
        </section>

        <section className="portfolio">
            <div className="portfolio-container transition3">
                <div className="portfolio-left">
                <div className="inner">
                    <p className="subtitle">Web Design</p>

                    <p className="featured-title">職訓課程個人專題</p>
                    <p className="feature-desc">結合視覺意象，表達學習專注與分工合作之緊密關係。</p>
                </div>
                </div>
                <a href="http://yiiyeawang.byethost24.com/studentsystem/index.php?i=1" target="_blank"><img src={StSFontpage} alt="Interior design" /></a>
            </div>
            <div className="portfolio-container transition3">
                <div className="portfolio-left">
                <div className="inner">
                    <p className="subtitle">Graphic Design</p>

                    <p className="featured-title">平面設計相關內容</p>
                    <p className="feature-desc">結合教育相關平面海報等製作,體現美感在生活的理念。</p>
                </div>
                </div>
                <a href="#"><img src={GDIMG} alt="Interior design" /></a>
            </div>
            <div className="portfolio-container transition3">
                <div className="portfolio-left">
                <div className="inner">
                    <p className="subtitle">Paint</p>

                    <p className="featured-title">手繪能力</p>
                    <p className="feature-desc">畢業製作以油畫與複合媒彩結合文字藝術為表達方式。</p>
                </div>
                </div>
                <a href="#"><img src={paintIMG} alt="Interior design" /></a>
            </div>
        </section>
    </>
  )
}

export default Homepage