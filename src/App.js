import { useState, useEffect } from 'react';
import './App.css';
import done from './images/done.png'

function App() {
  const[checkedF, setCheckedF]=useState(false)
  const[checkedDs, setCheckedDs]=useState(false)
  const[checkedDl, setCheckedDl]=useState(false)
  const [data, setData] = useState("");
  
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch('https://uselessfacts.jsph.pl/random.json')
      response = await response.json()
      setData(response)
    }
    fetchMyAPI()
  }, [])

  useEffect(()=>{
    if(checkedF && checkedDs && checkedDl){
      setTimeout(()=>{
        alert(data.text)
      },300)
    }
  },[checkedF,checkedDs,checkedDl])

  const handleChengeFoundation= (e)=>{
    setCheckedF(e.target.checked= !checkedF);
  }
  const handleChengeDiscovery= (e)=>{
    if(checkedF){
      setCheckedDs(e.target.checked= !checkedDs);
    }
  }
  const handleChengeDelivery= (e)=>{
    if(checkedDs){
      setCheckedDl(e.target.checked= !checkedDl);
    }
  }
 
  return (
    <div className='startupStep'>
        <div>
          <h2>
            <span>1</span>
            Foundation
            <img src={checkedF ? done : ""}/>
          </h2>
          <label>
            <input type="checkbox" checked={checkedF} onChange={handleChengeFoundation}/>
            Eat
          </label>
        </div>
        <div>
          <h2>
            <span>2</span>
            Discovery
          <img src={checkedDs ? done : ""}/>
          </h2>
          <label>
            <input type="checkbox" checked={checkedDs} onChange={handleChengeDiscovery}/>
            Learn
          </label>
        </div>
        <div>
          <h2>
            <span>3</span>
            Delivery
          <img src={checkedDl ? done : ""}/>
          </h2>
          <label>
            <input type="checkbox" checked={checkedDl} onChange={handleChengeDelivery}/>
            Learn
          </label>
        </div>
    </div>
  );
}
export default App;
