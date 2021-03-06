import i18n from 'i18next-client';
import arrayToSentence from 'array-to-sentence';

export function localizedArrayToSentence(array) {
  return arrayToSentence(array, {lastSeparator: i18n.t('utility.or')});
}
