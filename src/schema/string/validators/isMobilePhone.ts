import isMobilePhone from 'validator/lib/isMobilePhone'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isMobilePhone>

export interface IIsStringMobilePhoneProps extends IStringProps {
  locale?: TParameters[1]
  options?: TParameters[2]
}

export const isStringMobilePhone = (props?: IIsStringMobilePhoneProps): TStringValidatorResult => {
  const { locale, options, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isMobilePhone(value, locale, options)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_a_mobile_phone' },
          {
            locale: Array.isArray(locale) ? locale.join(', ') : locale,
            ...options,
          }
        ),
      })
    }

    return schema
  }
}
