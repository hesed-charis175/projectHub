import { useEffect, useRef, useState } from "react";
import ImageSlider from "../features/ImageSlider.jsx";
import { ArrowRight, Sparkles } from "lucide-react";
// particles replaced by a local canvas implementation

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const DPR = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
        // increased particle count and connection distance for denser mesh
        const PARTICLE_COUNT = 220; // tweak this to increase/decrease particles
        const CONNECT_DISTANCE = 180; // how close particles need to be to draw a line
        let width = 0, height = 0;
        let animationId;


        function resize() {
            width = canvas.width = canvas.offsetWidth * DPR;
            height = canvas.height = canvas.offsetHeight * DPR;
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        }

        // Particles operate over the full canvas; polygon clipping removed.
        const particles = [];

        // return a random point anywhere inside the canvas bounding box
        function randomPointInCanvas() {
            const bbox = { minX: 0, minY: 0, maxX: canvas.offsetWidth, maxY: canvas.offsetHeight };
            const x = Math.random() * (bbox.maxX - bbox.minX) + bbox.minX;
            const y = Math.random() * (bbox.maxY - bbox.minY) + bbox.minY;
            return { x, y };
        }

        function initParticles() {
            particles.length = 0;
            let attempts = 0;
            while (particles.length < PARTICLE_COUNT && attempts < PARTICLE_COUNT * 8) {
                const pt = randomPointInCanvas();
                const angle = Math.random() * Math.PI * 2;
                const speed = 0.2 + Math.random() * 0.8;
                particles.push({ x: pt.x, y: pt.y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, r: 0.6 + Math.random() * 2.4, alpha: 0.20 + Math.random() * 0.40 });
                attempts++;
            }
        }


        function animate() {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx * (0.8 + Math.random() * 0.6);
                p.y += p.vy * (0.8 + Math.random() * 0.6);
                // respawn anywhere on canvas if particle leaves bounds
                if (p.x < 0 || p.x > canvas.offsetWidth || p.y < 0 || p.y > canvas.offsetHeight) {
                    const newPt = randomPointInCanvas();
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 0.2 + Math.random() * 0.8;
                    p.x = newPt.x;
                    p.y = newPt.y;
                    p.vx = Math.cos(angle) * speed;
                    p.vy = Math.sin(angle) * speed;
                }
                ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < CONNECT_DISTANCE) {
                        const alpha = 0.30 * (1 - d / CONNECT_DISTANCE);
                        ctx.strokeStyle = `rgba(156, 236, 255, ${alpha})`;
                        ctx.lineWidth = 1.0;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            // no clipping restore needed when not using polygon mask
            animationId = requestAnimationFrame(animate);
        }

        const onResize = () => {
            resize();
            initParticles();
        };

        resize();
        // particles will fill the whole canvas; no polygon mask used
        initParticles();
        animate();

        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    

    const parallaxX = typeof window !== 'undefined' ? (mousePosition.x - (window.innerWidth / 2)) * 0.01 : 0;
    const parallaxY = typeof window !== 'undefined' ? (mousePosition.y - (window.innerHeight / 2)) * 0.01 : 0;

        return (
            <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <canvas ref={canvasRef} className="w-full h-full block" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />
                </div>

                <div className="absolute inset-0 z-10 opacity-30" style={{ background: `radial-gradient(900px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.30), transparent 40%)` }} />
        <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute lg:bottom-[-75px] lg:right-[-75px] bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-48 sm:h-96 lg:h-150 lg:w-150 bg-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto text-center relative w-full z-20">
            <div className="max-w-7xl mx-auto flex flex-col">
                <div className="relative order-2 w-full mb-75 px-0">
                    <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4 sm:mb-6 animate-in slide-in-from-bottom duration-700">
                        <Sparkles className="w-4 h-4 text-blue-400"></Sparkles>
                        <span>Introducing ProjectHub</span>
                    </div>
                    <h1 className="text-5xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-3 sm:mb-4 animate-in slide-in-from-bottom duration-700 delay-100 leading-tight">
                        <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent block mb-1 sm:mb-2">Plan Better</span>
                        <span className="bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent block mb-1 sm:mb-2">Ship Fast</span>
                        <span className="bg-gradient-to-b from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent block mb-1 sm:mb-2">With Project<span className="bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">Hub</span></span>
                    </h1>

                    <p className="text-md sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto lg:my-0 mb-4 sm:mb-4 animate-in slide-in-from-bottom duration-700 delay-200 leading-relaxed">
                        ProjectHub helps you plan, track, and deliver projects with clarity.
                        Create projects, visualize tasks, monitor progress, and invite collaborators when needed.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center mt-8 gap-3 sm:gap-4 mb-2 sm:mb-4 animate-in slide-in-from-bottom duration-700 delay-300">
                        <button className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-b from-blue-600 to-blue-400 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-102 flex items-center justify-center space-x-2">
                            <span>Get Started</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"></ArrowRight>
                        </button>

                    </div>
                </div>
                <div className="relative order-2 w-full min-h-[200px]">
                    <ImageSlider/>
                </div>
            </div>
        </div>

      </section>
    );
}