import { useState } from "react";
import { FaBirthdayCake, FaTimes } from "react-icons/fa";
import Button from "../Button";
import AlertToaster from "../toasters/AlertToaster";
import baseUrl from "../../utilities/BaseURL";

const SendWishForm = ({ closeModal, celebrant }) => {
    const [submitted, setSubmitted] = useState(false)
    const [input, setInput] = useState({ id: celebrant.id, name: celebrant.name, wish: "" })
    const [showAlert, setShowAlert] = useState({
        show: false,
        message: "",
        status: ""
    })



    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInput((prev) => ({ ...prev, [name]: value }))
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true)

        if (!input.wish) {
            setShowAlert((prev) => ({
                ...prev, show: true,
                message: "Please write a wish!...",
                status: "failed"
            }))

            setSubmitted(false);
            return
        }


        const sendWish = async () => {
            try {
                const request = await fetch(`${baseUrl}/send-birthday-wish`, {
                    method: "POST",
                    headers: {
                        "content-Type": "application/json"
                    },
                    body: JSON.stringify(input)

                })


                const res = await request.json();

                if (res.status !== "success") {
                    setShowAlert((prev) => ({
                        ...prev, show: true,
                        message: res.message,
                        status: "failed"
                    }))

                    setSubmitted(false)
                    return
                }

                setShowAlert((prev) => ({
                    ...prev, show: true,
                    message: res.message,
                    status: "success"
                }))
                setSubmitted(false)
                closeModal(true)
                return


            } catch (error) {
                setShowAlert((prev) => ({
                    ...prev, show: true,
                    message: error.message,
                    status: "failed"
                }))
                setSubmitted(false)
            }
        }


        sendWish()


    }

    return (
        <div className=" bg-[#E9F1FA] py-6 px-5 w-full max-w-sm rounded-2xl flex flex-col gap-4 ">
            <div className=" flex justify-end text-xl"><button type="button" onClick={() => closeModal(false)}><FaTimes /></button></div>
            <div className="flex flex-col gap-4">
                <div><h1 className="text-2xl font-semibold text-[#2E5E99]">Send birthday wish </h1></div>
                <div className="flex gap-2"><FaBirthdayCake className="text-[#2E5E99] text-lg" /> <p className="font-semibold text-gray-500">{celebrant.name}</p></div>
                <div></div>

                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="relative w-full">
                        <textarea
                            type="text"
                            id="wish"
                            name="wish"
                            value={input.wish}
                            onChange={handleChange}
                            placeholder=" "
                            // onInput={(e) => {
                            //     e.target.style.height = "auto";
                            //     e.target.style.height = `${e.target.scrollHeight}px`;
                            // }}
                            className="peer w-full min-h-30 text-sm px-3 py-5 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
                        />

                        <label
                            htmlFor="description"
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
                  peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500  peer-focus:px-1 peer-focus:-translate-y-1/2
                  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-blue-500
                  peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:-translate-y-1/2">
                            Type your wishes here...
                        </label>
                    </div>
                    <div>
                        <Button primary text="Send Wish" type="submit" loading={submitted} />
                    </div>
                </form>
            </div>

            {showAlert.show && (
                <AlertToaster
                    status={showAlert.status}
                    message={showAlert.message}
                    show={showAlert.show}
                    duration={5000}
                    onClose={() => setShowAlert((prev) => ({ ...prev, show: false }))}
                />
            )}
        </div>
    )
}

export default SendWishForm