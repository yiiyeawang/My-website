import React ,{ useState ,useMemo,useRef,useEffect,useCallback} from 'react'
//import Search from 'antd/lib/transfer/search';
import axios from 'axios';
import {Card, Col, Form, Row,Slider, Space, Tag} from 'antd';
import { RiNavigationFill } from "react-icons/ri";
import { BsFillBalloonFill } from "react-icons/bs";

import { MapContainer, TileLayer, useMap , Popup,useMapEvents,Circle,CircleMarker,Polyline,Polygon,Rectangle,SVGOverlay ,LayerGroup,FeatureGroup,Tooltip,LayersControl,Pane,useMapEvent} from 'react-leaflet'
import { Marker } from 'react-leaflet/Marker'
import { useEventHandlers } from '@react-leaflet/core'
import "leaflet/dist/leaflet.css"
import Input from 'rc-input';
import L from 'leaflet';


//獲取當下的經緯度
//建立地圖Leaflet.js
//將經緯度寫入地圖中觸發地圖變化
//以當下位置查詢
//獲得資料渲染


function Parking() {
    const center = [24.7890, 121.0142]
    const zoom = 15
    const SearchResult = [1,2,3,4,5,6,7]


    //以下使用的是TDX
    
    const [accessToken, setAccessToken] = useState(null);
    const [apiResponse, setAPIResponse] = useState(null);
  
    useEffect(() => {
      getAuthorizationHeader();
    }, []);

    useEffect(() => {
        if (accessToken) {
          getAPIResponse();
        }
      }, [accessToken]);
  
    const getAuthorizationHeader = async () => {
      const parameter = {
        grant_type: "client_credentials",
        client_id: "yiiyeawang-585225c4-c46b-4de0",
        client_secret: "8a403597-ce1d-469f-b081-113f97c17749"
      };
  
      const authUrl = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";
  
      try {
        const response = await axios.post(authUrl, parameter,{
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        });
        //console.log(response)
        setAccessToken(response.data);
        getAPIResponse()
      } catch (error) {
        console.log(error);
      }
    };
  
    const getAPIResponse = async () => {
      if (accessToken) {
        const apiUrl = "https://tdx.transportdata.tw/api/basic/v1/Parking/OffStreet/CarPark/City/Hsinchu";
  
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              "Authorization": `Bearer ${accessToken.access_token}`
            }
          });
  
          setAPIResponse(response.data);
          //獲得資料後要整理給不同的東西呈現
          console.log('Data', response.data.CarParks);
        } catch (error) {
          console.log('Error:', error);
        }
      }
    };

    //建議每過一段時間應該重新獲得token



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
        const myMarkerIcon = L.icon({
            iconUrl: <BsFillBalloonFill/>,
            iconSize: [32, 32],
          });
      
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
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"//底圖由此建立
              />
              {/* {console.log('我有抓到資料',apiResponse?.CarParks[0].CarParkPosition)} */}
              {apiResponse ? apiResponse.CarParks.map((item,index)=>(//建立所有停車場資訊內容
                <Marker position={[item.CarParkPosition.PositionLat,item.CarParkPosition.PositionLon]} 
                icon={myMarkerIcon} >
                    <Popup>
                        <Card title={item.CarParkName.Zh_tw} bordered={false} key={item.carParkID}>
                            {/* "停車場名稱": "南門機械停車場",
                                "地址": "新竹市東區中華路二段545之1號",
                                "營運時間": "24H",
                                "平日收費方式": "汽車：20元／H",
                                "假日收費方式": "汽車：20元／H",
                                "汽車總車位": "150",
                                "汽車剩餘車位": "77",
                                "機車總車位": "0",
                                "機車剩餘車位": "0",
                                "X座標": "24.800005",
                                "Y座標": "120.968525" */}
                            {item.Description}
                            {item.Email}
                            
                            {item.Telephone}
                            {item.Address}
                            <Tag >{item.FareDescription}</Tag>
                        </Card>
                    </Popup>
                </Marker> 
              )):""}
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
        <Row gutter={[32,48]}>
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
                                <Card key={key}  headStyle={{fontSize:'18px'}} hoverable='true' >
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