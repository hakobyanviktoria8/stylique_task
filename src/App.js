import { useState, useEffect } from 'react';
import './App.css';
import done from './images/done.png'

function App() {
  const listF = [
    {
      id: 1,
      text: "Foundation 1",
      check: false
    },
    {
      id: 2,
      text: "Foundation 2",
      check: false
    },
    {
      id: 3,
      text: "Foundation 3",
      check: false
    },
    {
      id: 4,
      text: "Foundation 4",
      check: false
    },
    {
      id: 5,
      text: "Foundation 5",
      check: false
    }
  ]
  const listDs = [
    {
      id: 1,
      text: "Discovery 1",
      check: false
    },
    {
      id: 2,
      text: "Discovery 2",
      check: false
    },
    {
      id: 3,
      text: "Discovery 3",
      check: false
    }
  ]
  const[listFoundation, setListFoundation]=useState(listF)
  const[doneFoundation, setDoneFoundation]=useState(false)
  const[listDiscovery, setListDiscovery]=useState(listDs)
  const[doneDiscover, setDoneDiscover]=useState(false)

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
    listFoundation.map(item=>setDoneFoundation(item.check))
    listDiscovery.map(item=>setDoneDiscover(item.check))
    if(doneFoundation && doneDiscover){
      setTimeout(()=>{
        alert(data.text)
      },300)
    }
  },[listFoundation, doneFoundation, listDiscovery, doneDiscover])

  const handleOnChangeF = (id) => {
    setListFoundation(
      listFoundation.map(item => {
        if(item.id === id){
          return {
            ...item,
            check : !item.check
          }
        }
        return item;
      })
    )
  }
  const handleOnChangeDs = (id) => {
    if(doneFoundation){
      setListDiscovery(
        listDiscovery.map(item => {
          if(item.id === id){
            return {
              ...item,
              check : !item.check
            }
          }
          return item;
        })
      )
    }
  }

  return (
    <div className='startupStep'>
        <div>
          <h2>
            <span>1</span>
            Foundation
            <img src={doneFoundation ? done : ""}/>
          </h2>
          {listFoundation.map(item => {
            return (
              <div key={item.id}>
                <label htmlFor={`f-${item.id}`}>
                  <input
                    id={`f-${item.id}`}
                    type="checkbox"
                    value={item.text}
                    checked={item.check}
                    onChange={() => handleOnChangeF(item.id)}
                  />
                  {item.text}
                </label>
              </div>
            );
          })}
        </div>
        <div>
          <h2>
            <span>2</span>
            Discovery
            <img src={doneDiscover ? done : ""}/>
          </h2>
          {listDiscovery.map(item => {
            return (
              <div key={item.id}>
                <label htmlFor={`ds-${item.id}`}>
                  <input
                    id={`ds-${item.id}`}
                    type="checkbox"
                    value={item.text}
                    checked={item.check}
                    onChange={() => handleOnChangeDs(item.id)}
                  />
                  {item.text}
                </label>
              </div>
            );
          })}
        </div>
        <div>
          <h2>
            <span>3</span>
            Delivery
            {/* <img src={checkedDl ? done : ""}/> */}
          </h2>
          {/* <label>
            <input type="checkbox" checked={checkedDl} onChange={handleChengeDelivery}/>
            Learn
          </label> */}
        </div>
    </div>
  );
}
export default App;
