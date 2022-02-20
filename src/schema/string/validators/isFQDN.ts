import isFQDN from 'validator/lib/isFQDN'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isFQDN>

export interface IIsStringFQDN extends IStringProps {
  options?: TParameters[1]
}

export const isStringFQDN = (props?: IIsStringFQDN): TStringValidatorResult => {
  const { options, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isFQDN(value, options)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_a_fqdn' },
          { ...options }
        ),
      })
    }

    return schema
  }
}
