import isRgbColor from 'validator/lib/isRgbColor'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isRgbColor>

export interface IIsStringRgbColor extends IStringProps {
  includePercentValues?: TParameters[1]
}

export const isStringRgbColor = (props?: IIsStringRgbColor): TStringValidatorResult => {
  const { includePercentValues, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isRgbColor(value, includePercentValues)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_a_rgb_color' },
          { includePercentValues }
        ),
      })
    }

    return schema
  }
}
