
const Partners = () => {
    return (
        <div className="mt-20 mb-32 max-w-6xl mx-auto">
            <div className="text-center lg:pb-3">
                <p className="text-[#e96223] font-bold text-xl">Our Partners</p>
                <h1 className="text-4xl font-semibold">Meet Our Partners</h1>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 items-center">
                {/* logo1 */}
                <div className="flex flex-col items-center pt-6">
                    <img className="w-32" src="https://i.ibb.co/d50WH34/DB2019-AL01950-web-1600.jpg" alt="" />
                    <h1 className="text-2xl font-semibold">volkswagen</h1>
                </div>
                {/* logo2 */}
                <div className="flex flex-col items-center pt-16">
                    <img className="w-40" src="https://i.ibb.co/SN5vtHN/1024px-Samsung-Logo-svg.png" alt="" />
                    <h1 className="pt-10 text-2xl font-semibold">Samsung</h1>
                </div>
                {/* logo3 */}
                <div className="flex flex-col items-center pt-12">
                    <img className="w-40" src="https://i.ibb.co/Bg87S79/2560px-Cisco-logo-blue-2016-svg.png" alt="" />
                    <h1 className="text-2xl pt-7 font-semibold">CISCO</h1>
                </div>
                {/* logo4 */}
                <div className="flex flex-col items-center pt-12">
                    <img className="w-40" src="https://i.ibb.co/2N5F7ft/1200px-AT-T-logo-2016-svg.png" alt="" />
                    <h1 className="text-2xl pt-12 font-semibold">AT&T</h1>
                </div>
                {/* logo5 */}
                <div className="flex flex-col items-center pt-12">
                    <img className="w-24" src="https://i.ibb.co/sC8B3mC/640px-Procter-Gamble-logo-svg.png" alt="" />
                    <h1 className="text-2xl pt-8 font-semibold">Procter & Gamble</h1>
                </div>
                {/* logo6 */}
                <div className="flex flex-col items-center pt-12">
                    <img className="w-24" src="https://i.ibb.co/2kk7FT5/1200px-HP-logo-2012-svg.png" alt="" />
                    <h1 className="text-2xl pt-8 font-semibold">Hewlett-Packard</h1>
                </div>
                {/* logo7 */}
                <div className="flex flex-col items-center pt-12">
                    <img className="w-24" src="https://i.ibb.co/FV4w6K0/ORY9-Zv-Zem1-Wngxgt-P4d-Ip-Tp2-C84vc-JNUwg-ZE5-Ja-FUyy4-KXWfu2-SPCe01-J-CQTh6-ICI.png" alt="" />
                    <h1 className="text-2xl pt-8 font-semibold">Citibank</h1>
                </div>
                {/* logo8 */}
                <div className="flex flex-col items-center pt-12">
                    <img className="w-40" src="https://i.ibb.co/PwgvjrV/Ericsson-logo.png" alt="" />
                    <h1 className="text-2xl pt-10 font-semibold uppercase">ericssion</h1>
                </div>

            </div>
        </div>
    );
};

export default Partners;