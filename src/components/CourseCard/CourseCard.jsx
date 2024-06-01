

const CourseCard = ({course}) => {
    const {image, title, description, enrol_date, price} = course;
    return (
        <div>
            <div className="w-[300px] shadow-2xl rounded-xl">
                <img className="w-full h-52 rounded-t-xl" src={image} alt="" />
                <div className="p-6">
                    <p className="text-sm">{enrol_date}</p>
                    <h1 className="text-lg py-2 font-bold">{title}</h1>
                    <p className="text-sm">{description}</p>

                    <div className="flex justify-between pt-5 items-center">
                        <p className="text-lg"><span className="text-[#d66e3e] font-extrabold">$ {price}</span> <strike>$ 500</strike></p>
                        <button className="bg-[#0B7077] p-2 px-3 rounded-lg text-white">Enroll Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;