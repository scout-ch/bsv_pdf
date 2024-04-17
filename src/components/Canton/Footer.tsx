import signature from '../../images/signature.png'
import styles from '../styles.module.css'
import { useTranslation } from 'react-i18next'

export function Footer({ lng }: { lng: string }) {
  const {t} = useTranslation([], { lng })

  return (
    <>
      <p>{t('Footer.Greeting')}</p>
      <img className="signature" src={signature} alt="Signature" />
      <p>{t('Footer.Address')}</p>
    </>);
}
