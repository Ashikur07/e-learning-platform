const Partners = () => {
    const partnerLogos = [
        { name: "Volkswagen", img: "https://i.ibb.co/d50WH34/DB2019-AL01950-web-1600.jpg", w: "w-16 lg:w-20" },
        { name: "Samsung", img: "https://i.ibb.co/SN5vtHN/1024px-Samsung-Logo-svg.png", w: "w-24 lg:w-32" },
        { name: "Cisco", img: "https://i.ibb.co/Bg87S79/2560px-Cisco-logo-blue-2016-svg.png", w: "w-24 lg:w-32" },
        { name: "AT&T", img: "https://i.ibb.co/2N5F7ft/1200px-AT-T-logo-2016-svg.png", w: "w-20 lg:w-28" },
        { name: "P&G", img: "https://i.ibb.co/sC8B3mC/640px-Procter-Gamble-logo-svg.png", w: "w-12 lg:w-16" },
        { name: "HP", img: "https://i.ibb.co/2kk7FT5/1200px-HP-logo-2012-svg.png", w: "w-12 lg:w-16" },
        { name: "Citibank", img: "https://i.ibb.co/FV4w6K0/ORY9-Zv-Zem1-Wngxgt-P4d-Ip-Tp2-C84vc-JNUwg-ZE5-Ja-FUyy4-KXWfu2-SPCe01-J-CQTh6-ICI.png", w: "w-12 lg:w-16" },
        { name: "Ericsson", img: "https://i.ibb.co/PwgvjrV/Ericsson-logo.png", w: "w-24 lg:w-32" },
    ];

    return (
        <section className="py-16 lg:py-28 bg-base-100 transition-colors duration-300 overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                
                {/* Section Header */}
                <div className="text-center mb-10 lg:mb-16">
                    <p className="text-primary font-black text-sm tracking-[0.2em] uppercase mb-2">Powering Education</p>
                    <h2 className="text-2xl lg:text-5xl font-black text-base-content">
                        Our Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Partners</span>
                    </h2>
                </div>

                {/* Partners Grid - Mobile: 2 cols, Tablet: 3, Desktop: 4 */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
                    {partnerLogos.map((logo, index) => (
                        <div 
                            key={index}
                            className="group relative flex flex-col items-center justify-center p-6 lg:p-10 rounded-2xl lg:rounded-[2.5rem] bg-base-200/40 border border-base-300/30 hover:border-primary/50 transition-all duration-300 overflow-hidden"
                        >
                            {/* Animated Background Glow on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Logo Image */}
                            <div className={`relative ${logo.w} transition-all duration-500 transform group-hover:scale-110 group-hover:drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)] dark:group-hover:drop-shadow-[0_10px_10px_rgba(255,255,255,0.05)]`}>
                                <img 
                                    src={logo.img} 
                                    alt={logo.name} 
                                    className="w-full h-auto object-contain filter" 
                                />
                            </div>

                            {/* Partner Name - Visible on Desktop, Subtle on Mobile */}
                            <h3 className="mt-4 lg:mt-6 text-[10px] lg:text-sm font-black text-base-content/30 group-hover:text-primary transition-colors duration-300 uppercase tracking-widest text-center">
                                {logo.name}
                            </h3>

                            {/* Bottom Accent Line */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;