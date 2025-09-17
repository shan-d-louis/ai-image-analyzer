import axios from 'axios';
import React, { useState } from 'react'

function App() {
  const [file, setFile] = useState();
  const [predictions, setPredictions] = useState([]);

  const handleUpload = async () => {

    if (!file){
      setPredictions(["Please Upload File"])
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("http://127.0.0.1:8000/classify", formData, {headers: {"Content-Type" : "multipart/form-data"}})
    setPredictions(res.data.predictions)
    console.log(res)
  }

  console.log(predictions)
  console.log(file)

  return (
    <div className='bg-gray-900 w-screen h-screen text-white font-sans flex justify-center space-x-10 items-center'>
      <div className=''>
      <span className='text-6xl font-bold bg-clip-text text-transparent bg-white transform hover:scale-120 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 transition duration-900'>AI Image Classifier</span><br/><br/>
      <span className='text-2xl ms-3'>Upload an Image and the AI Model will classify it for you</span> <br/><br/>
      
      <label className='px-4 ms-2 cursor-pointer border-1 rounded-2xl'>
        <input className='hidden' type="file" onChange={(e) => {setFile(e.target.files[0]); setPredictions([])}}/>
        Choose file
      </label><br/>
      <button onClick={handleUpload} className='bg-amber-200 rounded-4xl text-3xl text-black font-medium mt-5 mb-1 px-3 pb-2 cursor-pointer hover:scale-110 hover:text-white hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 transition duration-300'>Classify</button><br/>

      {(file) && (
        <>
          <img src={URL.createObjectURL(file)} className='rounded-xl' alt="Image Preview" style={{maxHeight : "300px", maxWidth : "300px"}}/> 
        </>
      )}
      {(predictions.length > 0) && (
        <>
          {(predictions[0] == "Please Upload File") && (
            <span className='text-red-500 ms-2'>Please Upload File</span>
          )}
        </>
      )}
      </div>
      <div className='border-6 border-amber-400 rounded-4xl p-5 ms-5'>
        {(predictions.length == 3) && (
            <div className='flex flex-col items-center'>
              <span className='text-7xl mt-5 font-semibold font-sans leading-normal bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600 hover:bg-gradient-to-l hover:from-pink-600 hover:to-purple-500 transition duration-500'>Image Analysis</span> <br/>
              <div className='flex flex-col space-y-5'>
                {predictions.map((prediction, index) => {
                return (
                  <div className='my-5 font-sans text-3xl'><span className='font-semibold' key={index}>{prediction.label[0].toUpperCase() + prediction.label.slice(1)}: </span><span> {prediction.score.toFixed(3) *100}%</span><br/></div>
                )
                })}
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default App