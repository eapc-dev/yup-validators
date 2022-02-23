import _whitelist from 'validator/lib/whitelist'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _whitelist>

export interface IWhitelistProps {
  /**
   * Whitelist to be used.  The characters are used in a RegExp and so you will need to escape some chars, e.g. `\\[\\]`.
   */
  chars: TParameters[1]
}

/**
 * Remove characters that appear in the whitelist.
 */
export const whitelist = (
  props: IWhitelistProps & Omit<IStringProps, 'message'>
): TStringValidatorResult => {
  const { active = true, chars } = props ?? {}

  return (schema) => {
    if (active) {
      schema = schema.transform((v: unknown) => (typeof v === 'string' ? _whitelist(v, chars) : v))
    }

    return schema
  }
}
