import "../css/urbanNest.css";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 rounded-md  m-2 pb-16 pt-10">
      <div className="container mx-auto flex flex-col gap-8 items-center">
        <h1 className=" text-center text-orange font-bold text-xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl">
          Welcome to UrbanNest - Your Ultimate Destination for Hassle-Free Hotel
          Bookings!
        </h1>
        <p className="text-xl sm:text-lg text-gray max-w-2xl text-center">
          At our hotel, we believe in creating memorable experiences for our
          guests. From luxurious accommodations to world-class amenities, we are
          dedicated to making your stay exceptional.
        </p>

        <h1 className=" text-center text-orange font-bold text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl">
          Our Story
        </h1>
        <p className="text-xl sm:text-lg text-gray max-w-2xl text-center">
          Born out of a passion for travel and a commitment to excellence,
          UrbanNest was founded by a team of industry experts who understand the
          importance of finding the ideal place to stay. With years of
          experience in the hospitality and technology sectors, we set out to
          revolutionize the way travelers book hotels, offering a curated
          selection of top-notch accommodations tailored to your unique
          preferences.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
