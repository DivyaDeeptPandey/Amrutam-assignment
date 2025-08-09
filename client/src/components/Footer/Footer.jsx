import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './Footer.module.css';

const navColumns = [
  {
    title: 'Shop',
    id: 'footer-shop',
    links: [
      { label: 'Products', href: '/products' },
      { label: 'Offers', href: '/offers' },
      { label: 'Bestsellers', href: '/bestsellers' },
    ],
  },
  {
    title: 'About Us',
    id: 'footer-about',
    links: [
      { label: 'Our Story', href: '/our-story' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
    ],
  },
];

const socials = [
  { name: 'Instagram', href: 'https://instagram.com/amrutam', iconClass: 'fa-brands fa-instagram' },
  { name: 'Facebook', href: 'https://facebook.com/amrutam', iconClass: 'fa-brands fa-facebook' },
  { name: 'X (Twitter)', href: 'https://twitter.com/amrutam', iconClass: 'fa-brands fa-x-twitter' },
];

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Footer = () => {
  const year = new Date().getFullYear();
  const reduceMotion = useReducedMotion();

  return (
    <motion.footer
      className={styles.footer}
      variants={variants}
      initial={reduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      transition={reduceMotion ? undefined : { duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.column}>
          <h2 className={styles.logo}>
            <a href="/" aria-label="Amrutam Home">Amrutam</a>
          </h2>
        </div>

        {/* Navigation Columns */}
        {navColumns.map(({ id, title, links }) => (
          <nav key={id} className={styles.column} aria-labelledby={id}>
            <h3 className={styles.columnTitle} id={id}>{title}</h3>
            <ul className={styles.linkList}>
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a className={styles.link} href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* Social Links */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle} id="footer-follow">Follow Us</h3>
          <ul className={styles.socials} aria-labelledby="footer-follow">
            {socials.map(({ name, href, iconClass }) => (
              <li key={name}>
                <a
                  className={styles.socialLink}
                  href={href}
                  aria-label={name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={iconClass} aria-hidden="true"></i>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.bottom}>
        © {year} Amrutam. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default memo(Footer);
