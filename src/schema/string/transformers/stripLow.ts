import _stripLow from 'validator/lib/stripLow'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _stripLow>

export interface IStripLowProps {
  /**
   * Wether to preserve newline characters (`\n` and `\r`, hex `0xA` and `0xD`).
   */
  keepNewLines?: TParameters[1]
}

/**
 * Remove characters with a numerical value `<32` and `127`, mostly control characters.
 *
 * If `keepNewLines` is set to `true`, newline characters are preserved (`\n` and `\r`, hex `0xA` and `0xD`). Unicode-safe in JavaScript.
 */
export const stripLow = (
  props?: IStripLowProps & Omit<IStringProps, 'message'>
): TStringValidatorResult => {
  const { keepNewLines, active = true } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.transform((v: unknown) =>
        typeof v === 'string' ? _stripLow(v, keepNewLines) : v
      )
    }

    return schema
  }
}
