import React, { useEffect, useState } from 'react';
import Container from '../components/container/container.component';
import { IoSearch } from "react-icons/io5";
import axios from 'axios';


const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selectPrice, setSelectPrice] = useState(false);
  const [selectCateg, setSelectCateg] = useState(false);
  const [selectPriceIndex, setSelectPriceIndex] = useState(0);
  const [selectCategIndex, setSelectCategIndex] = useState(0);
  const [checkIdxPrice, setCheckIdxPrice] = useState(0);
  const [checkIdxCateg, setCheckIdxCateg] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchproducts = async () => {
      const { data } = await axios.get('/api/product/list');
      setProducts(data);
    };
    fetchproducts();
  }, []);

  let Price = [
    { name: '0 - 500' },
    { name: '500 - 1000' },
    { name: '1000 - 1500' },
    { name: '1500 - 3000' },
    { name: 'Todos' },
  ];

  let Category = [
    { name: 'Celulares' },
    { name: 'Fones de ouvido' },
  ];

  const handleClickPrice = (index) => {
    checkIdxPrice === index && selectPrice === true ? setSelectPrice(false) : setSelectPrice(true);
    setCheckIdxPrice(index);
    setSelectPriceIndex(index);
  };

  const handleClickCateg = (index) => {
    checkIdxCateg === index && selectCateg === true ? setSelectCateg(false) : setSelectCateg(true);
    setCheckIdxCateg(index);
    setSelectCategIndex(index);
    console.log(Category[index].name);
  };

  const lowerSearch = search.toLowerCase();

  const filterProduct = products.filter((product) => product.name.toLowerCase().includes(lowerSearch));

  return (
    <Container>
      <h2 className='filter-desc'>Filtros</h2>
      <div className='div-products'>
        <div className='div-filters'>
          <div className='box-product'>
            <h1 className='font-filters'>Preço</h1>
            <ul>
              {
                Price.map((price, index) => (
                  <li className='font-filters-items pointer-pass'>
                    <h1 key={index} onClick={(e) => handleClickPrice(index)}
                      className={`${selectPrice && index === selectPriceIndex ? 'select' : ''}`}
                    >
                      {price.name}
                    </h1>
                  </li>
                ))
              }
            </ul>
            <hr className='skyline'></hr>
            <h1 className='font-filters'>Categoria</h1>
            <ul>
              {
                Category.map((category, index) => (
                  <li className='font-filters-items pointer-pass'>
                    <h1 key={index} onClick={(e) => handleClickCateg(index)}
                      className={`${selectCateg && index === selectCategIndex ? 'select' : ''}`}
                    >
                      {category.name}
                    </h1>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div>
          <div className='container-product-list'>
            <div className='div-input-filter'>
              <input
                className='input-filter'
                type='text'
                value={search}
                placeholder='Buscar produto'
                onFocus={(e) => e.target.placeholder = ''}
                onBlur={(e) => e.target.placeholder = 'Buscar produto'}
                onChange={(ev) => setSearch(ev.target.value)}
              />
              <IoSearch className='icon-filter' />
            </div>
            <ul className='ul-products'>
              {
                filterProduct.map((product) => (
                  <li className='li-products'>
                    <div>
                      <div className='div-img-prod'>
                        <img className='img-prod' src={`/api/product/smallimage/${product._id}`} />
                      </div>
                      <hr className='skyline'></hr>
                      <h1 className='prod-desc' href={product.name}>
                        {product.name}
                      </h1>
                      <h1 className='prod-desc' href={product.price}>
                        {product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                      </h1>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Shop;
