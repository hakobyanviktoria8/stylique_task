import React, { useState, useEffect } from 'react';
import './App.scss';
import done from './images/done.png'
import {listF, listDs, listDl} from "./lists"

function App() {
  const[listFoundation, setListFoundation]=useState(listF)
  const[doneFoundation, setDoneFoundation]=useState(false)
  const[listDiscovery, setListDiscovery]=useState(listDs)
  const[doneDiscover, setDoneDiscover]=useState(false)
  const[listDelivery, setListDelivery]=useState(listDl)
  const[doneDelivery, setDoneDelivery]=useState(false)
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
    listFoundation.map(item=>{
      if(item.check){
        return setDoneFoundation(true)
      } else{
        return setDoneFoundation(false)
      }
    })
    listDiscovery.map(item=>setDoneDiscover(item.check))
    listDelivery.map(item=>setDoneDelivery(item.check))

    if(doneFoundation && doneDiscover && doneDelivery){
      setTimeout(()=>{
        alert(data.text)
      },300)
    }
  },[listFoundation, doneFoundation, listDiscovery, doneDiscover, listDelivery, doneDelivery])

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

  const handleOnChangeDl = (id) => {
    if(doneFoundation && doneDiscover){
      setListDelivery(
        listDelivery.map(item => {
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
            <img src={doneDelivery ? done : ""}/>
          </h2>
          {listDelivery.map(item => {
            return (
              <div key={item.id}>
                <label htmlFor={`dl-${item.id}`}>
                  <input
                    id={`dl-${item.id}`}
                    type="checkbox"
                    value={item.text}
                    checked={item.check}
                    onChange={() => handleOnChangeDl(item.id)}
                  />
                  {item.text}
                </label>
              </div>
            );
          })}
        </div>
    </div>
  );
}
export default App;
