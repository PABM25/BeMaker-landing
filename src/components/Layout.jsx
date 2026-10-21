import { useState } from "react";
import { Outlet } from "react-router-dom";
import { X, Send } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "¡Hola! Soy el asistente virtual de BeMaker. ¿En qué te puedo ayudar hoy?" },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { from: "user", text },
      {
        from: "bot",
        text: "Gracias por tu mensaje. Un especialista de BeMaker te contactará muy pronto.",
      },
    ]);
    setText("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`mb-4 w-[300px] sm:w-[340px] rounded-2xl bg-card text-card-foreground border border-border/10 shadow-2xl shadow-secondary/30 overflow-hidden transition-all duration-300 origin-bottom-right ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none absolute"
        }`}
      >
        <div className="bg-secondary text-secondary-foreground px-5 py-4 flex items-center gap-3">
          <img
            src="/brand/bebo-cabeza.png"
            alt=""
            className="w-10 h-10 rounded-full bg-[#010066] object-contain p-0.5"
          />
          <div>
            <h3 className="text-sm font-bold">BeMaker Bot</h3>
            <p className="text-xs text-secondary-foreground/60 flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full bg-primary"
                style={{ animation: "pulseGreen 2s infinite" }}
              />
              En línea
            </p>
          </div>
        </div>
        <div className="max-h-64 overflow-y-auto px-5 py-4 space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              style={{ animation: "fadeInMsg 0.4s ease-out both" }}
              className={`text-sm px-4 py-2.5 rounded-xl max-w-[85%] ${
                m.from === "bot"
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground ml-auto"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="flex items-center gap-2 px-4 py-3 border-t border-border/10">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 min-h-[40px] rounded-full bg-background border border-border/30 px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            type="submit"
            aria-label="Enviar"
            className="w-10 h-10 flex-shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      <button
        onClick={() => setOpen(!open)}
        aria-label="Abrir chat"
        className="group relative w-16 h-16 rounded-full bg-[#010066] border-2 border-[#ED0807] flex items-center justify-center shadow-xl shadow-[#010066]/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ml-auto"
      >
        {open ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <>
            <img
              src="/brand/bebo-cabeza.png"
              alt=""
              className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
            />
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#ED0807] border-2 border-white" />
          </>
        )}
      </button>
    </div>
  );
}

export default function Layout() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}