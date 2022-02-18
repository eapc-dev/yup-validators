import isDivisibleBy from 'validator/lib/isDivisibleBy'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isDivisibleBy>

export interface IIsStringDivisibleByProps extends IStringProps {
  number: TParameters[1]
}

export const isStringDivisibleBy = (props: IIsStringDivisibleByProps): TStringValidatorResult => {
  const { number, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isDivisibleBy(value, number)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_divisible_by' },
          { number: number }
        ),
      })
    }

    return schema
  }
}
