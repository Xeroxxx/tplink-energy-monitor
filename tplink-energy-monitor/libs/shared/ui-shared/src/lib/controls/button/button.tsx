import * as React from 'react';
import styles from './button.module.scss';

type ButtonProps = {
    type: 'button' | 'submit' | 'reset';
    buttonStyle: 'primary' | 'secondary';
    hasTextlabel?: boolean;
    label?: string;
    buttonLabel: string;
    onClick: () => void;
};

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => (
    <label className="button-label">
        {props.hasTextlabel && props.label}
        <button className={styles[props.buttonStyle]} type={props.type} onClick={props.onClick}>
            {props.buttonLabel}
        </button>
    </label>
);

Button.defaultProps = {
    hasTextlabel: false,
    label: '',
};
