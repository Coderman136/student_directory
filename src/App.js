import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {FaPlus, FaMinus} from 'react-icons/fa'

import './App.css';


const App = () => {

  const [data, setData] = useState([]) ;
  const [search, setSearch] = useState('');
  const [symbolToggled, setSymbolToggled] = useState(false);

  useEffect(() => {
    getData()
  }, [])
const getData = () => {
  axios.get(' https://api.hatchways.io/assessment/students')
    .then(response => {
      setData( [...response.data.students]);
    })
    .catch(err => console.log(err))
}  

const hideTestScores = () => {
      setSymbolToggled(!symbolToggled)
    }

  return (
   <div className='info'>
     <div className='search'><input type="text" placeholder="Search by name" className='input' onChange={(e) => setSearch(e.target.value)}/></div>
    {data.filter((student) => {
    if(search === ""){
      return student
    }else if(student.firstName.toLowerCase().includes(search.toLowerCase()) || student.lastName.toLowerCase().includes(search.toLowerCase())){
      return student
    }
    return student
    }).map(d => (
    <div className="studentInfo" key={data.id}>
      <div className='image'><img src={d.pic} alt="uploading..."/></div>
      <div className="details">
      <h1>{d.firstName} {d.lastName}</h1>
      <p>Email: {d.email}</p>
      <p>Company: {d.company}</p>
      <p>Skill: {d.skill}</p>
      <p>Average: {(d.grades.reduce((a,b) => parseInt(a)+parseInt(b)))/(d.grades.length)}%</p>
      <div className={`grades ${symbolToggled ? 'invisible': ''}`} id={d.id}>
      {d.grades.map(t => (
        <div>
          <p>Test {d.grades.indexOf(t)+1} : {t}%</p>
        </div>
      ))}
      </div>
      </div>
      <div className="toggle" onClick={hideTestScores}>{symbolToggled?<FaMinus fontSize="1.5rem"/> : <FaPlus fontSize="1.5rem"/>}</div>
    </div>
    ))}
  </div> 
  )

}

export default App;
