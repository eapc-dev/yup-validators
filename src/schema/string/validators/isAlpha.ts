import isAlpha from 'validator/lib/isAlpha'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isAlpha>

export interface IIsStringAlphaProps extends IStringProps {
  locale?: TParameters[1]
  options?: TParameters[2]
}

export const isStringAlpha = (props?: IIsStringAlphaProps): TStringValidatorResult => {
  const { locale, options, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isAlpha(value, locale, options)
        },
        message: intl.formatErrorMessage({ id: message ?? 'e.field.s_must_be_alpha' }),
      })
    }

    return schema
  }
}
