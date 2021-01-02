import logo from './logo.svg';
import './App.css';

import React from 'react';
import axios from 'axios';
import './App.css';
function App() {
  let [responseData, setResponseData] = React.useState('');
  const fetchData = React.useCallback(() => {
    axios({
      method: 'GET',
      url: '/businesses',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Content-Type': 'application/json',
      },
      params: {
        language_code: 'en',
      },
    })
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchBusiness = (businessId) =>{
    console.log(businessId)
  }
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <h1>Fetching Data with React Hooks</h1>
      {/*<button type="button" onClick={fetchData}>
        Click for Data
      </button>*/}
        {responseData &&
          responseData.map((x) => {
            return <div key={x._id}
                style={{
                    backgroundColor: '#ece',
                    padding: 5,
                  margin:10, textAlign:'Left'

                }} onClick={()=> fetchBusiness(x._id)}
            >{x.name}


            </div>;
          })}

    </div>
  );
}
export default App;
