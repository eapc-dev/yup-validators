import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

const check = (value: string, whitelist: string | RegExp): boolean =>
  typeof whitelist === 'string' ? value.includes(whitelist) : whitelist.test(value)

export interface IDoesContainProps {
  /**
   * The list of authorized values. Can be either an array of string or just a string.
   */
  values: (string | RegExp) | (string | RegExp)[]

  /**
   * Wether a string should contain/match every value.
   *
   * @default false
   */
  matchAll?: boolean
}

/**
 * Check if the string does contain a value or match to a RegExp.
 */
export const doesContain = (
  props: TReferenceProps<IDoesContainProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { values, matchAll = false } = parseReference<IDoesContainProps>(this, props)

          const whitelist: (string | RegExp)[] =
            typeof values === 'string' || values instanceof RegExp ? [values] : values
          const whitelistString = whitelist.map((e) => e.toString())

          const result = whitelist[matchAll ? 'every' : 'some']((e) => check(value, e))

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_contain' },
                  {
                    values: intl.formatList(whitelistString, {
                      type: matchAll ? 'conjunction' : 'disjunction',
                    }),
                    match_all: matchAll,
                  }
                ),
              })
        },
      })
    }

    return schema
  }
}
