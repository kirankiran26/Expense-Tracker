import React, { useEffect, useState } from 'react'
import './editbutton.css'
import { useMounthedit } from './editbuttonfils/Mounthedit'
import { useWeekedit } from './editbuttonfils/Weekedit'
import { useYearedit } from './editbuttonfils/Yearedit'
const Expensetracker = () => {
  const initiallist = {
    name: ["Breakfast ", "Lunch", "Dinner"],
    amount: [30, 50, 100],
  }
  // Store initiallist in local storage
localStorage.setItem('initiallist', JSON.stringify('initiallist'));

  const [newitem, setnewitem] = useState("");
  const [newamount, setnewamount] = useState("");
  const [Expenselist, setExpenselist] = useState(initiallist);
  const [sum, setsum] = useState(0);
  const [weeksum,setweelsum]=useState(0);
  const [yearsum,setyearsum]=useState(0);
  const [addamount,setaddamount]=useState(false);
  const [newaddingamount,setnewaddingamount]=useState('');
  const [todaylist, settodaylist] = useState(initiallist);
  const [edittodayIndex, setedittodayIndex] = useState(null);
  const [newtodayAmount, setnewtodayAmount] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('todaylist');
    if (savedData) {
      settodaylist(JSON.parse(savedData));
    }
  }, []);

  const handleTodayEditClick = (index) => {
    setedittodayIndex(index);
    setnewtodayAmount(todaylist.amount[index]);
  };

  const handleTodayInputChange = (e) => {
    setnewtodayAmount(e.target.value);
  };

  const handleTodaySaveClick = (index) => {
    const updatedList = { ...todaylist };
    updatedList.amount[index] = Number(newtodayAmount); // Update the amount
    settodaylist(updatedList);
    localStorage.setItem('todaylist', JSON.stringify(updatedList)); // Save updated data to localStorage
    setedittodayIndex(null); // Reset the edit index
  };


  const [balance, setBalance] = useState(() => {
    // Retrieve the balance from localStorage, or set it to 100 if not found
    const savedBalance = localStorage.getItem('balance');
    return savedBalance !== null ? parseInt(savedBalance, 10) : 100;
});

const{
  mounthsum,
  mounthedit,
  newmounthamount,
  handelMountheditclick,
  handelMounthsaveclick,
  handelmountinput,
}=useMounthedit()

const {
  weeklist,
  editWeekIndex,
  newWeekAmount,
  handleWeekEditClick,
  handleWeekInputChange,
  handleWeekSaveClick,
} = useWeekedit();


const {
  yearlist,
  editYearIndex,
  newYearAmount,
  handleYearEditClick,
  handleYearInputChange,
  handleYearSaveClick,
}=useYearedit()


