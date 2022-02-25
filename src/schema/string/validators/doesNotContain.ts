import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

const check = (value: string, whitelist: string | RegExp): boolean =>
  typeof whitelist === 'string' ? value.includes(whitelist) : whitelist.test(value)

export interface IDoesNotContainProps {
  /**
   * The list of blacklist values. Can be either an array of string/regex, or just a string/regex.
   */
  values: (string | RegExp) | (string | RegExp)[]

  /**
   * Wether a string should not contain/match every value.
   *
   * @default true
   */
  matchAll?: boolean
}

/**
 * Check if the string does not contain a value or does not match to a RegExp.
 */
export const doesNotContain = (
  props: TReferenceProps<IDoesNotContainProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { values, matchAll = true } = parseReference<IDoesNotContainProps>(this, props)

          const blacklist: (string | RegExp)[] =
            typeof values === 'string' || values instanceof RegExp ? [values] : values
          const blacklistString = blacklist.map((e) => e.toString())

          const result = blacklist[matchAll ? 'every' : 'some']((e) => !check(value, e))

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_not_contain' },
                  {
                    values: intl.formatList(blacklistString, {
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
