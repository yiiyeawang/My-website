import React ,{ useState } from 'react'
import Search from 'antd/lib/transfer/search';









function Parking() {
    const { href,sethref}  = useState("")
    const { textContent,setextContent}  = useState("")


    function geoFindMe(e) {
        e?.preventDefault();
        //const status = document.querySelector('#status');
        //const mapLink = document.querySelector('#map-link');
        //console.log(status ,mapLink )
        

        function success(position) {
          const latitude  = position.coords.latitude;
          const longitude = position.coords.longitude;
      
          //status.textContent = '';

          //mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
          //mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
          sethref(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`)
          setextContent(`Latitude: ${latitude} °, Longitude: ${longitude} °`)
        }
      
        function error() {
        setextContent('Unable to retrieve your location')
          //status.textContent = 'Unable to retrieve your location';
        }
      
        if (!navigator.geolocation) {
            setextContent('Geolocation is not supported by your browser')
          //status.textContent = 'Geolocation is not supported by your browser';
        } else {
          //status.textContent = 'Locating…';
          navigator.geolocation.getCurrentPosition(success, error);
        }
      
      }


  return (
    <div style={{minHeight:"100vh"}}>
        <p><button onClick={geoFindMe()}>Show my location</button></p>
        <div id="status" href={href} textContent={textContent}></div>
        <a id='map-link' target="_blank"></a>
    </div>
  )
}
//https://odws.hccg.gov.tw/001/Upload/25/opendataback/9059/452/25d47dd1-ac2b-405f-ac52-ba2f8b3071b6.json
export default Parking