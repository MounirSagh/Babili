import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Checkbox } from "@/components/ui/checkbox";
import Select from "react-select";

type SubCategory = {
  _id: string;
  name: string;
  categoryID: string;
  image: string;
};

interface Category {
  _id: string;
  name: string;
}

export default function Component() {
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<SubCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { user, isLoaded } = useUser();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role === "admin") {
      navigate("/Admin/Dashboard");
    }
  }, [isLoaded, user, navigate]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/categories/getcategories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/subcategories/getsubcategories");
      setSubcategories(response.data);
      setFilteredSubcategories(response.data); // Show all by default
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const applyFilters = () => {
    const filtered = subcategories.filter(
      (subcategory) =>
        subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(subcategory.categoryID))
    );
    setFilteredSubcategories(filtered);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSelectChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setSelectedCategories(selectedValues);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main>
        {/* Hero Section */}
        <div className="relative h-[650px] md:h-[850px] overflow-hidden">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="src/assets/vid001.mp4"
            autoPlay
            loop
            muted
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-gradient-to-t from-black via-transparent to-black/30 p-8">
            <h2 className="text-2xl md:text-4xl font-medium mb-2">Explore the Colourful World</h2>
            <div className="w-32 md:w-52 h-[2px] bg-blue-500 mb-4"></div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
              A WONDERFUL GIFT
            </h1>
            <button className="px-6 py-3 text-lg font-semibold bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300 shadow-lg">
              LEARN MORE
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto px-4 py-8 flex flex-col md:flex-row gap-10 bg-gradient-to-b from-white via-white to-blue-100">
          {/* Filters */}
          <aside className="w-full md:w-1/4 p-4 border-r rounded-md mb-6 md:mb-0 overflow-hidden">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            {/* Search */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <Input
                type="text"
                placeholder="Search subcategories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
              {isMobile ? (
                <Select
                  isMulti
                  options={categories.map((category) => ({
                    value: category._id,
                    label: category.name,
                  }))}
                  onChange={handleSelectChange}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              ) : (
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category._id} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedCategories.includes(category._id)}
                        onCheckedChange={() => handleCategoryChange(category._id)}
                      />
                      <span className="text-sm">{category.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button
              onClick={applyFilters}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-all"
            >
              Apply Filters
            </Button>
          </aside>

          {/* Subcategories */}
          <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSubcategories.map((subcategory) => (
              <Card
                key={subcategory._id}
                className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <img
                    src={subcategory.image}
                    alt={subcategory.name}
                    className="w-full h-48 object-cover rounded-t-md"
                    onError={(e) => {
                      e.currentTarget.src = "/path-to-placeholder.jpg";
                    }}
                  />
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-lg font-semibold">{subcategory.name}</CardTitle>
                  <p className="text-sm text-gray-600">
                    {categories.find((category) => category._id === subcategory.categoryID)?.name}
                  </p>
                </CardContent>
                <CardFooter className="p-4 mt-auto">
                  <Button
                    onClick={() =>
                      navigate("/Details", { state: { product: subcategory } })
                    }
                    className="w-full bg-blue-500 text-white hover:bg-blue-600 transition"
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}