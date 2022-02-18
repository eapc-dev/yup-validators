import isSlug from 'validator/lib/isSlug'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringSlugProps extends IStringProps {}

export const isStringSlug = (props?: IIsStringSlugProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isSlug(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_a_slug',
        }),
      })
    }

    return schema
  }
}
