import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Lock, User, CreditCard } from 'lucide-react';

export default function Payment() {

    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    
    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        }
    }, [])

    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [cardholder, setCardholder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [isFlipped, setIsFlipped] = useState(false);

        function formatCardNumber(value){
                return value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim();
        }

        // compute tilt based on mouse position relative to viewport center
        const tilt = useMemo(() => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const dx = (mousePosition.x - cx) / cx; // -1 .. 1
            const dy = (mousePosition.y - cy) / cy;
            const ry = Math.max(Math.min(dx * 6, 8), -8); // rotateY
            const rx = Math.max(Math.min(-dy * 6, 8), -8); // rotateX
            return { rx, ry };
        }, [mousePosition]);

        // build array of 16 slots for card number display
        const cardDigits = useMemo(() => {
            const digits = (cardNumber || '').slice(0,16).split('');
            const slots = Array.from({length:16}, (_,i) => digits[i] || null);
            return slots;
        }, [cardNumber]);

    return (
        <div className="relative min-h-screen flex items-center justify-center" style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.05), transparent 80%)`
        }}>
            <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute lg:bottom-[-75px] lg:right-[-75px] bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-48 sm:h-96 lg:h-150 lg:w-150 bg-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
            

                        <div className="w-full max-w-6xl bg-slate-900/95 rounded-xl p-8 shadow-lg flex items-center justify-center gap-8" style={{
                background: `radial-gradient(800px circle at 10px 10px, rgba(59, 130, 246, 0.27), rgba(15, 23, 42, 0.85) 40%)`
            }}>
                                                                {/* Visual card - only show when payment method is credit */}
                                                                <div
                                                                    id="visual"
                                                                    className="w-120 h-64 rounded-xl p-4 bg-white/6 backdrop-blur-xl border border-white/10 flex flex-col justify-between shadow-lg"
                                                                    style={paymentMethod === 'credit' ? {
                                                                        transformStyle: 'preserve-3d',
                                                                        transition: 'transform 400ms cubic-bezier(.2,.8,.2,1)',
                                                                        transform: `perspective(900px) rotateX(${3*tilt.rx}deg) rotateY(${3*tilt.ry + (isFlipped ? 180 : 0)}deg)`
                                                                    } : undefined}
                                                                >
                                                                    {paymentMethod === 'credit' && (
                                                                            <div className="card-outer h-full w-full relative" onClick={() => setIsFlipped(s => !s)}>
                                                                                <div className="card-inner absolute inset-0" style={{
                                                                                        transformStyle: 'preserve-3d',
                                                                                        transition: 'transform 400ms cubic-bezier(.2,.8,.2,1)',
                                                                                        transform: `rotateY(-${isFlipped ? 180 : 0}deg)`
                                                                                    }}
                                                                                >
                                                                                    {/* front */}
                                                                                    <div className="card-front absolute inset-0 p-2 flex h-full flex-col" style={{backfaceVisibility: 'hidden'}}>
                                                                                        <div className='flex justify-end items-center gap-3'>
                                                                                                <img src="/visa.png" alt="visa" className='w-16 h-10 object-contain' />
                                                                                                <img src="/creditCard.png" alt="mastercard" className='w-12 h-10 object-contain' />
                                                                                        </div>
                                                                                        <div className='flex flex-col justify-between h-full'>
                                                                                            <div>
                                                                                                <div className="text-sm text-slate-300">Card</div>
                                                                                                <div className="mt-2 flex gap-6 items-center h-5">
                                                                                                    {Array.from({length:4}).map((_,g)=> (
                                                                                                        <div key={g} className="flex gap-2 items-center">
                                                                                                            {cardDigits.slice(g*4, g*4+4).map((d, i) => (
                                                                                                                d ? (
                                                                                                                    <div key={i} className="w-3 text-lg font-medium text-white text-center">{d}</div>
                                                                                                                ) : (
                                                                                                                    <div key={i} className="w-3 h-3 rounded-full bg-slate-600/80" />
                                                                                                                )
                                                                                                            ))}
                                                                                                        </div>
                                                                                                    ))}
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="flex justify-between items-end">
                                                                                                <div>
                                                                                                    <div className="text-xs text-slate-400">Cardholder</div>
                                                                                                    <div className="text-sm text-white font-medium">{cardholder || 'FULL NAME'}</div>
                                                                                                </div>
                                                                                                <div className="text-right">
                                                                                                    <div className="text-xs text-slate-400">Expires</div>
                                                                                                    <div className="text-sm text-white font-medium">{(expiryMonth || 'MM') + '/' + (expiryYear || 'YY')}</div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    {/* back */}
                                                                                    <div className="card-back absolute inset-0 p-4 rounded-lg" style={{transform: `scaleZ(-1) scaleX(-1) scaleY(-1) rotateZ(180deg)`, backfaceVisibility: 'hidden'}}>
                                                                                        <div className="h-10 bg-slate-900 rounded-sm mb-4" />
                                                                                        <div className="mt-6 flex justify-end">
                                                                                            <div className="w-40 bg-slate-700 rounded px-2 py-1 text-slate-200 text-right">{cvv || '•••'}</div>
                                                                                        </div>
                                                                                        {/* <div className="absolute bottom-4 left-4 text-xs text-slate-400">Cardholder</div> */}
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                    )}
                                                                        </div>

                                <div className="min-w-70 flex-1 flex flex-col gap-4" id="form">
                                        <div className="flex items-center justify-start gap-6 w-full mb-6">
                        {/* <p className="text-3xl font-bold text-center mb-2">Payment Method</p> */}
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 whitespace-nowrap">
                                <input type="radio" id="credit" name="payment" value="credit" checked={paymentMethod==='credit'} onChange={()=>setPaymentMethod('credit')} className="w-4 h-4"/>
                                <span className="text-lg">Credit Card</span>
                            </label>
                            <label className="flex items-center gap-2 whitespace-nowrap">
                                <input type="radio" name="payment" value="paypal" checked={paymentMethod==='paypal'} onChange={()=>setPaymentMethod('paypal')} className="w-4 h-4"/>
                                <span className="text-lg">PayPal</span>
                            </label>
                            <label className="flex items-center gap-2 whitespace-nowrap">
                                <input type="radio" name="payment" value="monetbill" checked={paymentMethod==='monetbill'} onChange={()=>setPaymentMethod('monetbill')} className="w-4 h-4"/>
                                <span className="text-lg">MonetBill</span>
                            </label>
                        </div>
                    </div>

                    <form className="space-y-4 w-full">
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                            <input
                                required
                                value={cardholder}
                                onChange={e=>setCardholder(e.target.value)}
                                type="text"
                                placeholder="Cardholder Name"
                                className="w-full pl-11 px-4 py-3 rounded-full bg-slate-700/60 placeholder-slate-300 outline-none text-white"
                            />
                        </div>

                        <div className="relative">
                            <CreditCard className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                            <input
                                required
                                value={formatCardNumber(cardNumber)}
                                onChange={e=>setCardNumber(e.target.value.replace(/\D/g,'').slice(0,16))}
                                type="text"
                                inputMode="numeric"
                                placeholder="Card Number"
                                className="w-full pl-11 px-4 py-3 rounded-full bg-slate-700/60 placeholder-slate-300 outline-none text-white"
                            />
                        </div>

                        <div className="flex gap-6 items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-slate-400 w-5 h-5" />
                                    <label htmlFor="expiry" className="text-sm text-slate-200 whitespace-nowrap">Expiry Date (MM / YY)</label>
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                    <input
                                        required
                                        value={expiryMonth}
                                        onChange={e=>setExpiryMonth(e.target.value.replace(/\D/g,'').slice(0,2))}
                                        type="text"
                                        placeholder="MM"
                                        className="w-20 px-3 py-2 rounded-lg bg-slate-700/60 placeholder-slate-300 outline-none text-white text-center"
                                    />
                                    <span className="text-slate-300">/</span>
                                    <input
                                        required
                                        value={expiryYear}
                                        onChange={e=>setExpiryYear(e.target.value.replace(/\D/g,'').slice(0,2))}
                                        type="text"
                                        placeholder="YY"
                                        className="w-20 px-3 py-2 rounded-lg bg-slate-700/60 placeholder-slate-300 outline-none text-white text-center"
                                    />
                                </div>
                            </div>

                            <div className="w-1/3">
                                <div className="flex items-center gap-3">
                                    <Lock className="text-slate-400 w-5 h-5" />
                                    <label className="text-sm text-slate-200 whitespace-nowrap">CVV</label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        required
                                        value={cvv}
                                        onChange={e=>setCvv(e.target.value.replace(/\D/g,'').slice(0,4))}
                                        type="text"
                                        placeholder="123"
                                        inputMode="numeric"
                                        className="w-full px-4 py-2 rounded-lg bg-slate-700/60 placeholder-slate-300 outline-none text-white text-center"
                                    />
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-2 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full font-semibold">Pay Now</button>

                    </form>
                </div>
            </div>
        </div>
    );
}