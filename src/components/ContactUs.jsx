import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";

const inputClasses =
  "w-full px-4 py-2 mt-2 text-white rounded-full bg-transparent formBorder-gradient focus:outline-none focus:ring-0 placeholder:text-gray-500";

const ContactUs = () => {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = (form) => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter a valid email";
    }
    if (!form.message.trim()) next.message = "Message is required";
    return next;
  };

  const handleChange = (field) => (e) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    setErrors((prev) => ({ ...prev, [field]: validate(next)[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    setSubmitted(false);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setValues({ name: "", email: "", subject: "", message: "" });
    }, 800);
  };

  const isValid = Object.keys(validate(values)).length === 0;

  return (
    <div id="contact" className="container mx-auto">
      <div className="lg:flex lg:px-32 gap-x-10">
        <div className="flex-grow">
          <section className="w-full bg-gradient-to-l from-[#110D2E]/30 to-[#fc466a4a]/10 rounded-md shadow-md p-8 lg:p-16">
            <div className="flex flex-col mb-10 justify-center items-center">
              <h2 className="text-2xl font-semibold capitalize text-white">
                Drop Us Your Message
              </h2>
              <p className="text-gray-400">
                Freely contact with us anytime. We're available here for you.
              </p>
            </div>

            {submitted && (
              <div className="mb-6 flex items-center gap-2 px-4 py-3 rounded-lg bg-green-500/15 border border-green-500/40 text-green-300 text-sm">
                <FiCheckCircle size={18} />
                Message sent successfully! We'll get back to you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="col-span-2 lg:col-span-1">
                  <input
                    type="text"
                    value={values.name}
                    onChange={handleChange("name")}
                    className={inputClasses}
                    placeholder="Full Name"
                  />
                  {errors.name && (
                    <p className="mt-1 ml-2 text-xs text-[#FC466B]">{errors.name}</p>
                  )}
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <input
                    type="email"
                    value={values.email}
                    onChange={handleChange("email")}
                    className={inputClasses}
                    placeholder="Your Email"
                  />
                  {errors.email && (
                    <p className="mt-1 ml-2 text-xs text-[#FC466B]">{errors.email}</p>
                  )}
                </div>

                <div className="col-span-2">
                  <input
                    type="text"
                    value={values.subject}
                    onChange={handleChange("subject")}
                    className={inputClasses}
                    placeholder="Select Subject"
                  />
                </div>
                <div className="col-span-2">
                  <textarea
                    value={values.message}
                    onChange={handleChange("message")}
                    className={inputClasses}
                    placeholder="Message..."
                    rows={5}
                  />
                  {errors.message && (
                    <p className="mt-1 ml-2 text-xs text-[#FC466B]">{errors.message}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-start mt-6">
                <button
                  type="submit"
                  disabled={!isValid || sending}
                  className="px-6 py-2 rounded-full bg-[#6318F1] text-white hover:shadow-lg hover:bg-gradient-to-r hover:from-[#FC466B]/40 hover:to-[#3F5EFB]/40 hover:scale-105 duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {sending ? "Sending..." : "Send Messages"}
                </button>
              </div>
            </form>
          </section>
        </div>

        <div className="lg:w-[22%] flex flex-col items-center justify-center mx-16 formBorder-gradient border mt-8 lg:mt-0">
          <div className="flex flex-1 flex-col items-center justify-around">
            <div className="flex flex-col justify-center items-center py-4">
              <FaPhoneAlt size={44} className="text-blue-700 my-4" />
              <div className="text-white text-lg py-1">Phone</div>
              <div className="text-gray-400 text-lg">0310 - 7756294</div>
            </div>
            <hr className="w-32 align-bottom bg-gradient-to-r h-[1px] from-[#FC466B] to-[#3F5EFB]" />
          </div>

          <div className="flex flex-1 flex-col items-center justify-around">
            <div className="flex flex-col justify-center items-center py-4">
              <MdMarkEmailUnread size={44} className="text-blue-700 my-4" />
              <div className="text-white text-lg py-1">Email</div>
              <div className="text-gray-400 text-lg">0310 - 7756294</div>
            </div>
            <hr className="w-32 align-bottom bg-gradient-to-r h-[1px] from-[#FC466B] to-[#3F5EFB]" />
          </div>

          <div className="flex flex-1 flex-col items-center justify-around">
            <div className="flex flex-col justify-center items-center py-4">
              <FaLocationDot size={44} className="text-blue-700 my-4" />
              <div className="text-white text-lg py-1">Location</div>
              <div className="text-gray-400 text-lg">0310 - 7756294</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
