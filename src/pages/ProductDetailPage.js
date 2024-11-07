import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5125/api/v1/VideoGamesInfo/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  const consoleName = product.consoles.map(c => c.consoleName).join(', ');
  const categoryNames = product.categories.map(category => category.categoryName).join(', '); 
  const GameStudios = product.gameStudios.map(Studio => Studio.studioName).join(', '); 

  return (
    <div className="product-detail">
      <p><h1>{product.gameName}</h1>
      {product.description}
      <br/>Year Of Release: {product.yearOfRelease}
      <br/>Total Rating: {product.totalRating}
      <br/>Console: {consoleName}
      <br/>Categories: {categoryNames} 
      <br/>Studios: { GameStudios}
     <button className='BacktoProducts'><Link to="/Games">Back to Products</Link></button> </p>
     <img src={product.gamePicturePath} alt={product.gameName} />
    </div>
  );
}

export default ProductDetailPage;

