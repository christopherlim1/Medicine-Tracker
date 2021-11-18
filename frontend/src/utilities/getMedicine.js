import React from "react";
import axios from "axios";

export const getMedicine = async (gID) => {
    let meds = [];
    await axios.get(`http://localhost:4000/v0/medicine/${gID}`)
      .then((response)=>{
        meds = response.data;
        console.log(meds);
      })
      .catch(()=>{
        console.log('Cannot get medicine list');
      });
    return meds;
  };