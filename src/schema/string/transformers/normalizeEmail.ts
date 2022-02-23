import _normalizeEmail from 'validator/lib/normalizeEmail'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _normalizeEmail>

export interface INormalizeEmailProps {
  options?: TParameters[1]
}

/**
 * Canonicalizes an email address. This doesn't validate that the input is an email, if you want to validate the email use `string.isEmail` beforehand.
 */
export const normalizeEmail = (
  props?: INormalizeEmailProps & Omit<IStringProps, 'message'>
): TStringValidatorResult => {
  const { options, active = true } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.transform((v: unknown) =>
        typeof v === 'string' ? _normalizeEmail(v, options) : v
      )
    }

    return schema
  }
}
