import _isLocale from 'validator/lib/isLocale'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsLocaleProps {}

/**
 * Check if the string is a locale.
 */
export const isLocale = (
  props?: TReferenceProps<IIsLocaleProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isLocale(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_a_locale',
        }),
      })
    }

    return schema
  }
}
