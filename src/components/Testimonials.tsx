
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Ricardo Almeida",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "Melhor barbearia que já frequentei. O ambiente é incrível, o atendimento é de primeira e o corte ficou perfeito. Recomendo a todos!",
    rating: 5,
    date: "15 dias atrás"
  },
  {
    id: 2,
    name: "Bruno Mendes",
    photo: "https://randomuser.me/api/portraits/men/47.jpg",
    content: "Profissionais extremamente qualificados e atenciosos. O espaço é moderno e aconchegante. Virei cliente fiel!",
    rating: 5,
    date: "1 mês atrás"
  },
  {
    id: 3,
    name: "Felipe Costa",
    photo: "https://randomuser.me/api/portraits/men/22.jpg",
    content: "Fiquei muito satisfeito com o resultado. O Carlos sabe exatamente o que está fazendo e sempre acerta no corte que eu quero.",
    rating: 4,
    date: "2 meses atrás"
  },
  {
    id: 4,
    name: "Gustavo Souza",
    photo: "https://randomuser.me/api/portraits/men/62.jpg",
    content: "Atendimento de primeira, ambiente agradável e os melhores serviços. Sem dúvida, a melhor barbearia da cidade.",
    rating: 5,
    date: "3 meses atrás"
  },
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-barbershop-darkgray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title inline-block mx-auto">O Que Dizem Nossos Clientes</h2>
          <p className="text-barbershop-textmuted mt-4 max-w-2xl mx-auto">
            A satisfação dos nossos clientes é o que nos impulsiona a melhorar continuamente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <div className="bg-barbershop-lightgray p-6 rounded-lg max-w-3xl text-center">
            <div className="flex justify-center mb-4">
              <Quote className="w-12 h-12 text-barbershop-neonblue" />
            </div>
            <p className="text-xl font-medium mb-6">
              "Nossa missão é proporcionar a melhor experiência de barbearia, 
              combinando técnicas tradicionais com tendências modernas em um ambiente 
              exclusivo para homens."
            </p>
            <div>
              <p className="font-bold text-barbershop-neonblue">Carlos Silva</p>
              <p className="text-barbershop-textmuted">Fundador & Master Barber</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: typeof testimonials[0];
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  return (
    <div 
      className={cn(
        "card animate-fade-in",
        "hover:border-barbershop-neonblue/50"
      )}
      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
    >
      <div className="flex items-center mb-4">
        <img 
          src={testimonial.photo} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full mr-4" 
        />
        <div>
          <h4 className="font-medium">{testimonial.name}</h4>
          <div className="flex mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "w-4 h-4", 
                  i < testimonial.rating 
                    ? "text-yellow-500 fill-yellow-500" 
                    : "text-gray-400"
                )} 
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-barbershop-textmuted mb-4">"{testimonial.content}"</p>
      <p className="text-sm text-barbershop-textmuted">{testimonial.date}</p>
    </div>
  );
};

export default Testimonials;
