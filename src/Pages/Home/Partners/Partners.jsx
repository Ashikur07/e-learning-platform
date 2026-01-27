const Partners = () => {
  const partnerLogos = [
    {
      name: "Volkswagen",
      img: "https://i.ibb.co/d50WH34/DB2019-AL01950-web-1600.jpg",
      w: "w-20 lg:w-24",
    },
    {
      name: "Samsung",
      img: "https://i.ibb.co/SN5vtHN/1024px-Samsung-Logo-svg.png",
      w: "w-28 lg:w-36",
    },
    {
      name: "Cisco",
      img: "https://i.ibb.co/Bg87S79/2560px-Cisco-logo-blue-2016-svg.png",
      w: "w-28 lg:w-36",
    },
    {
      name: "AT&T",
      img: "https://i.ibb.co/2N5F7ft/1200px-AT-T-logo-2016-svg.png",
      w: "w-24 lg:w-32",
    },
    {
      name: "P&G",
      img: "https://i.ibb.co/sC8B3mC/640px-Procter-Gamble-logo-svg.png",
      w: "w-16 lg:w-20",
    },
    {
      name: "HP",
      img: "https://i.ibb.co/2kk7FT5/1200px-HP-logo-2012-svg.png",
      w: "w-16 lg:w-20",
    },
    {
      name: "Citibank",
      img: "https://i.ibb.co/FV4w6K0/ORY9-Zv-Zem1-Wngxgt-P4d-Ip-Tp2-C84vc-JNUwg-ZE5-Ja-FUyy4-KXWfu2-SPCe01-J-CQTh6-ICI.png",
      w: "w-16 lg:w-20",
    },
    {
      name: "Ericsson",
      img: "https://i.ibb.co/PwgvjrV/Ericsson-logo.png",
      w: "w-28 lg:w-36",
    },
  ];

  return (
    <div className="mt-20 mb-32 max-w-7xl mx-auto px-4 lg:px-6">
      {/* Header - Kept exactly as your original logic with modern spacing */}
      {/* Section Header */}

      <div className="text-center mb-16 space-y-4">
        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <p className="text-primary font-bold text-sm lg:text-base tracking-widest uppercase">
            Trusted By Leaders
          </p>
        </div>

        <h2 className="text-3xl lg:text-5xl font-black text-base-content tracking-tight">
          Our Global{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Partners
          </span>
        </h2>

        <p className="text-base-content/60 max-w-xl mx-auto font-medium">
          We collaborate with world-class organizations to bring you the best
          educational resources.
        </p>
      </div>

      {/* Partners Grid - Optimized for all devices */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
        {partnerLogos.map((logo, index) => (
          <div
            key={index}
            className="group relative flex flex-col items-center justify-center p-6 lg:p-10 rounded-2xl lg:rounded-[2.5rem] bg-base-200/40 border border-base-300/30 hover:bg-base-100 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            {/* Always Color Logo with Scale Effect */}
            <div
              className={`relative ${logo.w} transition-all duration-500 transform group-hover:scale-110`}
            >
              <img
                src={logo.img}
                alt={logo.name}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Partner Name - Visible with subtle style */}
            <h3 className="mt-4 lg:mt-6 text-xs lg:text-sm font-black text-base-content/40 group-hover:text-primary transition-colors duration-300 uppercase tracking-widest text-center">
              {logo.name}
            </h3>

            {/* Animated Glow on Hover */}
            <div className="absolute inset-0 bg-primary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"></div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-[#e96223] to-primary group-hover:w-full transition-all duration-500"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
