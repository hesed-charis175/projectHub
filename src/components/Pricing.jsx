import { section } from "framer-motion/client"; 

const plans = [
    {
        name: 'Starter',
        price: '29.99',
        description: 'Ideal for individuals starting their project management journey.',
        features: [
            'Up to 5 projects',
            '20 tasks per project',
            'Solo Projects',
            'Basic Analytics'
        ], mostPopular: false
    }, 
    {
        name: 'Professional',
        price: '59.99',
        description: 'Perfect for growing teams that need advanced features and collaboration tools.',
        features: [
            'Up to 50 projects',
            '200 tasks per project',
            'Team Collaboration',
            'Advanced Analytics',
            'Live Meetings',
            'Library for centralized up-to-date resources'
        ], mostPopular: true
    },

    {
        name: 'Enterprise',
        price: '119.99',
        description: 'Designed for large organizations requiring comprehensive project management solutions.',
        features: [
            'Unlimited projects',
            'Unlimited tasks',
            'Advanced Analytics',
            'Live Meetings',
            'Library for centralized up-to-date resources',
        ], mostPopular: false
    }
]

export default function Pricing() {
    return (
        <section id="pricing" className="py-16 sm:py-20 px-10 sm:px-6 lg:px-8 relative">
            <style>{`
                @keyframes sheenMove {
                  0% { transform: translateX(-40%); }
                  50% { transform: translateX(20%); }
                  100% { transform: translateX(140%); }
                }
            `}</style>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                    <div >
                        <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold" >
                            <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                                Pricing Plans
                            </span>
                        </h2>
                        <p className="text-gray-400 text-base text-xl sm:text-lg max-w-2xl mx-auto">Choose the perfect plan for your needs. All plans include a 14-day free trial</p>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-8">
                    {plans.map((plan, key) => (
                            <div key={key} className={`relative overflow-hidden rounded-xl p-6 sm:p-8 flex flex-col transition-transform hover:border-blue-500/20 hover:bg-cyan-500/20 transition-all duration-300 hover:shadow-[0px_0px_6px_0px_rgba(255,_255,_255,_0.3)] ${plan.mostPopular ? 'bg-gradient-to-br from-white/8 via-white/6 to-transparent border border-blue-400/20 shadow-lg shadow-blue-600/20' : 'bg-gradient-to-br from-white/8 via-white/6 to-transparent backdrop-blur-md border border-white/10 shadow-md'} ${plan.mostPopular ? 'scale-110' : 'scale-100'}`}>
                            {/* brighter animated sheen overlay */}
                            <div className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden">
                                <div style={{
                                    position: 'absolute',
                                    right: '-30%',
                                    top: '-0%',
                                    width: '120%',
                                    height: '80%',
                                    background: 'linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.14) 40%, rgba(255,255,255,0.0) 75%)',
                                    transform: 'rotate(18deg)',
                                    filter: 'blur(18px)',
                                    opacity: 0.95,
                                    animation: 'sheenMove 3.2s linear infinite'
                                }} />
                                <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)' }} />
                            </div>

                            {plan.mostPopular && (
                                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg z-10">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
                            <p className="text-gray-400 mb-6 flex-grow">{plan.description}</p>
                            <div className="text-4xl font-bold mb-6">${plan.price}<span className="text-base font-normal text-gray-400">/month</span></div>
                            <ul className="mb-6 space-y-3">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center">
                                        <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-full px-4 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${plan.mostPopular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-700 hover:bg-slate-600 text-gray-200'}`}>
                                Choose {plan.name}
                            </button>
                        </div>     
                    ))}

                </div>
            </div>
        </section>
    );
}