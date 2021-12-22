import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <h1>Algorithms Visualizer</h1>
      <br />
      <strong>Brief</strong>
      <p>
        This project is a work in progress. Having said that let's get into the
        purpose and main target audience of the application.
      </p>
      <br />
      <strong>Purpose</strong>
      <p>
        Allow users to undestand how algorithms work by providing controlled
        visual examples. It is my believe that when learning new information the
        ability to play around with it and see for yourself how it actually work
        is a vital part of making the pledge yours.
      </p>
      <br />
      <strong>Target Audience</strong>
      <p>
        Students of algorithms and the theory around the topic of all ages. With
        a focus on young learners mainly ones still in middle and high school.
      </p>
      <br />
      <strong>Want to get involved?</strong>
      <p>
        This project is open to all who wish to contribute. Repo:{' '}
        <a href="https://github.com/Alex-Kamenev/Algo-Viz">algo-viz</a>
      </p>
      <strong>Do to</strong>
      <p>
        <ol>
          <li>Implement Binary Sort and Search</li>
          <li>
            Clean up code base and modularize components for reusability and
            eaase of understanding
          </li>
          <li>
            Add functionality to menu in form of drop downs and selection
            between different algorithms
          </li>
          <li>
            Implement other well know algorithms for sorting and seraching
          </li>
        </ol>
      </p>
      <br />
      <strong>Contributors</strong>
      <h5>Aleksandar Kamenev</h5>
    </div>
  );
};

export default ExploreContainer;
