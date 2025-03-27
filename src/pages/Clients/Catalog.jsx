import { useEffect, useState } from "react";
import SmartSpinner from "../Both/SmartSpinner";
import axios from "axios";
import ProductCard from "./ProductCard";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://fastapi-app-production-f08f.up.railway.app/arrangements/")
      .then((response) => setProducts(response.data))
      .catch(() => setError("Error al cargar los arreglos."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <SmartSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
