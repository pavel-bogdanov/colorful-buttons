import React from 'react';
import styles from './Button.module.css';

const Button = (props) => {

    const classes = ['col-md-3', styles.Button].join(' ')

    return (
        <div className={classes} style={
            {
                backgroundColor: props.backgroundColor,
                color: props.textColor,
            }} href={props.href} onClick={props.clicked}><span>{props.title}</span></div>
    );

}

export default Button;