// src/components/TrendingOffers/TrendingOffers.jsx
import { useEffect, useState } from 'react';
import styles from './TrendingOffers.module.css';
import OfferCard from '../../components/OfferCard/OfferCard.jsx';

const TrendingOffers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/offers/trending');
        const data = await res.json();
        setOffers(data);
      } catch (err) {
        console.error('Failed to fetch offers:', err);
      }
    };

    fetchOffers();
  }, []);

  return (
    <section className={styles.trendingOffers}>
      <h2 className={styles.heading}>🔥 Trending Offers</h2>
      <div className={styles.grid}>
        {offers.map(offer => (
          <OfferCard key={offer.slug} offer={offer} />
        ))}
      </div>
    </section>
  );
};

export default TrendingOffers;
