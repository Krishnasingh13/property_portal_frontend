import React from "react";

const PropertyCard = ({ property }) => {
  return (
    <div className="border rounded-md shadow-md group overflow-hidden cursor-pointer">
      <div className=" overflow-hidden rounded-md">
        <img
          src={property.propertyImage || ""}
          className="aspect-video w-full h-full rounded-md group-hover:scale-110 transition object-cover"
          alt="Property Image"
        />
      </div>
      <div className="min-h-min p-3">
        <p className="mt-4 w-full text-[24px] font-semibold leading-tight text-gray-700">
          ₹{property.price}/<span className="text-[15px]">month</span>
        </p>
        <p className="mt-1 flex-1 text-[20px] font-semibold text-gray-900">
          {property.propertyName}
        </p>

        <p className="mt-1 w-full text-sm leading-normal text-gray-800 font-semibold ">
          {`${property.location.city} , ${property.location.state} , ${property.location.country}`}
        </p>
        <p className="mt-1 flex-1 text-[16px] font-semibold text-gray-900">
          {property.propertyType}
        </p>

        <div className="flex items-start justify-between">
          <p className="mt-1 flex-1 text-[14px] font-semibold text-gray-700">
            {`${property.bedrooms} bedrooms`}
          </p>
          <p className="mt-1 flex-1 text-[14px] font-semibold text-gray-700">
            {`${property.bathrooms} bathrooms`}
          </p>
          <p className="mt-1 flex-1 text-[14px] font-semibold text-gray-700">
            {`${property.squareFeet} sqft`}
          </p>
        </div>
        <p className="mt-1 flex-1 text-[16px] font-semibold text-gray-900">
          Available From :-{" "}
          {new Date(property.dateAvailableFrom).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          <br />
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
