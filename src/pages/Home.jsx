import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { SearchContext } from "../context/SearchContext";

const Home = () => {
  const { searchQuery } = useContext(SearchContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(8); // Number of products initially visible
  const productsPerPage = 8; // Number of products to load per page

  async function fetchData(url, setStateFunc) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setStateFunc(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData("http://localhost:8000/api/products", setProducts);
    fetchData("http://localhost:8000/api/categories", setCategories);
  }, []);

  useEffect(() => {
    const filterProducts = (query) => {
      return products.filter((product) =>
        product.product_name.toLowerCase().includes(query.toLowerCase())
      );
    };

    setFilteredProducts(
      searchQuery === "" ? products : filterProducts(searchQuery)
    );
  }, [searchQuery, products]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    const filterProductsByCategory = (categoryId) => {
      return products.filter((product) => product.category_id === categoryId);
    };

    setFilteredProducts(
      categoryId === null ? products : filterProductsByCategory(categoryId)
    );
  };

  const loadMoreProducts = () => {
    setVisibleProducts(
      (prevVisibleProducts) => prevVisibleProducts + productsPerPage
    );
  };

  const renderCategoryButtons = () => {
    return (
      <>
        <button
          className={`${
            selectedCategory === null
              ? "bg-blue-600 text-white"
              : "text-blue-600 border-blue-600"
          } rounded-xl font-normal border-2 py-1 px-3 lg:py-2 lg:px-6`}
          onClick={() => handleCategoryClick(null)}
        >
          All
        </button>
        {categories.map(({ id, category_name }) => (
          <button
            key={id}
            className={`${
              selectedCategory === id
                ? "bg-blue-600 text-white"
                : "text-blue-600 border-blue-600"
            } rounded-xl font-normal border-2 py-1 px-3 lg:py-2 lg:px-6`}
            onClick={() => handleCategoryClick(id)}
          >
            {category_name}
          </button>
        ))}
      </>
    );
  };

  const renderProducts = () => {
    if (loading) {
      return (
        <h1 className="text-4xl flex justify-center items-center text-center text-black">
          LOADING...
        </h1>
      );
    } else if (filteredProducts.length > 0) {
      return filteredProducts
        .slice(0, visibleProducts)
        .map((product) => <ProductCard key={product.id} product={product} />);
    } else {
      return (
        <h1 className="text-4xl flex justify-center items-center text-center text-black">
          No products found
        </h1>
      );
    }
  };

  return (
    <main className="w-3/4 mx-auto">
      <h1 className="font-bold text-xl pt-8 pb-4">Kategori</h1>
      <section className="flex flex-wrap gap-2 md:gap-4 lg:gap-8 text-base lg:text-xl">
        {renderCategoryButtons()}
      </section>
      <h2 className="font-bold text-xl pt-8 pb-4">Daftar Produk</h2>
      <section className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {renderProducts()}
      </section>
      {filteredProducts.length > visibleProducts && (
        <section className="flex justify-center items-center my-8">
          <button
            className="bg-blue-600 text-white rounded-xl font-normal border-2 py-3 px-8"
            onClick={loadMoreProducts}
          >
            Lebih Banyak
          </button>
        </section>
      )}
    </main>
  );
};

export default Home;
