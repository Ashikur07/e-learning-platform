
const TeacherTraining = () => {
    return (
        <div className="max-w-6xl mx-auto flex gap-10 items-center">
            <div>
                <img src="https://i.ibb.co/qdbwQgV/image.png" alt="" />
            </div>

            <div className="space-y-4">
                <h1 className="text-4xl pb-5 font-bold text-orange-500">Teacher Training</h1>
                <div className="pl-1 flex items-center gap-2">
                    <img src="https://i.ibb.co/MpkqHFw/image.png" alt="" />
                    <p> Teachers don’t get lost in the grid view and have a dedicated Podium space.
                    </p>
                </div>

                <div className="pl-1 flex items-center gap-2">
                    <img src="https://i.ibb.co/CWpBzB3/image.png" alt="" />
                    <p> TA’s and presenters can be moved to the front of the class.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <img src="https://i.ibb.co/XyjBVxD/image.png" alt="" />
                    <p>Teachers can easily see all students and class data at one time.</p>
                </div>



            </div>
        </div>
    );
};

export default TeacherTraining;