import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const productResponse = await fetch(
          `http://localhost:8000/api/products/${id}`
        );
        if (!productResponse.ok)
          throw new Error("Failed to fetch product data");

        const productData = await productResponse.json();
        const product = productData.data;

        const [categoryResponse, relatedProductsResponse] = await Promise.all([
          fetch(`http://localhost:8000/api/categories/${product.category_id}`),
          fetch("http://localhost:8000/api/products"),
        ]);

        if (!categoryResponse.ok)
          throw new Error("Failed to fetch category data");
        if (!relatedProductsResponse.ok)
          throw new Error("Failed to fetch related products data");

        const categoryData = await categoryResponse.json();
        const relatedProductsData = await relatedProductsResponse.json();

        const filteredRelatedProducts = relatedProductsData.data.filter(
          (relatedProduct) =>
            relatedProduct.category_id === product.category_id &&
            relatedProduct.id !== product.id
        );

        setProduct(product);
        setCategoryName(categoryData.data.category_name);
        setRelatedProducts(filteredRelatedProducts);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  const formatToRupiah = useCallback((price) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(price).replace("IDR", "Rp");
  }, []);

  if (loading) {
    return (
      <div className="w-3/4 h-screen mx-auto text-4xl flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-3/4 mx-auto">
      <h3 className="text-lg font-bold my-8">{product.product_name}</h3>
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <img
          className="shadow-2xl rounded-xl aspect-square sm:w-1/2 lg:w-1/3"
          src={product.image}
          alt={product.product_name}
        />
        <div className="lg:w-1/2 my-4 lg:my-0 self-start text-lg font-bold">
          <h2>
            Kategori: <span className="font-normal">{categoryName}</span>
          </h2>
          <h5 className="lg:my-2">
            Berat: <span className="font-normal">500 gr</span>
          </h5>
          <p>
            Harga:{" "}
            <span className="font-normal">{formatToRupiah(product.price)}</span>
          </p>
        </div>
      </div>
      <div className="lg:w-3/4">
        <h1 className="text-lg font-bold my-4">Deskripsi Produk</h1>
        <p>{product.description}</p>
      </div>
      <div>
        <h1 className="text-lg font-bold my-8">Produk Serupa</h1>
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))
          ) : (
            <p>Tidak ada produk serupa.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
