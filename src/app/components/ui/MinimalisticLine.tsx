const MinimalisticLine = () => {
  return (
    <div className="relative w-full h-16 flex items-center justify-center">
      {/* Hovedstrek - mørk grå */}
      <div className="w-full h-px bg-gray-800 relative">
        {/* Subtil oransje glød i midten */}
        <div className="absolute top-1/2 left-1/2 w-24 h-px bg-orange-500 opacity-20 blur-sm transform -translate-x-1/2 -translate-y-1/2" />
        
        {/* Liten oransje prikk */}
        <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-orange-500 opacity-40 rounded-full transform -translate-y-1/2" />
      </div>
    </div>
  );
};

export default MinimalisticLine;