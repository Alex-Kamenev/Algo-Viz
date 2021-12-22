import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>Notes</strong>
      <p>
        Main Area for display of algo viz (Maybe use D3 or canvas to display
        shapes and then based on algo steps perform changes to shapes).
      </p>
      <br />
      <strong>Sort</strong>
      <p>
        Show bar chart with number of bars based on user input. For each step in
        algo move bar to correct position as per step indication and use color
        to highlight.
      </p>
      <br />
      <p>
        For graph algo show vertices as circles and edges as lines. Of some
        traversal is done use color to indicate what is going on and use arros
        next to edges (not yet clear on implementation).
      </p>
    </div>
  );
};

export default ExploreContainer;
