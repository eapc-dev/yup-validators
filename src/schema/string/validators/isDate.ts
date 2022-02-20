import isDate from 'validator/lib/isDate'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isDate>

export interface IIsStringDateProps extends IStringProps {
  options?: TParameters[1]
}

export const isStringDate = (props?: IIsStringDateProps): TStringValidatorResult => {
  const { options, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isDate(value, options)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_a_date' },
          {
            ...options,
            delimiters: options?.delimiters?.join(
              intl.formatMessage({ id: 'lang.array_separator', defaultMessage: ', ' })
            ),
          }
        ),
      })
    }

    return schema
  }
}
