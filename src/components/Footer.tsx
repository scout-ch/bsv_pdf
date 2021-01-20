import * as React from 'react'
import signature from '../images/signature.png'
import styles from './styles.module.css'

export const Footer : React.FC = () => {
  return (
    <>
      <p>{"Für die Beantwortung von Fragen stehen wir Euch gerne zur Verfügung"}</p>
      <p>{"Mit herzlichen Pfadigrüssen"}</p>
      <img className={styles.signature} src={signature} alt="Signature" />
      <p>
        {`Emanuel Wyss / Tschagon`}<br />
        {"Ausbildungssekretariat PBS"}<br />
        {"Direktwahl: 031 328 05 42"}<br />
        {"E-Mail: emanuel.wyss@pbs.ch"}
      </p>
    </>);
}
