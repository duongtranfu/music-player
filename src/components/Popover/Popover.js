import React from 'react';
import styles from './popover.module.scss';

export const Popover = ({target, content}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.trigger}>
        {target}
      </div>
      <div className={styles.content}>
        {content}
      </div>
    </div>
  );
}