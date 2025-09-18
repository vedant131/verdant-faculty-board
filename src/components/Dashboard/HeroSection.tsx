import heroImage from "@/assets/eco-hero-illustration.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-success/5 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-3">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Welcome to Your
                <span className="block text-transparent bg-clip-text eco-gradient">
                  Eco-Education Hub
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Empower students with engaging eco-lessons, interactive challenges, and gamified learning experiences that make environmental education fun and impactful.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-full border border-success/20">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-success">Active Learning Environment</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-accent-foreground">Gamified Experiences</span>
              </div>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative animate-scale-in">
            <div className="relative">
              <img 
                src={heroImage}
                alt="Eco-friendly educational illustration with growing tree from book"
                className="w-full h-auto rounded-2xl eco-shadow animate-leaf-float"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-leaf-float">
              <span className="text-lg">🌱</span>
            </div>
            <div className="absolute top-1/2 -left-4 w-6 h-6 bg-success rounded-full flex items-center justify-center animate-leaf-float" style={{animationDelay: '1s'}}>
              <span className="text-sm">💡</span>
            </div>
            <div className="absolute -bottom-4 right-1/4 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center animate-leaf-float" style={{animationDelay: '2s'}}>
              <span className="text-lg">♻️</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-success/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}