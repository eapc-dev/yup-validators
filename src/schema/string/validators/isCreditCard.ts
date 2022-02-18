import isCreditCard from 'validator/lib/isCreditCard'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringCreditCardProps extends IStringProps {}

export const isStringCreditCard = (props?: IIsStringCreditCardProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isCreditCard(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_a_credit_card_number',
        }),
      })
    }

    return schema
  }
}
