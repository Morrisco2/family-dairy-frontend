import { FaTimes } from "react-icons/fa"
import Button from "../Button";
import { useState } from "react";
import AlertToaster from "../toasters/AlertToaster";
import baseUrl from "../../utilities/BaseURL";

const ContactSupportForm = ({ setContactForm }) => {

    const [input, setInput] = useState({ message: "" })
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState({
        show: false,
        message: "",
        status: ""
    })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInput((prev) => ({
            ...prev, [name]: value
        }))
    }


    const handleSubmit = (event) => {
        event.preventDefault()

        if (!input.message) {
            setShowAlert((prev) => ({
                ...prev, show: true,
                status: "failed",
                message: "please describe your problems!"
            }))
            return
        }

        setLoading(true)

        const sendSupport = async () => {
            try {
                const req = await fetch(`${baseUrl}/help/in-app-support`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const res = await req.json()

                if (res.status.toLowerCase() === "success") {
                    setShowAlert((prev) => ({
                        ...prev, show: true,
                        status: "success",
                        message: res.message
                    }))
                    setLoading(false)

                    return
                }

                setShowAlert((prev) => ({
                    ...prev, show: true,
                    status: "failed",
                    message: res.message
                }))

                return

            } catch (error) {
                setShowAlert((prev) => ({
                    ...prev, show: true,
                    status: "failed",
                    message: error.message
                }))
            }
        }


        sendSupport()
    }

    return (
        <div className="bg-[#E9F1FA] py-5 flex w-full md:w-sm   flex-col gap-6 px-5 rounded-2xl overflow-hidden">
            <div className="flex justify-between">
                <h1 className="text-2xl text-[#2E5E99] font-semibold">contact Support</h1>
                <button
                    className="cursor-pointer" type="button"
                    onClick={() => setContactForm(false)}
                >
                    <FaTimes /></button>

            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="relative w-full">
                    <textarea
                        type="text"
                        id="message"
                        name="message"
                        value={input.message}
                        onChange={handleChange}
                        placeholder=" "
                        onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                        className="peer w-full min-h-20 px-3 py-5 bg-[#D0DDED] font-light outline-none border border-transparent text-sm  rounded-md"
                    />

                    <label
                        htmlFor="message"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
                  peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500  peer-focus:px-1 peer-focus:-translate-y-1/2
                  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-blue-500
                  peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:-translate-y-1/2">
                        Describe your problem here...
                    </label>
                </div>

                <div>
                    <Button primary text="Send" type="submit" loading={loading} />
                </div>

            </form>

            <AlertToaster
                show={showAlert.show} status={showAlert.status}
                message={showAlert.message}
                duration={4000}
                onClose={() => setShowAlert((prev) => ({ ...prev, show: false }))}
            />
        </div>
    )
}


export default ContactSupportForm