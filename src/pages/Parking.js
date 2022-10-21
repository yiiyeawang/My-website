import React ,{ useState ,useMemo,useRef,useEffect,useCallback} from 'react'
import Search from 'antd/lib/transfer/search';
import axios from 'axios';

import { MapContainer, TileLayer, useMap ,Marker , Popup,useMapEvents,Circle,CircleMarker,Polyline,Polygon,Rectangle,SVGOverlay ,LayerGroup,FeatureGroup,Tooltip,LayersControl,Pane,useMapEvent} from 'react-leaflet'
import { useEventHandlers } from '@react-leaflet/core'
import "leaflet/dist/leaflet.css"


//獲取當下的經緯度
//建立地圖Leaflet.js
//將經緯度寫入地圖中觸發地圖變化
//以當下位置查詢https://odws.hccg.gov.tw/001/Upload/25/opendataback/9059/452/25d47dd1-ac2b-405f-ac52-ba2f8b3071b6.json
//獲得資料渲染


function Parking() {
    // const center = [24.7890, 121.0142]
    // const zoom = 15
    const url = 'https://odws.hccg.gov.tw/001/Upload/25/opendataback/9059/452/25d47dd1-ac2b-405f-ac52-ba2f8b3071b6.json'

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(url).then(json => setData(json.data))
    }, [])
    console.log(data)


      

    // function DisplayPosition({ map }) {
    //     const [position, setPosition] = useState(() => map.getCenter())

    //     const onClick = useCallback(() => {
    //         map.setView(center, zoom)
    //     }, [map])

    //     const onMove = useCallback(() => {
    //         setPosition(map.getCenter())
    //     }, [map])

    //     useEffect(() => {
    //         map.on('move', onMove)
    //         return () => {
    //         map.off('move', onMove)
    //         }
    //     }, [map, onMove])

    //     return (
    //         <p>
    //         latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
    //         <button onClick={onClick}>reset</button>
    //         </p>
    //     )
    // }

    // function ExternalStateExample() {
    //     const [map, setMap] = useState(null)
      
    //     const displayMap = useMemo(
    //       () => (
    //         <MapContainer
    //           center={center}
    //           zoom={zoom}
    //           scrollWheelZoom={false}
    //           ref={setMap}
    //           style={{
    //             height:'500px'
    //           }}
    //           >
    //           <TileLayer
    //             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //           />
    //         </MapContainer>
    //       ),
    //       [],
    //     )
      
    //     return (
    //       <div>
    //         {map ? <DisplayPosition map={map} /> : null}
    //         {displayMap}
    //       </div>
    //     )
    //   }

    return(
        <div style={{padding:"1.2em",margin:"1.2em 0"}}>
            {/* <form name='search'>
                <label for="distance">Distance</label>
                <input type="range" id="distance" name="distance" min="1" max="10" step='1'></input>
            </form>
            <ExternalStateExample /> */}

        </div>

    )

}



export default Parking