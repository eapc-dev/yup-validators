import isWhitelisted from 'validator/lib/isWhitelisted'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isWhitelisted>

export interface IIsStringWhitelisted extends IStringProps {
  chars: TParameters[1]
}

export const isStringWhitelisted = (props: IIsStringWhitelisted): TStringValidatorResult => {
  const { chars, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isWhitelisted(value, chars)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_Whitelisted' },
          {
            chars: Array.isArray(chars)
              ? chars.join(intl.formatMessage({ id: 'lang.array_separator', defaultMessage: ', ' }))
              : chars,
          }
        ),
      })
    }

    return schema
  }
}
