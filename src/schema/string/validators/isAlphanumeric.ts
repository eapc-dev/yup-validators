import isAlphanumeric from 'validator/lib/isAlphanumeric'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isAlphanumeric>

export interface IIsStringAlphanumericProps extends IStringProps {
  locale?: TParameters[1]
  options?: TParameters[2]
}

export const isStringAlphanumeric = (
  props?: IIsStringAlphanumericProps
): TStringValidatorResult => {
  const { locale, options, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isAlphanumeric(value, locale, options)
        },
        message: intl.formatErrorMessage({ id: message ?? 'e.field.s_must_be_alphanumeric' }),
      })
    }

    return schema
  }
}
