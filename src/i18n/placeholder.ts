import { createIntl, IntlShape } from '@formatjs/intl'

export interface IIntlShape extends IntlShape {
  formatErrorMessage: TFormatMessage
}

export type TFormatMessage = IntlShape['formatMessage']

export const formatMessage: TFormatMessage = (descriptor, values) =>
  JSON.stringify([descriptor, values]) ?? 'NO ID'

export const DEFAULT_INTL: IIntlShape = {
  ...createIntl({ locale: 'en-US' }),
  formatErrorMessage: formatMessage,
}
