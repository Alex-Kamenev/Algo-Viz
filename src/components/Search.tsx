import { IonButton, IonInput } from '@ionic/react';
import React, { useState, useRef } from 'react';
import './Sort.css';

interface ContainerProps {
  name: string;
}
const Search: React.FC<ContainerProps> = ({ name }) => {
  // param for the number of elements taht will be in the array
  const [numberOfElements, setNumberOfElements] = useState(5);

  //   repeat value so that no style changes when main value is changes
  const [numberOfElementsStyleInput, setNumberOfElementsStyleInput] =
    useState(numberOfElements);

  //   param for the array itself
  const [arrayOfElements, setArrayOfElements] = useState<number[]>([
    0, 1, 2, 3,
  ]);

  const [startDisplay, setStartDisplay] = useState<boolean>(false);

  //ref to outer block for divention retrivals
  const outerUnit = useRef() as React.MutableRefObject<HTMLDivElement>;

  //ref for dynamic scalling of outer-unit by getting container size params
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  //const to hold max after each new array gen
  const [max, setMax] = useState<number>(0);

  // generate array oif random number in range of block size and of count user input
  const generateArrayOfnumbers = async (
    numOfElements: number
  ): Promise<number[]> => {
    let tempArray: number[] = [];

    for (let index = 0; index < numOfElements; index++) {
      let num: number = Math.floor(Math.random() * 47 + 3);
      tempArray[index] = num;
    }

    tempArray.sort((a, b) => a - b);
    return tempArray;
  };

  //get max value of array for scale neededs
  function getMax(array: number[]) {
    return array.reduce((a, b) => {
      return Math.max(a, b);
    });
  }

  //Main return
  return (
    <div className="container" ref={containerRef}>
      <strong>{name}</strong>

      <div
        id="outer-unit"
        className="outer-unit-class"
        ref={outerUnit}
        style={
          window.innerHeight > 1024
            ? {
                height: window.innerHeight * 0.6 + 'px',
                width: window.innerWidth * 0.6 + 'px',
                position: 'relative',
              }
            : {
                height: window.innerHeight * 0.55 + 'px',
                width: window.innerWidth * 0.6 + 'px',
                position: 'relative',
              }
        }
      >
        {startDisplay &&
          arrayOfElements.map((currentElement, index) => {
            return (
              <div
                key={index}
                id={'inner-unit-' + index}
                className="inner-unit-class"
                style={{
                  position: 'absolute',
                  left:
                    (outerUnit.current.clientWidth /
                      numberOfElementsStyleInput) *
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
                    ? outerUnit.current.clientWidth /
                        numberOfElementsStyleInput -
                      (outerUnit.current.clientWidth / 100) * 1.5 +
                      'px'
                    : '',
                  backgroundColor: '#db7420',
                }}
              >
                <h5 className="number-display">{currentElement}</h5>
              </div>
            );
          })}
      </div>
      <IonInput
        type="number"
        value={numberOfElements}
        placeholder="Enter Number"
        className="input-num"
        onIonChange={(e) => {
          let myNum = parseInt(e.detail.value!, 10);
          if (myNum > 25) {
            setNumberOfElements(25);
          } else if (myNum < 0) {
            setNumberOfElements(0);
          } else {
            setNumberOfElements(myNum);
          }
        }}
      ></IonInput>
      <IonButton
        className="input-num"
        onClick={() => {
          generateArrayOfnumbers(numberOfElements).then((data) => {
            setArrayOfElements(data);
            setMax(0);
            setMax(getMax(data));
            setNumberOfElementsStyleInput(numberOfElements);
            setStartDisplay(true);
          });
        }}
      >
        Generate Sorted Array
      </IonButton>
    </div>
  );
};

export default Search;
