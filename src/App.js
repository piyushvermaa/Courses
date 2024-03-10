import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import {apiUrl, filterData} from "./data"
import Filter from "./components/Filter";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";

function App() {
  
  const[courses, setCourses]= useState([]);
  const[loading, setLoading]= useState(true);
  const [category, setCategory] = useState(filterData[0].title);

  async function fetchData(){
    setLoading(true);
    try {
      const res= await fetch(apiUrl);
      const output=  await res.json();
      setCourses(output.data);
      
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
    setLoading(false);
    
  }
  useEffect(()=>{
    fetchData();
  },[]);


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <div>
        <Navbar/>
      </div>
      <div className="bg-">
        <div>
          <Filter 
          filterData={filterData}
            category={category}
            setCategory={setCategory}
          />
        </div>
        <div className="w-11/12 max-w-[1200px] 
        mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
        {
            loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)
          }
        </div>
      </div>


    </div>
  );
}

export default App;
