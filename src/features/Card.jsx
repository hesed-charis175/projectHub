import React from 'react';

const Card = ({ path }) => {
    return (
    <div className="relative bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-2 shadow-[-11px_-15px_80px_20px_rgba(60,176,193,0.25)]">
        <img src={path} alt="" className="w-250 h-auto position-relative "/>
    </div>
            );
}

export default Card;


