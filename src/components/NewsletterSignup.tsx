

const NewsletterSignup = () => {
  return (
    <div className="bg-gray-100 p-8  my-0 flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 text-center">Stay in the know</h2>
      <p className="text-gray-600 mb-4 pl-10 pr-10 text-center">
        Sign up to get marketing emails from UrbanNest.com, including promotions, rewards, travel experiences and information about UrbanNest.com’s and UrbanNest.com Transport Limited’s products and services.
      </p>
      <form className="flex flex-col space-y-4 items-center">
        <label htmlFor="email" className="text-gray-700 font-medium text-center">Enter your email address and we'll send you our best deals</label>
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <input type="email" id="email" name="email" placeholder="Your email address" className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500" />
          <button type="submit" className="bg-orange p-3 text-white py-2 rounded hover:bg-gray-600 transition duration-300 ease-in-out w-full sm:w-auto">Subscribe</button>
        </div>
      </form>
      <p className="text-sm text-gray-600 mt-4 text-center">
        You can opt out any time. See our privacy statement.
      </p>
    </div>
  );
};

export default NewsletterSignup;