useEffect(() => {
  // Update localStorage whenever balance changes
  localStorage.setItem('balance', balance);
}, [balance]);

  useEffect(() => {
    tofindtotalsum()
  }, [Expenselist, newamount,weeklist,yearlist  ]);




  const tofindtotalsum = () => {
    const finalsum = Expenselist.amount.reduce((num, currentValue) => num + parseInt(currentValue), 0);
    const weeksum=weeklist.dayamount.reduce((num,currentValue)=>num+parseInt(currentValue),0);
    const yearsum=yearlist.MounthAMount.reduce((num,currentValue)=>num+parseInt(currentValue),0);
    setsum(finalsum);
    setweelsum(weeksum);
    setyearsum(yearsum);
  }

  const addingnewexpences = () => {
    if (newitem.trim() !== "" && newamount !== "") {
      // Update expense list with new item and amount
      setExpenselist(prevState => ({
        name: [...prevState.name, newitem],
        amount: [...prevState.amount, newamount],
      }));
  
      // Update balance
      setBalance(prevBalance => prevBalance - parseInt(newamount));
  
      // Clear input fields
      setnewamount("");
      setnewitem("");
  
      // Optionally, update local storage with updated expenselist
      const updatedList = {
        name: [...expenselist.name, newitem],
        amount: [...expenselist.amount, newamount],
      };
      localStorage.setItem('expenselist', JSON.stringify(updatedList));
    } else {
      alert("Invalid input");
    }
  };
  

  const updatingaddedamount=()=>{
    const addedamount=parseInt(newaddingamount,10);
    if(!isNaN(addedamount)) {
    setBalance((prevbalance)=>prevbalance+addedamount);
      setaddamount(false);
      setnewaddingamount('')
    }
  }

  return (
    <div >
     <div >
     <div >
        <h1 className="font-bold text-2xl text-center ">Expense Tracker</h1>
      </div>
        {
         addamount ? (
         <div className="text-end font-bold">
           <input type="number" className="mx-5 " value={newaddingamount} onChange={(evt)=>setnewaddingamount(evt.target.value)} placeholder='Enter the amount' id="" />
           <button className="button-3 mx-5" role="button" onClick={(evt)=>updatingaddedamount(evt)}>Add </button>
         </div>
         ):(
          <div className="text-end font-bold">
          Acount Balance:- {balance}
          <button className="button-3 mx-5" role="button" onClick={(evt)=>setaddamount(true)}>Add Amount</button>
        </div>
         )
        }
     </div>

      <div className="flex justify-center mb-5">
        <div className="flex gap-2">
          <input
            type="text"
            className="border-2 border-blue-300 rounded-md p-2 capitalize"
            placeholder="Enter Expense"
            value={newitem}
            onChange={(evt) => setnewitem(evt.target.value)}
          />
          <input
            type="number"
            className="border-2 border-blue-300 rounded-md p-2"
            placeholder="Enter Amount"
            value={newamount}
            onChange={(evt) => setnewamount(evt.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded-md p-2"
            onClick={addingnewexpences}
          >
            Add
          </button>
        </div>
      </div>
      <div>
      <div>
    <table className="w-full">
        <caption class="no-wrap font-bold mb-1">Today's Expenses</caption>
        <thead className="h-10" >
          <tr className="bg-blue-500">
            <th>Expense name </th>
            <th>Expense cost  </th>
            
          </tr>
        </thead>
        <tbody>
            {
              Expenselist.name.map((item,index)=>(
                <tr key={index} className="text-center border-b border-gray-200 h-14 ">
                <td className="capitalize">{item}</td>
                <td>{Expenselist.amount[index]}</td>
                
              </tr>
              ))
            }
          </tbody>
    </table>

</div>

      </div>
      


      <div className="text-center font-bold text-xl">
        Total: {sum}
      </div>
      <br />


      <div className="h-1 w-full bg-slate-500"></div>

      <br />



      <div className="flex justify-around">
      <div className=" week  mt-0">
        <table className="bg-white w-80">
          <caption className="text-center font-bold">This week Expense's</caption>
          <thead>
            <tr className="bg-blue-400 h-10">
              <th>Day</th>
              <th>Expnses</th>
              <th>Edit</th>
            </tr>

          </thead>
          <tbody> 
            {
              weeklist.day.map((day,index)=>(
                <tr key={index} className="text-center border-b border-gray-200">
                <td className="py-3 px-4">{day}</td>
                <td className="py-3 px-4">
                  {editWeekIndex === index ? (
                    <input
                      type="number"
                      value={newWeekAmount}
                      onChange={handleWeekInputChange}
                      className="border rounded py-1 px-2"
                    />
                  ) : (
                    weeklist.dayamount[index]
                  )}
                </td>
                <td className="py-3 px-4">
                  {editWeekIndex === index ? (
                    <button
                      className="button-6"
                      onClick={() => handleWeekSaveClick(index)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="button-6"
                      onClick={() => handleWeekEditClick(index)}
                    >
                      edit
                    </button>
                  )}
                </td>
              </tr>
              ))
            }
          </tbody>
        </table>
        <div>
        <h1 className=" font-bold text-center">Total:-{weeksum}</h1>
      </div>
      </div>



      <div className="font-bold">
        This Mounth
        <div className="w-24 h-24 rounded-full border-8 text-center border-red-500 mt-40 flex items-center justify-center">
        {
          mounthedit?(
            <input type="number" placeholder='enter the amount' id="" onChange={handelmountinput} />
          ):(
            mounthsum
          )
        }
        </div>
        <br />
        <>
        {
          mounthedit?(
            <button class="button-6" role="button" onClick={handelMounthsaveclick}>save</button>
          ):(
            <button class="button-6" role="button" onClick={handelMountheditclick}>edit</button>
          )
        }
        </>
      </div>







      <div>
        <table className="w-1/3">
          <caption className="font-bold">This Year  </caption>
          <thead>
            <tr className="bg-blue-500 h-10">
              <th>Mounth </th>
              <th>Expence's </th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
          {yearlist.Mounth.map((month, index) => (
            <tr key={index} className="text-center border-b border-gray-200">
              <td className="py-3 px-4">{month}</td>
              <td className="py-3 px-4">
                {editYearIndex === index ? (
                  <input
                    type="number"
                    value={newYearAmount}
                    onChange={handleYearInputChange}
                    className="border rounded py-1 px-2"
                  />
                ) : (
                  yearlist.MounthAMount[index]
                )}
              </td>
              <td className="py-3 px-4">
                {editYearIndex === index ? (
                  <button
                    className="button-6"
                    onClick={() => handleYearSaveClick(index)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="button-6"
                    onClick={() => handleYearEditClick(index)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        </table>
        <div className="font-bold text-center">
          Total :-{yearsum}
        </div>
      </div>
      </div>
      <div className="h-1 w-full bg-slate-500"></div>
    </div>
  );
}

export default Expensetracker
