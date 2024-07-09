import React, { useEffect, useState } from 'react'
import './editbutton.css'
const Expensetracker = () => {
  const initiallist = {
    name: ["Breakfast ", "Lunch", "Dinner"],
    amount: [30, 50, 100],
  }
  const weekExpenses={
    day:["Sunday","Monday","Wednesday","Thursday","Friday","Saturday"],
    dayamount:[1,2,3,4,5,6,7],   
  }
  const yearExpenses={
    Mounth:["January","February","March","April","May","June","July","August","September","October","November","December"],
    MounthAMount:[1,2,3,4,5,6,7,8,9,10,11,12],
  }
  const [newitem, setnewitem] = useState("");
  const [newamount, setnewamount] = useState("");
  const [Expenselist, setExpenselist] = useState(initiallist);
  const [sum, setsum] = useState(0);
  const [weeksum,setweelsum]=useState(0);
  const [yearsum,setyearsum]=useState(0);
  const [addamount,setaddamount]=useState(false);
  const [newaddingamount,setnewaddingamount]=useState('');
  const [balance, setBalance] = useState(() => {
    // Retrieve the balance from localStorage, or set it to 100 if not found
    const savedBalance = localStorage.getItem('balance');
    return savedBalance !== null ? parseInt(savedBalance, 10) : 100;
});


useEffect(() => {
  // Update localStorage whenever balance changes
  localStorage.setItem('balance', balance);
}, [balance]);

  useEffect(() => {
    tofindtotalsum()
  }, [Expenselist, newamount]);




  const tofindtotalsum = () => {
    const finalsum = Expenselist.amount.reduce((num, currentValue) => num + parseInt(currentValue), 0);
    const weeksum=weekExpenses.dayamount.reduce((num,currentValue)=>num+parseInt(currentValue),0);
    const yearsum=yearExpenses.MounthAMount.reduce((num,currentValue)=>num+parseInt(currentValue),0);
    setsum(finalsum);
    setweelsum(weeksum);
    setyearsum(yearsum);
  }

  const addingnewexpences = () => {
    if (newitem.trim() !== "" && newamount !== "") {
      setExpenselist(prevstate => ({
        name: [...prevstate.name, newitem],
        amount: [...prevstate.amount, newamount],
      }));
      setnewamount("");
      setnewitem("");
      setbalance(balance-parseInt(newamount))
    } else {
      alert("Invalid input");
    }
  }

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
            onClick={addingnewexpences  }
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
          <tr className="bg-blue-500 ">
            <th>Expense name </th>
            <th>Expense cost  </th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
            {
              Expenselist.name.map((item,index)=>(
                <tr key={index} className="text-center border-b border-gray-200 ">
                <td className="capitalize">{item}</td>
                <td>{Expenselist.amount[index]}</td>
                <td>
                <button class="button-6" role="button">edit</button>
                </td>
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
              weekExpenses.day.map((day,index)=>(
                <tr key={index} className="text-center border-b border-gray-200 ">
                  <td>{day}</td>
                  <td>{weekExpenses.dayamount[index]}</td>
                  <td>
                  <button class="button-6" role="button">edit</button>
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
        <div className="w-24 h-24 rounded-full border-8 text-center border-red-500 mt-40 flex items-center justify-center">100</div>

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
            {
              yearExpenses.Mounth.map((mounth,index)=>(
                <tr key={index} className="text-center border-b border-gray-200 ">
                  <td>{mounth}</td>
                  <td>{yearExpenses.MounthAMount[index]}</td>
                  <td>
                  <button class="button-6" role="button">edit</button>
                  </td>
                </tr>
              ))
            }
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
