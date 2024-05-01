import "../css/urbanNest.css";

const ContactUs = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="bg-gray-100  m-2  rounded-md pb-16 pt-3">
      <div className="container mx-auto flex flex-col gap-2 ">
        <h2 className="text-3xl text-orange font-bold mb-4 pl-2">
          Connect with us
        </h2>
        <p className="text-2xl sm:text-xl  text-gray p-2">
          Have questions or need assistance? Feel free to reach out to our
          friendly team.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="mt-8 p-3">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label
                className="block text-gray text-sm font-semibold mb-2"
                htmlFor="name"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 rounded-md bg-white text-orange"
                placeholder="Name"
                required
              />
            </div>

            <div className="flex-1">
              <label
                className="block text-gray text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 rounded-md bg-white text-orange"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              className="block text-gray text-sm font-semibold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full px-4 py-2 rounded-md bg-white text-orange"
              placeholder="Your message..."
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-orange text-white font-bold py-2 px-4 rounded-md hover:bg-white-600 transition duration-300"
          >
            Submit
          </button>
        </form>

        {/* Feedback Section */}
        <div className="mt-8 p-5">
          <h2 className="text-3xl text-orange font-bold mb-4">Feedback</h2>
          <p className="text-dark">
            We appreciate your feedback! Please let us know how we can improve
            our services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
