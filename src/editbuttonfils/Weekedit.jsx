import React, { useState, useEffect } from "react";

export const useWeekedit = () => {
  const weekExpenses = {
    day: ["Sunday", "Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayamount: [0, 0, 0, 0, 0, 0, 0],
  };

  const [weeklist, setweeklist] = useState(weekExpenses);
  const [editWeekIndex, seteditWeekIndex] = useState(null);
  const [newWeekAmount, setnewWeekAmount] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('weekExpenses');
    if (savedData) {
      setweeklist(JSON.parse(savedData));
    }
  }, []);

  const handleWeekEditClick = (index) => {
    seteditWeekIndex(index);
    setnewWeekAmount(weeklist.dayamount[index]);
  };

  const handleWeekInputChange = (e) => {
    setnewWeekAmount(e.target.value);
  };

  const handleWeekSaveClick = (index) => {
    const updatedList = { ...weeklist };
    updatedList.dayamount[index] = Number(newWeekAmount); // Update the amount
    setweeklist(updatedList);
    localStorage.setItem('weekExpenses', JSON.stringify(updatedList)); // Save updated data to localStorage
    seteditWeekIndex(null); // Reset the edit index
  };

  return {
    weeklist,
    editWeekIndex,
    newWeekAmount,
    handleWeekEditClick,
    handleWeekInputChange,
    handleWeekSaveClick,
  };
};
