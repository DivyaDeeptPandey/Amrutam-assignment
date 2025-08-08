// client/src/sections/FeaturedCategories/FeaturedCategories.jsx
import styles from './FeaturedCategories.module.css';
import CategoryCard from '../../components/CategoryCard/CategoryCard.jsx';
import hairCareImage from '../../assets/categories/haircare.webp';

const categories = [
  {
    title: 'Hair Care',
    imageUrl: hairCareImage,
    link: '/category/hair-care',
  },
  {
    title: 'Skin Care',
    imageUrl: '/assets/categories/haircare.webp',
    link: '/category/skin-care',
  },
  {
    title: 'Health & Wellness',
    imageUrl: '/assets/categories/haircare.webp',
    link: '/category/health-wellness',
  },
  {
    title: 'Personal Hygiene',
    imageUrl: '/assets/categories/haircare.webp',
    link: '/category/personal-hygiene',
  },
];

const FeaturedCategories = () => {
  return (
    <section className={styles.featuredCategories}>
      <h2 className={styles.heading}>Featured Categories</h2>
      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <CategoryCard key={category.title} category={category} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
