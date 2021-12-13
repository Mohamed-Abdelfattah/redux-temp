import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  //
  const dummyProducts = [
    {
      id: 'p1',
      title: 'Orange',
      price: 6,
      description: 'This is a first product - amazing!',
    },
    {
      id: 'p2',
      title: 'Apple',
      price: 8,
      description: 'This is a second product - amazing!',
    },
  ];

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummyProducts.map((prod) => (
          <ProductItem key={prod.id} product={prod} />
        ))}
      </ul>
    </section>
  );
};

export default Products;
