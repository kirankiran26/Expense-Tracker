import React, { useState, useEffect } from "react";

export const useYearedit = () => {
  const yearExpenses = {
    Mounth: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    MounthAMount: [0,0,0,0,0,0,0,0,0,0,0,0],
  };

  const [yearlist, setyearlist] = useState(yearExpenses);
  const [editYearIndex, seteditYearIndex] = useState(null);
  const [newYearAmount, setnewYearAmount] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('yearExpenses');
    if (savedData) {
      setyearlist(JSON.parse(savedData));
    }
  }, []);

  const handleYearEditClick = (index) => {
    seteditYearIndex(index);
    setnewYearAmount(yearlist.MounthAMount[index]);
  };

  const handleYearInputChange = (e) => {
    setnewYearAmount(e.target.value);
  };

  const handleYearSaveClick = (index) => {
    const updatedList = { ...yearlist };
    updatedList.MounthAMount[index] = Number(newYearAmount); // Update the amount
    setyearlist(updatedList);
    localStorage.setItem('yearExpenses', JSON.stringify(updatedList)); // Save updated data to localStorage
    seteditYearIndex(null); // Reset the edit index
  };

  return {
    yearlist,
    editYearIndex,
    newYearAmount,
    handleYearEditClick,
    handleYearInputChange,
    handleYearSaveClick,
  };
};
