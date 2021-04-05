import * as React from 'react';
import { Card } from '../card';
import { useHistory } from 'react-router-dom';
import styles from '../card.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlug } from '@fortawesome/free-solid-svg-icons';

type NavigationCardProps = {
  link: string;
  subHeadline: string;
}

export const NavigationCard: React.FC<NavigationCardProps> = (props: NavigationCardProps) => {
  const history = useHistory();
 return (
   <Card
     type="power-card"
     className={`${styles.navigationCard} flex-col`}
     flexType="col"
     onClick={() => setTimeout(() => history.push(props.link), 250)}
   >
     <div className={`flex-row flex-center ${styles.navIcon}`}>
       <FontAwesomeIcon icon={faPlug} />
     </div>
      <div className={styles.navLinkText}><span>{props.subHeadline}</span></div>
   </Card>
 );
};
