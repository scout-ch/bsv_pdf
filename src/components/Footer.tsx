import * as React from 'react'
import signature from '../images/signature.png'
import styles from './styles.module.css'
import { useTranslation } from 'react-i18next'

export function Footer({ lng }: { lng: string }) {
  const t = useTranslation().i18n.getFixedT(lng)

  return (
    <>
      <p>{t('Footer.Greeting')}</p>
      <img className={styles.signature} src={signature} alt="Signature" />
      <p>{t('Footer.Address')}</p>
    </>);
}
