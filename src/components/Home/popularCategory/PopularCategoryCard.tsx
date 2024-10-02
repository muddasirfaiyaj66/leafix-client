import React from 'react';

type PopularCategoryCardProps = {
  payload: {
    name: string;
    img: string;
  };
};

const PopularCategoryCard: React.FC<PopularCategoryCardProps> = ({ payload }) => {
  const { name, img } = payload;

  return (
    <div className="card bg-transparent mb-8 ">
      <figure>
        <img
          className="w-full h-full object-cover"
          src={img}
          alt={name}
          loading="lazy"
        />
      </figure>
      <div className="bg-transparent text-center my-2 text-2xl">
        <h2>{name}</h2>
      </div>
    </div>
  );
};

export default PopularCategoryCard;
