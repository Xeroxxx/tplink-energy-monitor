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
};

export const NavButton: React.FC<NavButtonProps> = (props: NavButtonProps) => (
    <li className={`${styles.navButton} ${props.className || ''}${props.isActive ? styles.active : ''}`}>
        <Link to={props.url}>
            <FontAwesomeIcon icon={props.icon} />
            <span>{props.linkText}</span>
        </Link>
    </li>
);
