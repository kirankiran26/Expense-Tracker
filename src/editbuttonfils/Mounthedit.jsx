import { useState } from "react";

export const useMounthedit=()=>{
    const [mounthsum,setmounthsum]=useState(1000);
    const [mounthedit,setmounthedit]=useState(false);
    const [newmounthamount,setnewmounthamount]=useState('');
    const handelmountinput=(evt)=>{
        setnewmounthamount(evt.target.value);

    }
    const handelMountheditclick=()=>{
        setmounthedit(true)
    }

    const handelMounthsaveclick=()=>{
        setmounthsum(newmounthamount);
        setmounthedit(false);
    }

    return{
        mounthsum,
        mounthedit,
        newmounthamount,
        handelMountheditclick,
        handelMounthsaveclick,
        handelmountinput,
    }
}