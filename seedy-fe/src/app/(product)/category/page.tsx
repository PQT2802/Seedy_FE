"use client";
import { useState, useEffect } from "react";
import styles from "./category.module.css";
import productApiRequest, { Product } from "@/apiRequests/products";
import CategoryFilter from "@/components/category/category-filter/categoryFilter";
import PriceFilter from "@/components/category/price-filter/priceFilter";
import ProductItem from "@/components/category/product-item/productItem";
import Header from "@/components/header/header";

export default function Category() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApiRequest.getAllProducts();
        console.log("API Response:", response);

        if (response.statusCode === 200 && response.extensions.data) {
          console.log(response);
          setProducts(response.extensions.data);
        } else {
          console.error(
            "Error fetching products:",
            response.extensions.message
          );
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory =
      selectedCategory === "ALL" || product.category === selectedCategory;
    return matchesPrice && matchesCategory;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const categories = [
    { id: "ALL", label: "TẤT CẢ" },
    { id: "PAPER", label: "PAPER" },
    { id: "ENVELOPE", label: "ENVELOPE" },
    { id: "ACCESSORIES", label: "ACCESSORIES" },
    { id: "CUSTOMIZE", label: "CUSTOMIZE" },
  ];

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className={styles.categoryNav}>
          {categories.map((category) => (
            <CategoryFilter
              key={category.id}
              id={category.id}
              label={category.label}
              isSelected={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
            />
          ))}
        </div>

        <h1 className={styles.title}>TẤT CẢ</h1>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <h3 className={styles.filterTitle}>Filter</h3>
            <PriceFilter
              min={0}
              max={150000}
              value={priceRange}
              onChange={setPriceRange}
            />
          </aside>

          <div className={styles.productGrid}>
            {loading ? (
              <p>Loading products...</p>
            ) : paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
