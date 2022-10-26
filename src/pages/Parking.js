import React ,{ useState ,useMemo,useRef,useEffect,useCallback} from 'react'
//import Search from 'antd/lib/transfer/search';
import axios from 'axios';
import {Card, Col, Form, Row,Slider, Space, Tag} from 'antd';
import { RiNavigationFill } from "react-icons/ri";

import { MapContainer, TileLayer, useMap ,Marker , Popup,useMapEvents,Circle,CircleMarker,Polyline,Polygon,Rectangle,SVGOverlay ,LayerGroup,FeatureGroup,Tooltip,LayersControl,Pane,useMapEvent} from 'react-leaflet'
import { useEventHandlers } from '@react-leaflet/core'
import "leaflet/dist/leaflet.css"
import Input from 'rc-input';


//獲取當下的經緯度
//建立地圖Leaflet.js
//將經緯度寫入地圖中觸發地圖變化
//以當下位置查詢https://odws.hccg.gov.tw/001/Upload/25/opendataback/9059/452/25d47dd1-ac2b-405f-ac52-ba2f8b3071b6.json
//獲得資料渲染


function Parking() {
    const center = [24.7890, 121.0142]
    const zoom = 15
    const SearchResult = [1,2,3,4,5,6,7]

    const marks = {
        0: '0M',
        10 :'100M',
        30 :'300M',
        60 :'600M',
        90 :'1KM',
        100:'2KM',
      };

    function DisplayPosition({ map }) {
        const [position, setPosition] = useState(() => map.getCenter())

        const onClick = useCallback(() => {
            map.setView(center, zoom)
        }, [map])

        const onMove = useCallback(() => {
            setPosition(map.getCenter())
        }, [map])

        useEffect(() => {
            map.on('move', onMove)
            return () => {
            map.off('move', onMove)
            }
        }, [map, onMove])

        return (
            <p>
            latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
            <button onClick={onClick}>reset</button>
            </p>
        )
    }

    function ExternalStateExample() {
        const [map, setMap] = useState(null)
      
        const displayMap = useMemo(
          () => (
            <MapContainer
              center={center}
              zoom={zoom}
              scrollWheelZoom={false}
              ref={setMap}
              style={{
                height:'500px'
              }}
              >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </MapContainer>
          ),
          [],
        )
      
        return (
          <div>
            {map ? <DisplayPosition map={map} /> : null}
            {displayMap}
          </div>
        )
      }

    function handleClickNavigat() {
        console.log('handleClickNavigat')
    }

    return(
        <Row style={{padding:"1.2em",margin:"1.2em 0"}} gutter={[32,48]}>
            <Col span={12}>
                <ExternalStateExample />
            </Col>
            <Col span={12}>
                <div className='leftInfo'>
                    <div className="pageHeader">
                        <h3>停車查詢</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quos, labore cupiditate tenetur nemo necessitatibus voluptatem, facere possimus at quasi eveniet eligendi eum quibusdam culpa quia? Sed dicta sit earum.</p>
                    </div>
                    <Form name='search'>
                        <Form.Item label="Distance">
                            <Slider marks={marks} step={100} defaultValue={0}/>
                        </Form.Item>
                    </Form>
                    <Space className='SearchResult' direction="vertical"   size="middle"   style={{ display: 'flex', height:'325px',boxSizing:'border-box' ,overflow:'scroll',padding:'0.4em' }}  >
                        {SearchResult?.map((item,key) => {
                            return(
                                <Card  headStyle={{fontSize:'18px'}} hoverable='true' >
                                    <h4>{`停車場名稱${item}`}</h4>
                                    <Space align='center'>
                                         停車場地址
                                         <RiNavigationFill onClick={handleClickNavigat} />
                                     </Space>
                                     <div style={{textAlign:'right'}}>
                                        <Tag >30元/hrs</Tag>
                                        <Tag >MAX 180元</Tag>
                                     </div>
                                </Card>
                            // <Row key={key} className='SearchResultItem'>
                            //     <Col span={24}>
                            //         <h6>停車塲名稱{item}</h6>
                            //     </Col>
                            //     <Col span={24}>
                            //         <Space align='center'>
                            //             停車場地址
                            //             <RiNavigationFill onClick={handleClickNavigat} />
                            //         </Space>
                            //     </Col>
                            //     <Col span={12} offset={12} style={{textAlign:"right"}}>
                            //         <Tag >30元/hrs</Tag>
                            //         <Tag >MAX 180元</Tag>
                            //     </Col>
                            // </Row>
                            )
                            }
                        )}
                    </Space>
                </div>
            </Col>
        </Row>

    )

}



export default Parking