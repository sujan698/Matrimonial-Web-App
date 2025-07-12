import React, { useRef } from "react";
import emailjs from '@emailjs/browser'; 
import contact from "../assets/Contact.png";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_vcz8qyq",
        "template_6y1x18n",
        form.current,
        "z_SbxH6FQ1RGcgZ6F"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send the message, please try again.");
        }
      );
  };

  return (
    <div className="font-outfit" id="contact">
      <h2 className="mb-[5%] text-center font-extrabold text-[40px] text-[#FF6347] mt-20">
        Contact
      </h2>
      <div className="w-[60%] mx-auto px-[10%] py-[5%] shadow-xl shadow-gray-400 rounded-3xl">
        <img className="w-[12%] mx-auto" src={contact} alt="" />
        <form ref={form} onSubmit={sendEmail} className="py-8">
          <div className="flex justify-between w-full space-x-10">
            <div>
              <label
                className="block font-bold text-[#333333] text-xl"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="pl-2 w-72 h-10 border-2 border-[#FF6347] rounded-lg"
                id="firstName"
                type="text"
                name="firstName"
                required
              />
            </div>
            <div>
              <label
                className="block font-bold text-[#333333] text-xl"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="pl-2 w-72 h-10 border-2 border-[#FF6347] rounded-lg"
                id="lastName"
                type="text"
                name="lastName"
                required
              />
            </div>
          </div>
          <label
            className="block mt-10 font-bold text-[#333333] text-xl"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="pl-2 w-[38.5em] h-10  border-2 border-[#FF6347] rounded-lg"
            id="email"
            type="email"
            name="email"
            required
          />
          <label
            className="block mt-10 font-bold text-[#333333] text-xl"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className="block p-2 w-[34em] h-40 text-lg border-2 border-[#FF6347] rounded-lg"
            name="message"
            id="message"
            placeholder="Type your message here..."
            required
          ></textarea>
          <button
            className="block mt-10 mx-auto w-[25%] p-2 rounded-lg bg-[#FF6347] text-white font-extrabold"
            type="submit"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
