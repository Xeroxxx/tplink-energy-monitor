import * as React from 'react';
import { Link } from 'react-router-dom';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './nav-button.module.scss';

export type NavButtonProps = {
    url: string;
    icon: IconProp;
    className?: string;
    linkText: string;
    isActive: boolean;
    isMobileButton?: boolean;
    mainButtonClass?: string;
};

export const NavButton: React.FC<NavButtonProps> = (props: NavButtonProps) => (
    <li
        className={`${styles.navButton} ${props.className || ''}${props.isActive ? styles.active : ''} ${
            props.isMobileButton ? props.mainButtonClass : ''
        }`}
    >
        <Link to={props.url}>
            <FontAwesomeIcon icon={props.icon} />
            <span className={styles.linkText}>{props.linkText}</span>
        </Link>
    </li>
);

NavButton.defaultProps = {
    isMobileButton: false,
};
