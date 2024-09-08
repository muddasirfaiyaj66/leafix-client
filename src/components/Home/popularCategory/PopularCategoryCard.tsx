

const PopularCategoryCard = ({payload}) => {

    const {name, img} = payload;
    return (
        <div className="card bg-transparent mb-8 ">
        <figure>
          <img
            className="w-full h-full object-cover"
            src={img}
            alt={name}
            loading="lazy" />
        </figure>
        <div className=" bg-transparent text-center my-2 text-2xl">
          <h2 className="">
           {name}
       
          </h2>
         
        </div>
      </div>
    );
};

export default PopularCategoryCard;