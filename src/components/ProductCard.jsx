import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // Function to format price to Rupiah format
  const formatToRupiah = (price) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(price).replace("IDR", "Rp");
  };

  return (
    <Link to={`/product/${product.id}`}>
      <img
        className="shadow-2xl rounded-xl aspect-square "
        src={product.image}
        alt={product.product_name}
      />
      <h3 className="text-base font-bold py-1">{product.product_name}</h3>
      <p className="text-base">{formatToRupiah(product.price)}</p>
    </Link>
  );
};

export default ProductCard;
