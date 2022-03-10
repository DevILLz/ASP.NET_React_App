import React from 'react';
import {Duck} from './demo';

interface Props{
    duck : Duck;
}

export default function DuckItem({duck} : Props){
    return (
        <div key={duck.Name}>
            <span>{duck.Name}  </span>
            <button onClick={() => (duck.makeASound())}>Make a sound!</button>
        </div>
    )
}