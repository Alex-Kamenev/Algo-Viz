import { IonButton, IonInput } from '@ionic/react';
import React, { useState, useRef } from 'react';
import './Search.css';

// interface ContainerProps {
//   name: string;
// }
export const Bars: React.FC<any> = ({
  arrayOfElements,
  outerUnit,
  numberOfElementsStyleInput,
  max,
}) => {
  return (
    <>
      {arrayOfElements.map((currentElement: any, index: any) => {
        return (
          <div
            key={index}
            id={'inner-unit-' + index}
            className="inner-unit-class"
            style={{
              position: 'absolute',
              left:
                (outerUnit.current.clientWidth / numberOfElementsStyleInput) *
                  index +
                'px',
              bottom: '0',
              marginLeft: outerUnit.current.clientWidth * 0.006,
              marginRight: outerUnit.current.clientWidth * 0.0015,
              height:
                outerUnit.current && max
                  ? ((outerUnit.current.clientHeight -
                      outerUnit.current.clientHeight * 0.1) /
                      max) *
                      currentElement +
                    'px'
                  : '',
              width: outerUnit.current
                ? outerUnit.current.clientWidth / numberOfElementsStyleInput -
                  (outerUnit.current.clientWidth / 100) * 1.5 +
                  'px'
                : '',
              backgroundColor: '#db7420',
            }}
          >
            <h3>{currentElement}</h3>
          </div>
        );
      })}
    </>
  );
};
