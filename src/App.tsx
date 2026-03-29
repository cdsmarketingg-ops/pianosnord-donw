import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Timer, Zap, ShieldCheck } from 'lucide-react';

declare global {
  interface Window {
    checkoutElements: any;
  }
}

export default function App() {
  const [timeLeft, setTimeLeft] = useState(764); // 12:44 in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Load Hotmart script
    const script = document.createElement('script');
    script.src = 'https://checkout.hotmart.com/lib/hotmart-checkout-elements.js';
    script.async = true;
    script.onload = () => {
      if (window.checkoutElements) {
        window.checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel');
      }
    };
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Top Banner */}
      <div className="w-full bg-brand-red py-2 px-4 text-center text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
        <span className="inline-block w-4 h-4 rounded-full border border-white flex items-center justify-center text-[8px]">!</span>
        PASO FINAL: NO CIERRES NI ACTUALICES ESTA PÁGINA. TU PEDIDO ESTÁ SIENDO PROCESADO.
      </div>
      <main className="max-w-4xl w-full px-4 md:px-6 py-8 md:py-12 flex flex-col items-center">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-brand-orange text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-3 md:mb-4">ESPERA UN MOMENTO...</p>
          <h1 className="text-3xl md:text-6xl font-serif italic font-bold mb-2 leading-tight">
            ¡No te vayas con las manos vacías!
          </h1>
          <h2 className="text-xl md:text-5xl font-bold uppercase tracking-tight">
            ESTA ES TU ÚLTIMA OPORTUNIDAD
          </h2>
          <p className="text-gray-400 mt-4 md:mt-6 max-w-2xl mx-auto text-xs md:text-base px-2">
            Entendemos que tal vez el preço anterior era un poco alto para ti ahora. 
            Pero no queremos que pierdas la oportunidad de transformar tus producciones con el mejor pack de sonidos del mercado.
          </p>
        </motion.div>

        {/* Pricing Section - MOVED UP */}
        <div className="text-center mb-10 md:mb-12 w-full">
          <p className="text-gray-500 text-xs md:text-sm mb-2">Inversión única y exclusiva:</p>
          <div className="relative inline-block scale-90 md:scale-100">
            <span className="text-xl md:text-2xl text-gray-600 line-through absolute -top-5 md:-top-6 left-1/2 -translate-x-1/2">$24.00</span>
            <div className="text-6xl md:text-8xl font-bold text-brand-orange flex items-start justify-center">
              <span className="text-2xl md:text-3xl mt-3 md:mt-4">$</span>
              <span>14</span>
              <span className="text-3xl md:text-4xl mt-3 md:mt-4">.90</span>
            </div>
          </div>
          <p className="text-brand-orange text-[10px] md:text-xs font-bold uppercase tracking-widest mt-4 animate-pulse">
            ¡DESCUENTO DE ÚLTIMA HORA APLICADO!
          </p>

          {/* Urgency Indicators */}
          <div className="max-w-md mx-auto mt-8 md:mt-12 px-4">
            <div className="flex justify-between text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-2">
              <span className="text-gray-500">Últimos cupos disponibles</span>
              <span className="text-brand-orange">92% Completado</span>
            </div>
            <div className="w-full h-1.5 md:h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '92%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-brand-orange to-orange-400"
              />
            </div>
            
            <div className="flex justify-center gap-8 md:gap-12 mt-6 md:mt-8">
              <div className="text-center">
                <Timer size={18} className="text-brand-orange mx-auto mb-1 md:mb-2" />
                <p className="text-lg md:text-xl font-mono font-bold">{formatTime(timeLeft)}</p>
                <p className="text-[7px] md:text-[8px] text-gray-500 uppercase tracking-widest">Tiempo restante</p>
              </div>
              <div className="text-center">
                <Zap size={18} className="text-brand-orange mx-auto mb-1 md:mb-2" />
                <p className="text-lg md:text-xl font-bold">1</p>
                <p className="text-[7px] md:text-[8px] text-gray-500 uppercase tracking-widest">Cupos libres</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hotmart Widget Container - MOVED UP */}
        <div className="w-full max-w-2xl bg-zinc-900 rounded-xl md:rounded-2xl border border-zinc-800 p-0.5 md:p-1 mb-12 md:mb-20 overflow-hidden">
          <div id="hotmart-sales-funnel" className="min-h-[350px] md:min-h-[400px] flex items-center justify-center text-zinc-700 text-xs md:text-sm italic">
            Cargando checkout seguro...
          </div>
        </div>

        {/* Product Card - MOVED DOWN */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full grid md:grid-cols-2 bg-zinc-900/50 rounded-2xl md:rounded-3xl border border-zinc-800 overflow-hidden mb-12 md:mb-16"
        >
          <div className="p-6 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-brand-orange mb-3 md:mb-4">
              <Zap size={14} md:size={16} />
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">NORD STAGE 4 COLLECTION</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-1">Pack de Pianos</h3>
            <h4 className="text-lg md:text-xl text-gray-400 mb-4 md:mb-6 font-serif italic">Nord Stage 4</h4>
            <p className="text-gray-400 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed">
              Lleva el realismo y la potencia del Nord Stage 4 a tu setup. Timbres de piano Hammer Action 80 muestreados con la máxima fidelidad para tus presentaciones en vivo y grabaciones.
            </p>
            <ul className="space-y-2.5 md:space-y-3">
              {[
                'Pianos Hammer Action 80',
                'Capas y Texturas Cinematográficas',
                'Optimizado para latencia cero'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[11px] md:text-xs text-gray-300">
                  <CheckCircle2 size={12} md:size={14} className="text-brand-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-56 md:h-auto bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center p-4 md:p-8">
            <img 
              src="https://eliabcamposteclas.com/wp-content/uploads/2026/03/ChatGPT-Image-28-de-mar.-de-2026-20_10_14.jpg" 
              alt="Pack de Pianos" 
              className="w-full h-full object-cover rounded-lg md:rounded-xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </motion.div>

        {/* Guarantee Section */}
        <div className="w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center bg-zinc-900/30 p-6 md:p-16 rounded-3xl md:rounded-[40px] border border-zinc-800/50">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-orange/20 blur-[80px] rounded-full"></div>
            <div className="relative aspect-square max-w-[300px] mx-auto flex items-center justify-center">
              <div className="w-full h-full border-4 border-brand-orange/30 rounded-full flex items-center justify-center p-4">
                <div className="w-full h-full border-2 border-brand-orange/50 border-dashed rounded-full flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange mb-1">Garantía</span>
                  <span className="text-6xl font-bold leading-none">30</span>
                  <span className="text-xl font-bold uppercase tracking-tighter mb-2">Días</span>
                  <div className="bg-brand-orange text-black px-2 py-1 rounded text-[8px] font-bold uppercase">Reembolso Total</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-4">Garantía 100% <br /><span className="text-brand-orange">Libre de Riesgo</span></h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Prueba el Pack de Timbres durante 30 días y si por alguna razón sientes que no es para ti, te devolveremos el 100% de lo que invertiste. Sin preguntas, sin complicaciones.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-zinc-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-500">
                <span className="text-white font-bold">+1,200 músicos</span> ya están usando estos sonidos.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-12 border-t border-zinc-900 text-center">
        <p className="text-[10px] text-gray-600 uppercase tracking-widest">
          © {new Date().getFullYear()} Eliab Campos Teclas. Todos los derechos reservados.
        </p>
      </footer>

      {/* Floating Guarantee Icon */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="w-14 h-14 bg-brand-orange rounded-2xl shadow-[0_10px_30px_rgba(242,125,38,0.3)] flex items-center justify-center text-black">
          <ShieldCheck size={28} />
        </div>
      </div>
    </div>
  );
}
