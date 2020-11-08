import * as React from 'react';

type ButtonProps = {
    type: 'button' | 'submit' | 'reset';
    hasTextlabel?: boolean;
    label?: string;
    buttonLabel: string;
};

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <label className="button-label">
            {props.hasTextlabel && props.label}
            <button type={props.type}>{props.buttonLabel}</button>
        </label>
    );
};

Button.defaultProps = {
    hasTextlabel: false,
    label: '',
};
