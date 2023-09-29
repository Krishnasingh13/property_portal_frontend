import React, { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import Input from "./components/Input";
import PropertyCard from "./components/PropertyCard";

const menuItems = [
  {
    name: "Home",
    href: "#",
  },
];

interface Property {
  _id: string;
  propertyImage: string;
  price: number;
  propertyName: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
}

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    availableFrom: "",
    price: "",
    propertyType: "",
  });
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fetchProperties = async () => {
    const response = await fetch(
      "http://localhost:5000/property/getAllProperties"
    );
    const result = await response.json();
    setProperties(result.properties);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const applyFilters = () => {
    const filteredProps = properties.filter(filterProperties);
    setFilteredProperties(filteredProps);
  };

  const clearFilters = () => {
    setFilters({
      city: "",
      availableFrom: "",
      price: "",
      propertyType: "",
    });
    // Clearing filters should show all properties
    setFilteredProperties([]);
  };

  const filterProperties = (property: {
    location: { city: string };
    availableFrom: string | number | Date;
    price: number;
    propertyType: string;
  }) => {
    const { city, availableFrom, price, propertyType } = filters;

    // Filter by city
    if (city && property.location.city.toLowerCase() !== city.toLowerCase()) {
      return false;
    }

    // Filter by availableFrom
    if (availableFrom) {
      const availableFromDate = new Date(property.availableFrom);
      const filterDate = new Date(availableFrom);
      if (availableFromDate > filterDate) {
        return false;
      }
    }

    // Filter by price
    if (price && property.price > parseFloat(price)) {
      return false;
    }

    // Filter by property type
    if (
      propertyType &&
      property.propertyType.toLowerCase() !== propertyType.toLowerCase()
    ) {
      return false;
    }

    return true;
  };

  const showFilteredProperties =
    filteredProperties.length > 0 || Object.values(filters).some(Boolean);

  return (
    <div>
      <div className="relative w-full bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8 mt-3">
          <div className="inline-flex items-center space-x-2">
            <span className="font-bold">HOusing</span>
          </div>
          <div className="hidden grow items-start lg:flex">
            <ul className="ml-12 inline-flex space-x-8">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                  >
                    {item.name}
                    <span>
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:hidden">
            <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
          </div>
          {isMenuOpen && (
            <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pb-6 pt-5">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center space-x-2">
                      <span className="font-bold">Logo</span>
                    </div>
                    <div className="-mr-2">
                      <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        <span className="sr-only">Close menu</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-4">
                      {menuItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-m-3 mb-1 flex items-center rounded-md text-sm font-semibold hover:bg-gray-50"
                        >
                          <span className="ml-3 text-base font-medium text-gray-900">
                            {item.name}
                          </span>
                          <span>
                            <ChevronRight className="ml-3 h-4 w-4" />
                          </span>
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-7xl mt-5 flex flex-col px-4 py-2 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold float-left mb-10">
          Search Properties for rent
        </h1>

        <div className="bg-white rounded-xl h-14 border-2 border-black flex items-center px-3 py-12">
          <div className=" flex-1 flex items-center justify-between pr-10 pl-5 space-x-7 py-10">
            <Input
              label={"City"}
              placeholder={"Enter City"}
              name={"city"}
              value={filters.city}
              onChange={(e: { target: { value: any } }) =>
                setFilters({ ...filters, city: e.target.value })
              }
            />
            <Input
              label={"Available From"}
              placeholder={"Enter Move-in Date"}
              name={"availableFrom"}
              value={filters.availableFrom}
              onChange={(e: { target: { value: any } }) =>
                setFilters({ ...filters, availableFrom: e.target.value })
              }
            />
            <Input
              label={"Price"}
              placeholder={"Enter Price Range"}
              name={"price"}
              value={filters.price}
              onChange={(e: { target: { value: any } }) =>
                setFilters({ ...filters, price: e.target.value })
              }
            />
            <Input
              label={"Property Type"}
              placeholder={"Enter Property Type"}
              name={"propertyType"}
              value={filters.propertyType}
              onChange={(e: { target: { value: any } }) =>
                setFilters({ ...filters, propertyType: e.target.value })
              }
            />
            {filteredProperties.length > 0 ? (
              <button
                onClick={clearFilters}
                className="px-7 py-3 text-xs bg-red-500 rounded-full text-white"
              >
                Remove Filter
              </button>
            ) : (
              <button
                onClick={applyFilters}
                className="px-7 py-3 bg-black rounded-full text-white"
              >
                Apply
              </button>
            )}
          </div>
        </div>

        <div className="mt-2 grid gap-6 gap-y-10 py-6 md:grid-cols-2 lg:grid-cols-3">
          {showFilteredProperties ? (
            filteredProperties.length === 0 ? (
              <p className="text-xl text-gray-500">No properties found</p>
            ) : (
              filteredProperties.map((property: Property) => (
                <PropertyCard property={property} key={property._id} />
              ))
            )
          ) : (
            properties.map((property: Property) => (
              <PropertyCard property={property} key={property._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
