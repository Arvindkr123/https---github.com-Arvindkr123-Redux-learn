import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'P1',
    title: 'My First Book',
    price: 6,
    description: 'The first book I ever worte!!'
  },
  {
    id: 'P2',
    title: 'Harry Porter',
    price: 5,
    description: 'This is magical based books you ever read before!!'
  },
  {
    id: 'P3',
    title: 'Ramayan',
    price: 15,
    description: 'This book is based on good personality of Ram Bhagwan, this is awesome book you ever read before '
  },

]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          DUMMY_PRODUCTS.map((item) => {
            return <ProductItem
              id={item.id}
              key={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
            />
          })
        }
      </ul>
    </section>
  );
};

export default Products;
