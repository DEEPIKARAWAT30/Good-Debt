import React from 'react';

const blogs = [
  {
    id: 1,
    title: "Why Trust Matters in Financial Services",
    description:
      "Learn how choosing a trustworthy company ensures a secure and reliable experience for all your financial needs.",
    author: "Admin",
    date: "May 02, 2025",
    imgSrc:
      "https://static.vecteezy.com/system/resources/previews/002/875/134/large_2x/young-girl-standing-holding-a-credit-card-in-the-shopping-mall-photo.jpg",
  },
  {
    id: 2,
    title: "You Need to Know About Credit Cards",
    description:
      "Understand the benefits of credit cards, including rewards, credit building, and convenience for everyday purchases..",
    author: "Admin",
    date: "March 12, 2025",
    imgSrc:
      "https://www.idfcfirstbank.com/content/dam/idfcfirstbank/images/blog/credit-card/why-give-your-18-year-old-a-credit-card-717x404.jpg",
  },
  {
    id: 3,
    title: "The Ultimate Guide to Personal Loans",
    description:
      "Discover how personal loans can help you achieve your financial goals with flexible terms and competitive interest rates.",
    author: "Admin",
    date: "April 21, 2025",
    imgSrc: "https://www.loanfront.in/assets/img/Navigate_loanworld.png",
  },
];

const Blogs = () => {
  return (
    <div className="py-5">
      <div className="container mx-auto px-4">
        <h1 className="font-bold text-center mb-10 text-4xl">Blogs</h1>
        <div className="grid grid-cols-1 gap-8 lg:mx-10 xl:mx-10  md:grid-cols-2 lg:grid-cols-3">
          {blogs.map(({ id, title, description, author, date, imgSrc }) => (
            <div
              key={id}
              className="shadow-xl  rounded-lg border border-gray-100 overflow-hidden flex flex-col h-full"
            >
              <div>

              <img
                src={imgSrc}
                alt={title}
                loading="lazy"
                className="w-full h-56   object-cover"
                />
                </div>
              <div className="px-5 py-4 flex flex-col flex-grow h-full">
                <h5 className="font-semibold text-md mb-1">{title}</h5>
                <p className="text-gray-700 text-sm flex-grow">{description}</p>
                <div className="flex justify-between text-sm text-gray-500 mt-4">
                  <span>{author}</span>
                  <span>{date}</span>
                </div>
                <button className="mt-4 bg-red-900 text-white py-2 px-4 rounded hover:bg-red-600 self-start">
                  Read more &gt;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
