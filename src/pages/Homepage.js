import React , {useState ,useEffect} from 'react';
import Search from '../components/Search';
import Picture from '../components/Peictures';


const Homepage = () => {
    const [input, setinput] = useState("");
    let [data, setData] = useState(null);
    let [page, setpage] = useState(1);
    let [currentSearch, setcurrentSearch] = useState("");
    const auth = "563492ad6f917000010000011f44a87416664913a6da36aa3d87d1ca";
    const intialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
    const searchURL =  `https://api.pexels.com/v1/search?query=${currentSearch}e&per_page=15&page=1`;

    //fetch data from pexels api
    const search = async (url) => {
        setpage(2);
        const dataFetch = await fetch(url, {
        method:"GET",
        headers: {
            Accept:"application/json",
            Authorization:auth,
        },
        });
        let parseData = await dataFetch.json();
        setData(parseData.photos);
        //console.log(parseData);
        
    };

    //load more picture
    const morepicture = async () => {
        let newURL;
        if (input === "") {
            newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
        }else {
            newURL = `https://api.pexels.com/v1/search?query=${input}e&per_page=15&page=${page}`;
        }
        setpage(page + 1);
        const dataFetch = await fetch(newURL, {
            method:"GET",
            headers: {
                Accept:"application/json",
                Authorization:auth,
            },
            });
            let parseData = await dataFetch.json();
            setData(data.concat(parseData.photos));

    };

    //fetch data when the page load up
    useEffect( () => {
        search(intialURL);
    },[])
    useEffect( () => {
        if (currentSearch == "") {
            search(intialURL);
        }else {
            search(searchURL);
        }
    },[currentSearch]);

  return (
    <div style={ {minHeight:"100vh"}}>
        <Search search={() => {
            //JS CLOSURE
            setcurrentSearch(input);
            console.log(currentSearch);//為""
            search(searchURL);
            }} setinput={setinput}/>
        <div className="pictures">
            {data &&
                data.map(d => {
                    return <Picture data={d} />
                })
            }
        </div>

        <div className="morePicture">
            <button onClick={morepicture}>Load More</button>
        </div>
    </div>
  );
};

export default Homepage;