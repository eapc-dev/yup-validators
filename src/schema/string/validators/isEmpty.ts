import isEmpty from 'validator/lib/isEmpty'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isEmpty>

export interface IIsStringEmpty extends IStringProps {
  options?: TParameters[1]
}

export const isStringEmpty = (props?: IIsStringEmpty): TStringValidatorResult => {
  const { options, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isEmpty(value, options)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_empty' },
          { ...options }
        ),
      })
    }

    return schema
  }
}
