import { IonButton, IonInput } from '@ionic/react';
import React, { useState, useRef, useEffect } from 'react';
import './Sort.css';

interface ContainerProps {
  name: string;
}

const Sort: React.FC<ContainerProps> = ({ name }) => {
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

  //state to be used for color change
  const [color, setColor] = useState<any>(-1);

  //state to be used for color change
  const [ableButton, setAbleButton] = useState<boolean>(true);

  let myRefs: any = useRef([]);

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

  // encapsulate setTimeout in a promise, so we can await it below
  const wait = (timeout: any) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  //n^2
  // Creating the bblSort function
  async function bubbleSort(array: number[]) {
    setAbleButton(true);
    let isSorted = false;
    while (!isSorted) {
      isSorted = true;
      for (let i = 0; i < array.length - 1; i++) {
        await wait(1000);
        setColor(i);

        if (array[i] > array[i + 1]) {
          [array[i], array[i + 1]] = [array[i + 1], array[i]];
          isSorted = false;
          await wait(1000);
          setColor(i + 1);

          setArrayOfElements(array.slice());
        }
      }
    }
    await wait(1000);
    setColor(-1);
    setAbleButton(false);
    return array;
  }

  //Main return
  return (
    <div className="container" ref={containerRef}>
      <strong>{name}</strong>
      <p>
        legent: color of bars:{' '}
        <span style={{ color: 'red', backgroundColor: 'white' }}>red</span>{' '}
        indicates swap required,{' '}
        <span style={{ color: 'green', backgroundColor: 'white' }}>red</span>{' '}
        indicates no swap required. Max input 25 and min input 0.
      </p>

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
        {/* {arrayOfElementsHeights.map((current_h, index) => {
          let temp_array_H: number[] = [];

          return setArrayOfElementsHeights();
        })} */}
        {arrayOfElements.map((currentElement: any, index) => {
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
                      'px'
                    : '',
                width: outerUnit.current
                  ? outerUnit.current.clientWidth / numberOfElementsStyleInput -
                    (outerUnit.current.clientWidth / 100) * 1.5 +
                    'px'
                  : '',
                backgroundColor:
                  color === index
                    ? arrayOfElements[index] > arrayOfElements[index + 1]
                      ? '#FF1111'
                      : '#127420'
                    : '#db7420',
              }}
            >
              <h3 className="number-display">{arrayOfElements[index]}</h3>
            </div>
          );
        })}
      </div>
      <IonInput
        type="number"
        value={numberOfElements}
        placeholder="Enter Number"
        className="input-num"
        min="0"
        max="25"
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
          const data = generateArrayOfnumbers(numberOfElements);
          setArrayOfElements(data);
          setMax(0);
          setMax(getMax(data));
          setNumberOfElementsStyleInput(numberOfElements);
          setAbleButton(false);
        }}
      >
        Generate Random Array
      </IonButton>
      <IonButton
        className="input-num"
        disabled={ableButton}
        onClick={() => {
          bubbleSort(arrayOfElements.slice());
        }}
      >
        Use Bubble Sort to Sort Array
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
          We have an unsorted array. The task is to sort the array using bubble
          sort. Bubble sort compares the element from index 0 and if the 0th
          index is less than 1st index then the values get swapped and if the
          0th index is less than the 1st index then nothing happens. then, the
          1st index compares to the 2nd index then the 2nd index compares to the
          3rd, and so on…
        </p>
      </section>
      <br />
    </div>
  );
};

export default Sort;
