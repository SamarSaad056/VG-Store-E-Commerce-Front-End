import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // to fetch data
import Filter from "../Components/Filter";
import { Link } from "react-router-dom";
import searchIcon from '../search.png';
import { Margin } from "@mui/icons-material";


function ProductPage({ cartItems, setCartItems }) {
  const url = "https://fusiontech1.onrender.com/api/v1/videoGamesInfo/Detailed";
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [scoreRange, setScoreRange] = useState([0, 500]);
  const [notification, setNotification] = useState("");
  const [Categories, setCategories] = useState([]);
  const [consoles, setConsoles] = useState([]);
  const url2="https://fusiontech1.onrender.com/api/v1/Categories/Detailed";

  function getData() {
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.videoGamesInfos);
        const prices = response.data.videoGamesInfos.map(
          (product) => product.videoGameVersions[0].price
        );
        if (prices.length > 0) {
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setScoreRange([minPrice, maxPrice]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to Fetch Data");
        setLoading(false);
      });
  }

  // Fetch Consoles and Categories
  function getConsolesAndCategories() {
    axios
      .get(url2) // Adjust this URL to your actual endpoint for consoles and categories
      .then((response) => {
        const consolesData = response.data.consoles; 
        const categoriesData = response.data.categories; 
        console.log(categoriesData);

        if (consolesData) {
          setConsoles(consolesData);
        }
        if (categoriesData) {
          setCategories(categoriesData);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching console and category data:", error);
        setError("Failed to Fetch Consoles and Categories");
        setLoading(false);
      });
    }
  useEffect(() => {
    getData(); getConsolesAndCategories();
  }, []);

  const handleFilterChange = (platforms, genres, scoreRange) => {
    setSelectedPlatforms(platforms);
    setSelectedGenres(genres);
    setScoreRange(scoreRange);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.gameName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
 // Create an array of console names
 const consoleNames = product.consoles ? product.consoles.map(c => c.consoleName) : [];

 // Create an array of category names
 const categoryNames = product.categories ? product.categories.map(category => category.categoryName) : [];
 //console.log(consoleNames)
 console.log(categoryNames)
 // Check if the product matches the selected platforms
 const matchesPlatform =
   selectedPlatforms.length === 0 || // No platform selected, include all
   consoleNames.some(consoleName => selectedPlatforms.includes(consoleName)); // Check each console name

 // Check if the product matches the selected genres
 const matchesGenre =
   selectedGenres.length === 0 || // No genre selected, include all
   categoryNames.some(categoryName => selectedGenres.includes(categoryName)); // Check each category name

    const matchesScore =
      product.videoGameVersions[0].price !== undefined &&
      product.videoGameVersions[0].price >= scoreRange[0] &&
      product.videoGameVersions[0].price <= scoreRange[1];

    return matchesSearchTerm && matchesPlatform && matchesGenre && matchesScore;
  });

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.videoGameInfoId === product.videoGameInfoId
      );
      if (existingItem) {
        const updatedItems = prevItems.map((item) =>
          item.videoGameInfoId === product.videoGameInfoId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedItems)); // Update localStorage
        return updatedItems;
      }
      const newItems = [...prevItems, { ...product, quantity: 1 }];
      localStorage.setItem("cartItems", JSON.stringify(newItems)); // Update localStorage
      return newItems;
    });
    alert("Game Added to Cart !")
  };
  
  

  return (
    <div className="ProductPageDiv">
       <div className="ContentWrapper">
       <div className="SearchDiv">
      <h2>Explore our Games</h2>
      <input
        type="text"
        placeholder="Search Games..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchInput"
      />

    
        <Filter onFilterChange={handleFilterChange} />
        </div>
        
        <div className="ProductList">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.videoGameInfoId} className="product">
                <div class="image-container">
                  <img
                    src={product.gamePicturePath}
                    alt={product.gameName}
                    className="GameImage"
                  ></img>
                </div>

                <h3>{product.gameName}</h3>
                <p>Price: {product.videoGameVersions[0].price} S.R</p>
                <p>Total Rating: {product.totalRating}</p>
                <button className="ViewDetails">
                  <Link to={`/GameDetail/${product.videoGameInfoId}`}>
                    View Details
                  </Link>
                </button>
                <button
                  onClick={() => addToCart(product)}
                  className="AddToCart"
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <div className="Noproductsfound">
            <div className="image-container"><img src={searchIcon}></img></div>
            </div>
          )}
        </div>
        </div>
      </div>
      
   
  );
}

export default ProductPage;
