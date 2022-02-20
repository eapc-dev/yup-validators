import isEmail from 'validator/lib/isEmail'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isEmail>

export interface IIsStringEmail extends IStringProps {
  options?: TParameters[1]
}

export const isStringEmail = (props?: IIsStringEmail): TStringValidatorResult => {
  const { options, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isEmail(value, options)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_an_email' },
          {
            ...options,
            host_blacklist: options?.host_blacklist?.join(
              intl.formatMessage({ id: 'lang.array_separator', defaultMessage: ', ' })
            ),
          }
        ),
      })
    }

    return schema
  }
}
