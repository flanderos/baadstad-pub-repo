const DecorativeElement = () => {
  return (
    <div className="relative w-full h-48 overflow-hidden">
      {/* Bakgrunnselement */}
      <div className="absolute top-0 right-0 w-1/3 h-2/3 bg-gradient-to-br from-orange-500 to-orange-600 opacity-40 rounded-bl-3xl" />
      
      {/* Sirkelelement */}
      <div className="absolute bottom-6 right-12 w-20 h-20 bg-orange-400 opacity-60 rounded-full" />
      <div className="absolute bottom-10 right-32 w-12 h-12 bg-orange-300 opacity-30 rounded-full" />
      
      {/* Geometriske elementer */}
      <div className="absolute top-10 left-1/4 w-24 h-24 bg-orange-500 opacity-50 rotate-45 transform" />
      <div className="absolute bottom-0 left-1/3 w-32 h-16 bg-orange-600 opacity-30 skew-x-12 transform" />
      
      {/* Organiske former */}
      <div className="absolute top-5 left-10 w-40 h-14 bg-orange-400 opacity-20 rounded-full" 
           style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }} />
      
      {/* Halvsirkel */}
      <div className="absolute -bottom-10 left-2/3 w-40 h-40 bg-orange-500 opacity-25 rounded-full" />
      
      {/* Trekanter ved hjelp av border */}
      <div className="absolute top-1/2 left-1/2 w-0 h-0 opacity-70"
           style={{ 
             borderLeft: '25px solid transparent',
             borderRight: '25px solid transparent',
             borderBottom: '50px solid rgb(249, 115, 22)',
             transform: 'translate(-50%, -50%) rotate(15deg)'
           }} />
      
      {/* Diagonal stripe */}
      <div className="absolute top-0 left-0 w-full h-full opacity-15 overflow-hidden">
        <div className="absolute w-10 h-96 bg-orange-300 -rotate-45 transform"
             style={{ left: '20%', top: '-50%' }} />
        <div className="absolute w-6 h-96 bg-orange-400 -rotate-45 transform"
             style={{ left: '60%', top: '-30%' }} />
      </div>
      
      {/* Prikker */}
      <div className="absolute top-8 right-1/4 w-3 h-3 bg-orange-500 rounded-full opacity-80" />
      <div className="absolute top-16 right-1/4 w-2 h-2 bg-orange-500 rounded-full opacity-60" />
      <div className="absolute top-12 right-1/4 ml-4 w-1 h-1 bg-orange-500 rounded-full opacity-40" />
      
      {/* Halv ring */}
      <div className="absolute bottom-12 left-12 w-28 h-14 border-t-4 border-orange-500 opacity-60 rounded-full" />
    </div>
  );
};

export default DecorativeElement;