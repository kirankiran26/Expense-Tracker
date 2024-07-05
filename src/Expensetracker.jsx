import React, { useEffect, useState } from 'react'

const Expensetracker = () => {
  const initiallist = {
    name: ["Breakfast ", "Lunch", "Dinner"],
    amount: [30, 50, 100],
  }
  const [newitem, setnewitem] = useState("");
  const [newamount, setnewamount] = useState("");
  const [Expenselist, setExpenselist] = useState(initiallist);
  const [sum, setsum] = useState(0);

  useEffect(() => {
    tofindtotalsum()
  }, [Expenselist, newamount]);

  const tofindtotalsum = () => {
    const finalsum = Expenselist.amount.reduce((num, currentValue) => num + parseInt(currentValue), 0);
    setsum(finalsum);
  }

  const addingnewexpences = () => {
    if (newitem.trim() !== "" && newamount !== "") {
      setExpenselist(prevstate => ({
        name: [...prevstate.name, newitem],
        amount: [...prevstate.amount, newamount],
      }));
      setnewamount("");
      setnewitem("");
    } else {
      alert("Invalid input");
    }
  }

  return (
    <div className="p-5">
      <div className="text-center mb-5">
        <h1 className="font-bold text-2xl">Expense Tracker</h1>
      </div>

      <div className="flex justify-center mb-5">
        <div className="flex gap-2">
          <input
            type="text"
            className="border-2 border-blue-300 rounded-md p-2"
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

      <div className="flex justify-center mb-5">
        <table className="min-w-full bg-white">
          <caption className="text-gray-600 font-bold mb-2">Today's Expenses</caption>
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="w-1/2 py-2">Expense Name</th>
              <th className="w-1/2 py-2">Expense Amount</th>
            </tr>
          </thead>
          <tbody>
            {Expenselist.name.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2 px-4">{item}</td>
                <td className="py-2 px-4 text-center">{Expenselist.amount[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center font-bold text-xl">
        Total: {sum}
      </div>
    </div>
  );
}

export default Expensetracker
