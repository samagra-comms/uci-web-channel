import React, { useState, useEffect, useRef } from 'react';
import styles from './Tabs.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const Tabs = ({ tabs }) => {
  const tabsRef = useRef(null);
  const [showScrollLeftIcon, setShowScrollLeftIcon] = useState(false);
  const [showScrollRightIcon, setShowScrollRightIcon] = useState(false);

  const updateScrollIndicators = () => {
    const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
    setShowScrollLeftIcon(scrollLeft > 0);
    setShowScrollRightIcon(scrollLeft < scrollWidth - clientWidth);
  };

  const scrollTabs = (direction) => {
    if (direction === 'left') {
      tabsRef.current.scrollLeft -= (tabsRef.current.offsetWidth / 2);
    } else {
      tabsRef.current.scrollLeft += (tabsRef.current.offsetWidth / 2);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      updateScrollIndicators();
    };

    // Initialize the indicator state
    updateScrollIndicators();

    // Update indicators upon window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Update indicators when tabs are scrolled
    const tabsEl = tabsRef.current;
    tabsEl.addEventListener('scroll', updateScrollIndicators);
    return () => tabsEl.removeEventListener('scroll', updateScrollIndicators);
  }, []);

  return (
    <div className={styles.tabsWrapper}>
      {showScrollLeftIcon && (
        <FaChevronLeft
          className={`${styles.scrollIndicator} ${styles.left}`}
          onClick={() => scrollTabs('left')}
        />
      )}
      <div className={styles.tabs} ref={tabsRef}>
        {tabs.map((tab, index) => (
          <div key={index} className={styles.tab}>{tab}</div>
        ))}
      </div>
      {showScrollRightIcon && (
        <FaChevronRight
          className={`${styles.scrollIndicator} ${styles.right}`}
          onClick={() => scrollTabs('right')}
        />
      )}
    </div>
  );
};


