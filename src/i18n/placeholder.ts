import { createIntl, IntlShape } from '@formatjs/intl'

export interface IIntlShape extends IntlShape {
  formatErrorMessage: IntlShape['formatMessage']
}

export const formatDate: IntlShape['formatDate'] = (...args) =>
  `i18n.formatDate|${JSON.stringify(args)}`

export const formatDateTimeRange: IntlShape['formatDateTimeRange'] = (...args) =>
  `i18n.formatDateTimeRange|${JSON.stringify(args)}`

export const formatDisplayName: IntlShape['formatDisplayName'] = (...args) =>
  `i18n.formatDisplayName|${JSON.stringify(args)}`

export const formatErrorMessage: IntlShape['formatMessage'] = (...args) =>
  `i18n.formatErrorMessage|${JSON.stringify(args)}`

export const formatList: IntlShape['formatList'] = (...args) =>
  `i18n.formatList|${JSON.stringify(args)}`

export const formatMessage: IntlShape['formatMessage'] = (...args) =>
  `i18n.formatMessage|${JSON.stringify(args)}`

export const formatNumber: IntlShape['formatNumber'] = (...args) =>
  `i18n.formatNumber|${JSON.stringify(args)}`

export const formatRelativeTime: IntlShape['formatRelativeTime'] = (...args) =>
  `i18n.formatRelativeTime|${JSON.stringify(args)}`

export const formatTime: IntlShape['formatTime'] = (...args) => `formatTime|${JSON.stringify(args)}`

export const DEFAULT_INTL: IIntlShape = {
  ...createIntl({ locale: 'en-US' }),
  formatDate,
  formatDateTimeRange,
  formatDisplayName,
  formatErrorMessage,
  formatList,
  formatMessage,
  formatNumber,
  formatRelativeTime,
  formatTime,
}
