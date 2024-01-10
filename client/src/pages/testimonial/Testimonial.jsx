import React from "react";

const TestimonialCard = ({ name, role, testimonial }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden my-4 relative group">
      <div className="absolute inset-0 bg-blue-500 text-white p-6 transform -rotate-y-180 opacity-0 transition-all group-hover:opacity-100 group-hover:rotate-y-0">
        <p className="text-lg">{testimonial}</p>
      </div>
      <div className="p-6">
        <p className="text-gray-600">{role}</p>
        <h3 className="text-2xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-700">
          Hover over the card to see the testimonial!
        </p>
      </div>
    </div>
  );
};

const Testimonial = () => {
  return (
    <div className="container mx-auto pt-10">
      <div className="flex items-center justify-center">
        <h1 className="border-b-2 border-red-700 text-center text-blue-600 font-semibold text-4xl">
          Testimonials
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <TestimonialCard
          name="John Doe"
          role="CEO, Company X"
          testimonial="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis tellus eu odio eleifend luctus."
        />
        <TestimonialCard
          name="John Doe"
          role="CEO, Company X"
          testimonial="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis tellus eu odio eleifend luctus."
        />
        <TestimonialCard
          name="John Doe"
          role="CEO, Company X"
          testimonial="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis tellus eu odio eleifend luctus."
        />
      </div>
    </div>
  );
};

export default Testimonial;
