import { Star, StarHalf } from "lucide-react";

export const renderStars = (rating: any) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`star-${i}`}
        className="fill-yellow-400 text-yellow-400"
        size={20}
      />,
    );
  }

  // Add half star if needed
  if (hasHalfStar) {
    stars.push(
      <StarHalf
        key="half-star"
        className="fill-yellow-400 text-yellow-400"
        size={20}
      />,
    );
  }

  // Add empty stars to make total of 5
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star key={`empty-star-${i}`} className="text-gray-300" size={20} />,
    );
  }

  return stars;
};
