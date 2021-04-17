import styles from '../styles/common/Utils.module.css';

export const textToClipboard = (text: string): void => {
  const input = document.createElement('input');
  input.className = styles.visuallyHidden;
  document.body.appendChild(input);

  input.value = text;
  input.select();
  document.execCommand('copy');

  document.body.removeChild(input);
};
