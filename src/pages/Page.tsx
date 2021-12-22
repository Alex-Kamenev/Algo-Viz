import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import Search from '../components/Search';
import Sort from '../components/Sort';
import './Page.css';

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar className="toolbar-color">
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Main content
          Use two diferent components for serach and sort and then use prop driven logic for smaller changes */}
      <IonContent fullscreen>
        <IonHeader collapse="condense"></IonHeader>
        {name === 'Info' && <ExploreContainer name={name} />}
        {name === 'Sort' && <Sort name={name} />}
        {name === 'Search' && <Search name={name} />}
      </IonContent>

      <IonFooter>
        <IonToolbar className="toolbar-color">
          <IonButtons slot="end">
            {name !== 'Info' && (
              <IonBackButton defaultHref="/" className="button-back" />
            )}
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Page;
