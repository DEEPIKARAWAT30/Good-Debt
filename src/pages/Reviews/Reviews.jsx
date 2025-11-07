import React from 'react';

const reviews = [
  {
    id: 1,
    name: 'John Doe',
    videoSrc:
      'https://www.youtube.com/embed/uKwIQNqplDc?autoplay=1&mute=0&controls=1&origin=https%3A%2F%2Fwww.bimalinstitute.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=7&forigin=https%3A%2F%2Fwww.bimalinstitute.com%2F&aoriginsup=1&vf=6',
  },
  {
    id: 2,
    name: 'Jane Smith',
    videoSrc:
      'https://www.youtube.com/embed/uKwIQNqplDc?autoplay=1&mute=0&controls=1&origin=https%3A%2F%2Fwww.bimalinstitute.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=7&forigin=https%3A%2F%2Fwww.bimalinstitute.com%2F&aoriginsup=1&vf=6',
  },
  {
    id: 3,
    name: 'Jane Smith',
    videoSrc:
      'https://www.youtube.com/embed/uKwIQNqplDc?autoplay=1&mute=0&controls=1&origin=https%3A%2F%2Fwww.bimalinstitute.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=7&forigin=https%3A%2F%2Fwww.bimalinstitute.com%2F&aoriginsup=1&vf=6',
  },
  {
    id: 4,
    name: 'Jane Smith',
    videoSrc:
      'https://www.youtube.com/embed/uKwIQNqplDc?autoplay=1&mute=0&controls=1&origin=https%3A%2F%2Fwww.bimalinstitute.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=7&forigin=https%3A%2F%2Fwww.bimalinstitute.com%2F&aoriginsup=1&vf=6',
  },
];

const Reviews = () => {
  return (
    <div className="reviews w-full h-full mt-10 px-4 sm:px-6 lg:px-8">
      <h3 className="text-center text-4xl font-semibold mb-8">Reviews</h3>
      <div
        className="reviews-track grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        id="reviewsTrack"
      >
        {reviews.map(({ id, name, videoSrc }) => (
          <div
            key={id}
            className="reviews-slide flex justify-center"
          >
            <div className="reviews-card h-90 flex flex-col items-center bg-gray-50 rounded-xl shadow-md overflow-hidden w-full max-w-sm">
              <div className="reviews-iframe-wrapper h-80 w-full aspect-video bg-black">
                <iframe
                  className="reviews-iframe w-full h-full rounded-t-xl"
                  src={videoSrc}
                  allowFullScreen
                  title={`Review from ${name}`}
                ></iframe>
              </div>
              <p className="reviews-name text-center font-semibold text-lg mt-3 mb-5 px-2 truncate">
                {name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
