import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Award, Users, Calendar, Shield, Target, Zap, Globe } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";

function CounterAnimation({ value, suffix = "", duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const startTime = Date.now();
          const startValue = 0;
          
          const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * value);
            
            setCount(currentCount);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [value, duration, hasAnimated]);

  return (
    <div ref={elementRef} className="text-4xl font-bold text-white mb-2">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-neutral-dark via-neutral-dark/90 to-neutral-dark text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-solar-orange/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 right-32 w-40 h-40 bg-solar-green/10 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <h1 className="text-6xl md:text-7xl font-bold mb-8">
                About <span className="bg-gradient-to-r from-solar-orange to-solar-green bg-clip-text text-transparent font-extrabold">Solar Galaxy</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Leading the renewable energy revolution with professional solar installation 
                and distribution services for over 15 years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="text-5xl font-bold text-neutral-dark mb-8">
                Powering a Sustainable Future
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                With over 15 years of experience in renewable energy, we're committed to making 
                solar energy accessible and affordable for everyone. Our team of certified 
                professionals ensures every installation meets the highest standards of quality and safety.
              </p>
              <p className="text-lg text-gray-600 mb-12">
                We've helped thousands of homeowners and businesses transition to clean, renewable 
                energy, reducing their carbon footprint while saving money on energy costs.
              </p>
              
              <div className="space-y-6">
                {[
                  "Over 2,500 successful installations",
                  "NABCEP certified installers",
                  "25-year comprehensive warranty",
                  "Zero down payment options"
                ].map((achievement, index) => (
                  <div key={index} className="flex items-center animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="bg-solar-green text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 hover-lift">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <span className="text-lg text-neutral-dark">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="glass p-8 rounded-3xl">
                <img 
                  src="https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Solar Installation Team"
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </div>
              
              {/* Floating achievement badges */}
              <div className="absolute -top-6 -left-6 glass p-4 rounded-2xl animate-float bg-white/90">
                <Award className="h-8 w-8 text-solar-orange mb-2" />
                <div className="text-sm font-semibold text-neutral-dark">Industry Leader</div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 glass p-4 rounded-2xl animate-float bg-white/90" style={{animationDelay: '2s'}}>
                <Users className="h-8 w-8 text-solar-green mb-2" />
                <div className="text-sm font-semibold text-neutral-dark">Expert Team</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gradient-to-br from-neutral-light to-white">
        <div className="container-custom">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl font-bold text-neutral-dark mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that drive everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Target className="h-16 w-16" />,
                title: "Excellence",
                description: "We strive for perfection in every installation, ensuring the highest quality standards and customer satisfaction.",
                color: "text-solar-orange"
              },
              {
                icon: <Shield className="h-16 w-16" />,
                title: "Reliability",
                description: "Our customers trust us with their energy future, and we deliver on our promises with unwavering consistency.",
                color: "text-solar-green"
              },
              {
                icon: <Globe className="h-16 w-16" />,
                title: "Sustainability",
                description: "We're committed to creating a cleaner planet for future generations through renewable energy solutions.",
                color: "text-solar-orange"
              }
            ].map((value, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg animate-slide-up" style={{animationDelay: `${index * 0.2}s`}}>
                <CardContent className="p-10 text-center">
                  <div className={`${value.color} mb-8 flex justify-center hover-glow`}>
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-dark mb-6">{value.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-neutral-dark text-white">
        <div className="container-custom">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl font-bold mb-6">
              Our Impact by the Numbers
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Making a difference in communities across the nation
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: 2500, suffix: "+", label: "Installations", icon: <Zap className="h-8 w-8" /> },
              { value: 15, suffix: "+", label: "Years Experience", icon: <Calendar className="h-8 w-8" /> },
              { value: 98, suffix: "%", label: "Customer Satisfaction", icon: <Award className="h-8 w-8" /> },
              { value: 50, suffix: "MW+", label: "Total Capacity", icon: <Globe className="h-8 w-8" /> }
            ].map((stat, index) => (
              <div key={index} className="text-center animate-scale-in hover-lift" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="glass p-8 rounded-3xl bg-white/5">
                  <div className="text-solar-orange mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <CounterAnimation value={stat.value} suffix={stat.suffix} />
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl font-bold text-neutral-dark mb-6">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Certified professionals dedicated to bringing you the best solar solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                name: "Michael Rodriguez",
                position: "Chief Executive Officer",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                description: "15+ years leading renewable energy initiatives"
              },
              {
                name: "Sarah Chen",
                position: "Head of Installation",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                description: "NABCEP certified with 2,000+ installations"
              },
              {
                name: "David Thompson",
                position: "Customer Success Manager",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                description: "Ensuring exceptional customer experiences"
              }
            ].map((member, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg animate-slide-up overflow-hidden" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold text-neutral-dark mb-2">{member.name}</h3>
                  <p className="text-solar-orange font-semibold mb-4">{member.position}</p>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-solar-orange to-solar-green text-white">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-5xl font-bold mb-8">
              Ready to Join the Solar Revolution?
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Let our expert team help you transition to clean, renewable energy today
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                className="bg-white text-solar-orange hover:bg-gray-100 text-lg px-12 py-6 hover-lift"
                asChild
              >
                <Link href="/quote">Get Free Quote</Link>
              </Button>
              
              <Button 
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white hover:text-solar-orange text-lg px-12 py-6 hover-lift"
                asChild
              >
                <Link href="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}