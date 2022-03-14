import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsLengthProps {
  /**
   * Minimum length of the string.
   */
  min?: number
  /**
   * Delta added to `min` (eg: you have a `min` of `10` and a `minDelta` of `5`, then the minimal length of the string will be `15`). You can also use negative value. This property is useful when you are using refs.
   */
  minDelta?: number
  /**
   * Whether the minimal value should be accepted.
   *
   * @default true
   */
  minIncluded?: boolean

  /**
   * Maximum length of the string.
   */
  max?: number
  /**
   * Delta added to `max` (eg: you have a `max` of `10` and a `maxDelta` of `5`, then the maximal length of the string will be `15`). You can also use negative value. This property is useful when you are using refs.
   */
  maxDelta?: number
  /**
   * Whether the maximal value should be accepted.
   *
   * @default true
   */
  maxIncluded?: boolean
}

/**
 * Check if the string corresponds to the length constraints.
 */
export const isLength = (
  props?: TReferenceProps<IIsLengthProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { length } = value

          const {
            min,
            minDelta,
            minIncluded = true,
            max,
            maxDelta,
            maxIncluded = true,
          } = parseReference<IIsLengthProps>(this, props)

          const minValue = min ? min + (minDelta ?? 0) : undefined
          const maxValue = max ? max + (maxDelta ?? 0) : undefined

          const minValid =
            typeof minValue === 'number'
              ? minIncluded
                ? length >= minValue
                : length > minValue
              : true

          const maxValid =
            typeof maxValue === 'number'
              ? maxIncluded
                ? length <= maxValue
                : length < maxValue
              : true

          if (!minValid && !maxValid) {
            return this.createError({
              message: intl.formatErrorMessage(
                { id: message ?? 'e.y_v.s_min_max_length' },
                {
                  min: minValue,
                  min_included: minIncluded,
                  max: maxValue,
                  max_included: maxIncluded,
                }
              ),
            })
          } else if (!minValid) {
            if (!minValid) {
              return this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_min_length' },
                  {
                    min: minValue,
                    min_included: minIncluded,
                    max: maxValue ?? -1,
                    max_included: maxIncluded,
                  }
                ),
              })
            }
          } else if (!maxValid) {
            return this.createError({
              message: intl.formatErrorMessage(
                { id: message ?? 'e.y_v.s_max_length' },
                {
                  min: minValue ?? -1,
                  min_included: minIncluded,
                  max: maxValue,
                  max_included: maxIncluded,
                }
              ),
            })
          }

          return true
        },
      })
    }

    return schema
  }
}
