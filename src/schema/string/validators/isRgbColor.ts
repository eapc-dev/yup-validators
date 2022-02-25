import _isRgbColor from 'validator/lib/isRgbColor'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isRgbColor>

export interface IIsRgbColorProps {
  /**
   * If you don't want to allow to set rgb or rgba values with percents, like rgb(5%,5%,5%), or rgba(90%,90%,90%,.3), then set it to false. (defaults to true)
   */
  includePercentValues?: TParameters[1]
}

/**
 * Check if the string is a rgb or rgba color.
 */
export const isRgbColor = (
  props?: TReferenceProps<IIsRgbColorProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { includePercentValues } = parseReference<IIsRgbColorProps>(this, props)

          const result = _isRgbColor(value, includePercentValues)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_a_rgb_color' },
                  { include_percent_values: includePercentValues }
                ),
              })
        },
      })
    }

    return schema
  }
}
