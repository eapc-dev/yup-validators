import { createIntl, IntlShape } from '@formatjs/intl'

import en from '../../locales/en.json'

export interface IIntlShapeRich extends IntlShape {
  formatErrorMessage: IntlShape['formatMessage']
}

const intl = createIntl({ locale: 'en-US', messages: en })

export const DEFAULT_INTL: IIntlShapeRich = {
  ...intl,
  formatErrorMessage: intl.formatMessage,
}
