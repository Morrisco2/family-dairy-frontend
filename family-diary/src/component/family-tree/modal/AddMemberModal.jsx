import { useEffect, useState } from "react";
import Button from "../../Button";
import { users } from '../../../utilities/userDemoData';
import { familyMembers } from "../data/dummyTree";
import AlertToaster from "../../toasters/AlertToaster";
import baseUrl from "../../../utilities/BaseURL";

const AddMemberModal = ({ open, onClose,  selectedPerson }) => {

  const [selectFromFamily, setSelectFromFamily] = useState(true)
  const [showAlert, setShowAlert] = useState({
    show: false,
    status: "",
    message: ""
  })

  const [loading, setLoading] = useState(false)

  const availableUsers = users.filter(
    (user) =>
      !familyMembers.some(
        (member) =>
          member.name?.trim().toLowerCase() ===
          user.name?.trim().toLowerCase()
      )
  );

  
  const [form, setForm] = useState({
    name: "",
    birthYear: "",
    deathYear: "",
    relationship: "",
    gender: "",
    // description: "",
    selectedNode: null
  });

  useEffect(() => {
    if (open) {
      setForm({
        name: "",
        birthYear: "",
        gender: "male",
      });
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();


    setLoading(true)

    // SELECT FROM FAMILY LIST FORM SUBMISSION
    if (selectFromFamily) {

      // const matchedMember = familyMembers.find((member)=>{
      //   member.name.trim().toLowerCase()===
      //   form.name.trim().toLowerCase()
      // })

      // if (matchedMember) {
      //   setForm((prev)=>({
      //     ...prev,
      //     ...matchedMember,
      //   }))

      //   console.log("matched members: ", form);

      // }


      if (!form.name || !form.relationship) {
        setShowAlert((prev) => ({
          ...prev,
          show: true,
          status: "failed",
          message: "Select member & relationship"
        }))

        setLoading(false)

        return
      }


      setForm((prev) => ({
        ...prev,
        selectedNode: selectedPerson.id
      }))


      // SAVE THE SELECTED NODE TO TREE
      const saveNode = async () => {
        try {
          const request = await fetch(`${baseUrl}/history/family-tree/add-node`, {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(form)
          })

          const res = await request.json();

          if (res.status === "success") {
            setShowAlert((prev) => ({
              ...prev,
              show: true,
              status: "success",
              message: res.message
            }))

            setLoading(false)
            onClose

            return
          }
          setShowAlert((prev) => ({
            ...prev,
            show: true,
            status: "failed",
            message: res.message
          }))

        } catch (error) {
          setShowAlert((prev) => ({
            ...prev,
            show: true,
            status: "failed",
            message: error.message
          }))
        }
      }


      saveNode()



      setLoading(false)

      return

    }


    // console.log(form);

    // FORM HANDLING FOR CREATING A NEW NODE
    if (!form.name || !form.birthYear || !form.gender || !form.relationship) {
      setShowAlert((prev) => ({
        ...prev,
        show: true,
        status: "failed",
        message: "fill all required field!"
      }))

      setLoading(false)

      return
    }

    setForm((prev) => ({
      ...prev,
      selectedNode: selectedPerson.id
    }))


    console.log(form);
    
    const createNewNode = async () => {

      try {
        const req = await fetch(`${baseUrl}/history/family-tree/create-node`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(form)
        })


        const res = await req.json();

        if (res.status.toLowerCase() === "success") {
          setShowAlert((prev) => ({
            ...prev,
            show: true,
            status: "success",
            message: res.message
          }))

          setLoading(false)
          onclose

          return
        }

        setShowAlert((prev) => ({
          ...prev,
          show: true,
          status: "failed",
          message: res.message
        }))

        setLoading(false)
        onclose

      } catch (error) {
        setShowAlert((prev) => ({
          ...prev,
          show: true,
          status: "failed",
          message: error.message
        }))
      }
    }

    createNewNode()



    setLoading(false)

  };

  const handleChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    setForm((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="fixed inset-0 z-[999] animate-modal flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#E9F1FA] shadow-2xl py-7 px-4 md:h-screen h-screen overflow-scroll pb-5">
        {/* Header */}
        <div className="border-b border-gray-200 mb-6 flex justify-between">
          <h2 className="text-xl font-semibold text-[#2E5FA7]">
            Add Node
          </h2>
          <button className="font-bold text-[#2E5FA7] hover:text-red-600 transition-all duration-200 ease-in" onClick={onClose}>X</button>
        </div>

        {/* member source  */}

        <div className="px-5 flex gap-5">
          <button
            className={`${selectFromFamily ? "bg-[#2E5FA7] text-gray-100" : ""} px-4 rounded-2xl py-2 border-2 border-[#D0DDED]`}
            onClick={() => setSelectFromFamily(true)}
          >
            Select member
          </button>
          <button
            className={`${selectFromFamily ? "" : "bg-[#2E5FA7] text-gray-100"} px-4 rounded-2xl py-2  border-2 border-[#D0DDED]`}
            onClick={() => setSelectFromFamily(false)}
          >
            Create new</button>
        </div>

        <div className="mt-4  px-2 text-gray-500">
          <small>
            Add a family tree node to <span className="text-gray-900 font-semibold ml-1">{selectedPerson.name}</span>
          </small>
        </div>

        {/* SELECT FROM FAMILY LIST FORM */}
        {selectFromFamily && (
          <form onSubmit={handleSubmit} action="" className="  bg-[#E9F1FA] mt-6 w-full  px-2 flex flex-col gap-5 justify-center ">

            <div className="relative flex-1 ">
              <select
                id="name"
                name="name"
                onChange={handleChange}
                value={form.name}
                required
                className=" peer w-full h-12 px-3 bg-[#D0DDED] rounded-md outline-none appearance-none">
                <option value="" disabled></option>
                {availableUsers.map((member) => (
                  <option key={member.id} value={member.name}>
                    {member.name}
                  </option>
                ))}

              </select>

              <label
                htmlFor="role"
                className=" absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200
                    peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500 peer-focus:px-1
                    peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold peer-valid:text-blue-500  peer-valid:px-1 ">
                Select Member
              </label>

              {/* Dropdown arrow */}
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div className="relative w-full  px-3 py-3 border-2 border-[#D0DDED]">
              <small className="text-gray-500">what's the relationship of the new node to the selected?</small>

              <div className="flex justify-center gap-5">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="relationship"
                    value='parent'
                    placeholder=" "
                    onChange={handleChange}
                    className="peer  h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
                  />

                  <label
                    htmlFor="name"
                    className="">
                    Parent
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="relationship"
                    value='offspring'
                    placeholder=" "
                    onChange={handleChange}
                    className="peer  h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
                  />

                  <label
                    htmlFor="name"
                    className="">
                    Offspring
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="relationship"
                    value="spouse"
                    placeholder=" "
                    onChange={handleChange}
                    className="peer  h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
                  />

                  <label
                    htmlFor="name"
                    className="">
                    Spouse
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <Button primary text="Add Node" type="submit" loading={loading} />
            </div>
          </form>
        )}


        {/* Create new node form*/}
        {!selectFromFamily && (
          <form onSubmit={handleSubmit} className="space-y-4  py-5 px-2 flex flex-col gap-3">


            <div className="relative w-full">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
              />

              <label
                htmlFor="name"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
                  peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500  peer-focus:px-1 peer-focus:-translate-y-1/2
                  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-blue-500
                  peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:-translate-y-1/2">
                Full Name
              </label>
            </div>


            <div className="flex gap-4" >

              <div className="relative ">
                <input
                  type="number"
                  id="birth"
                  name="birthYear"
                  value={form.birthYear}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
                />

                <label
                  htmlFor="name"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
                  peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500  peer-focus:px-1 peer-focus:-translate-y-1/2
                  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-blue-500
                  peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:-translate-y-1/2">
                  Birth Year
                </label>
              </div>

              <div className="relative ">
                <input
                  type="number"
                  id="death"
                  name="deathYear"
                  value={form.deathYear}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
                />

                <label
                  htmlFor="death"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
                  peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500  peer-focus:px-1 peer-focus:-translate-y-1/2
                  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-blue-500
                  peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:-translate-y-1/2">
                  Death Year (Optional)
                </label>
              </div>

            </div>


            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Gender
              </label>

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="peer w-full h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* DESCRIPTION INPUT FIELD */}
            {/* <div className="relative w-full">
              <textarea
                type="text"
                id="description"
                name="description"
                value={''}
                onChange={''}
                placeholder=" "
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                className="peer w-full min-h-20 px-3 py-5 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
              />

              <label
                htmlFor="description"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
                  peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500  peer-focus:px-1 peer-focus:-translate-y-1/2
                  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-blue-500
                  peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:-translate-y-1/2">
                Short Description here...
              </label>
            </div> */}

            <div className="relative w-full  px-3 py-3 border-2 border-[#D0DDED]">
              <small className="text-gray-500">what's the relationship of the new node to the selected?</small>

              <div className="flex justify-center gap-5">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="relationship"
                    value='parent'
                    placeholder=" "
                    onChange={handleChange}
                    className="peer  h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
                  />

                  <label
                    htmlFor="name"
                    className="">
                    Parent
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="relationship"
                    value='offspring'
                    placeholder=" "
                    onChange={handleChange}
                    className="peer  h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
                  />

                  <label
                    htmlFor="name"
                    className="">
                    Offspring
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="relationship"
                    value="spouse"
                    placeholder=" "
                    onChange={handleChange}
                    className="peer  h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
                  />

                  <label
                    htmlFor="name"
                    className="">
                    Spouse
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className=" ">
              <Button primary text="Create Node" type="submit" loading={loading} />
            </div>
          </form>
        )}
      </div>

      <AlertToaster
        show={showAlert.show}
        status={showAlert.status}
        message={showAlert.message}
        duration={5000}
        onClose={() => setShowAlert((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
};

export default AddMemberModal;
