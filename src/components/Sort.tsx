import { IonButton, IonInput } from '@ionic/react';
import React, { useState, useRef, useEffect } from 'react';
import './Sort.css';

interface ContainerProps {
  name: string;
}

//try force updatae
function useForceUpdate() {
  let [value, setState] = useState(true);
  return () => setState(!value);
}

const Sort: React.FC<ContainerProps> = ({ name }) => {
  //demo force uppdatge
  let forceUpdate = useForceUpdate();

  // param for the number of elements taht will be in the array
  const [numberOfElements, setNumberOfElements] = useState(5);

  //   repeat value so that no style changes when main value is changes
  const [numberOfElementsStyleInput, setNumberOfElementsStyleInput] =
    useState(numberOfElements);

  //   param for the array itself
  const [arrayOfElements, setArrayOfElements] = useState<number[]>([]);

  //ref to outer block for divention retrivals
  const outerUnit = useRef() as React.MutableRefObject<HTMLDivElement>;

  //ref for dynamic scalling of outer-unit by getting container size params
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  //const to hold max after each new array gen
  const [max, setMax] = useState<number>(0);

  let myRefs: any = useRef([]);

  // test useState for div dimentions
  const [_heigth, set_heigth] = useState(0);

  // generate array oif random number in range of block size and of count user input
  const generateArrayOfnumbers = (numOfElements: number): number[] => {
    let tempArray: number[] = [];

    for (let index = 0; index < numOfElements; index++) {
      let num: number = Math.floor(Math.random() * 47 + 3);
      tempArray[index] = num;
    }

    return tempArray;
  };

  //get max value of array for scale neededs
  function getMax(array: number[]) {
    return array.reduce((a, b) => {
      return Math.max(a, b);
    });
  }

  function wait(ms: any) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  //n^2
  // Creating the bblSort function
  function bubbleSort(array: number[]) {
    var i;
    var j;
    for (i = 0; i < array.length; i++) {
      // Last i elements are already in place
      for (j = 0; j < array.length - i - 1; j++) {
        // Checking if the item at present iteration
        // is greater than the next iteration

        if (array[j] > array[j + 1]) {
          // If the condition is true then swap them
          var temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
        setTimeout(() => {
          forceUpdate();
        }, 2000);
        clearTimeout();
      }
    }
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
                height: window.innerHeight * 0.4 + 'px',
                width: window.innerWidth * 0.65 + 'px',
                position: 'relative',
              }
        }
      >
        {/* {arrayOfElementsHeights.map((current_h, index) => {
          let temp_array_H: number[] = [];

          return setArrayOfElementsHeights();
        })} */}
        {arrayOfElements.map((currentElement, index) => {
          return (
            <div
              ref={(ele: any) => (myRefs.current[index] = ele)}
              key={index}
              id={'inner-unit-' + index}
              className="inner-unit-class"
              block-value={arrayOfElements[index]}
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
                        arrayOfElements[index] +
                      _heigth +
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
              <h3>{arrayOfElements[index]}</h3>
            </div>
          );
        })}
      </div>
      <IonInput
        type="number"
        value={numberOfElements}
        placeholder="Enter Number"
        className="input-num"
        onIonChange={(e) => setNumberOfElements(parseInt(e.detail.value!, 10))}
      ></IonInput>
      <IonButton
        onClick={() => {
          const data = generateArrayOfnumbers(numberOfElements);
          setArrayOfElements(data);
          setMax(0);
          setMax(getMax(data));
          setNumberOfElementsStyleInput(numberOfElements);
        }}
      >
        Random generate
      </IonButton>
      <IonButton
        onClick={() => {
          bubbleSort(arrayOfElements);
        }}
      >
        Bubble Sort
      </IonButton>
      <section className="info-section">
        <h1>Bubble Sort algorithm using JavaScript</h1>
        <p>
          Bubble sort algorithm is an algorithm that sorts the array by
          comparing two adjacent elements and swaps them if they are not in the
          intended order. Here order can be anything like increasing order or
          decreasing order.
        </p>
        <h2>How Bubble-sort works</h2>
        <p>
          We have an unsorted array arr = [ 1, 4, 2, 5, -2, 3 ] the task is to
          sort the array using bubble sort. Bubble sort compares the element
          from index 0 and if the 0th index is less than 1st index then the
          values get swapped and if the 0th index is less than the 1st index
          then nothing happens. then, the 1st index compares to the 2nd index
          then the 2nd index compares to the 3rd, and so on…
        </p>
      </section>
      <br />
    </div>
  );
};

export default Sort;
