import isIdentityCard from 'validator/lib/isIdentityCard'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isIdentityCard>

export interface IIsStringIdentityCard extends IStringProps {
  locale?: TParameters[1]
}

export const isStringIdentityCard = (props?: IIsStringIdentityCard): TStringValidatorResult => {
  const { locale, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isIdentityCard(value, locale)
        },
        message: intl.formatErrorMessage(
          {
            id: message ?? 'e.field.s_must_be_an_identity_card_number',
          },
          { locale }
        ),
      })
    }

    return schema
  }
}
