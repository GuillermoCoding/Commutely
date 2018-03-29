import React from 'react';
import styles from '../styles/AutoCompleteResults.css';

const AutoCompleteResults = ({isOpen, results, getItemProps, highlightedIndex})=>{
  if (isOpen) {
    return (
      <div className={styles.results}>
        {results.map((result,index)=>{
          return (
            <div 
              className={styles.item} 
              key={index}
              {...getItemProps({item: result})}
              style={{backgroundColor: index==highlightedIndex?'rgb(179, 255, 224)':'white'}}
            >
              {result}
            </div>
          );
        })}  
      </div>
    );
  } else {
    return null;
  }
};

export default AutoCompleteResults;