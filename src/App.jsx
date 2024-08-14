import React, { useState, useEffect } from 'react';
import Card from './components/cards/card';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [brandFilter, setBrandFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("a-z");

  useEffect(() => {
    fetch('http://localhost:3000/0')
      .then(resp => resp.json())
      .then(data => {
        setProducts(data.All);
        setFilteredProducts(data.All); 
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let filtered = products;

    if (categoryFilter !== "All") {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    if (brandFilter !== "All") {
      filtered = filtered.filter(product => product.brand === brandFilter);
    }

    if (sortOrder === "a-z") {
      filtered.sort((a, b) => a.name > b.name ? 1 : -1);  
    } else if (sortOrder === "z-a") {
      filtered.sort((a, b) => a.name < b.name ? 1 : -1); 
    } else if (sortOrder === "high") {
      filtered.sort((a, b) => b.price - a.price);  
    } else if (sortOrder === "low") {
      filtered.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(filtered);
  }, [categoryFilter, brandFilter, sortOrder, products]);

  return (
    <>
      <div className="container">
        <div className="filterpage">
          <div className="forminn">
            <div className="forminput">
              <form>
                <br />
                <label>Search product</label>
                <br />
                <input type="text" />
              </form>
            </div>

            <div className="forminput">
              <form>
                <br />
                <label>Select category</label>
                <br />
                <select onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option value="All">All</option>
                  <option value="Tables">Tables</option>
                  <option value="Chairs">Chairs</option>
                  <option value="Kids">Kids</option>
                  <option value="Sofas">Sofas</option>
                  <option value="Beds">Beds</option>
                </select>
              </form>
            </div>

            <div className="forminput">
              <form>
                <br />
                <label>Select brand</label>
                <br />
                <select onChange={(e) => setBrandFilter(e.target.value)}>
                  <option value="All">All</option>
                  <option value="Modenza">Modenza</option>
                  <option value="Luxora">Luxora</option>
                  <option value="Kids">Kids</option>
                  <option value="Artifex">Artifex</option>
                  <option value="Comfora">Comfora</option>
                  <option value="Homestead">Homestead</option>
                </select>
              </form>
            </div>

            <div className="forminput">
              <form>
                <br />
                <label>Sort by</label>
                <br />
                <select onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="a-z">a-z</option>
                  <option value="z-a">z-a</option>
                  <option value="high">high</option>
                  <option value="low">low</option>
                </select>
              </form>
            </div>
          </div>
          <br />

          <div className="forminn">
            <div className="forminput">
              <form>
                <label>
                  Select Price <span className="spanone">$520.00</span>
                </label>
                <br />
                <input type="range" />
                <br />
                <label>
                  0<span className="spantwo">Max$1,000.00</span>
                </label>
              </form>
            </div>

            <div className="forminput">
              <form>
                <label className="free">Free shipping</label>
                <br />
                <input type="checkbox" />
              </form>
            </div>

            <div className="forminput">
              <form>
                <button className="srch">Search</button>
              </form>
            </div>

            <div className="forminput">
              <form>
                <button className="rst">Reset</button>
              </form>
            </div>
          </div>
        </div>

        <div className="carddf">
          {filteredProducts.map((product, index) => (
            <Card key={index} data={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
