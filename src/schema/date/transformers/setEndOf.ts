import dayjs from 'dayjs'
import pluginTimezone from 'dayjs/plugin/timezone'
import pluginUTC from 'dayjs/plugin/utc'

import { IDateProps, TDateValidatorResult } from '../_types'

dayjs.extend(pluginUTC)
dayjs.extend(pluginTimezone)

export interface IEndOfProps {
  /**
   * Unit to be used.
   */
  unit: dayjs.OpUnitType

  /**
   * Timezone to be used.
   */
  timezone?: [tz: string, keepLocalTimes?: boolean]
}

/**
 * Set the date to the end of `unit`.
 */
export const setEndOf = (
  props: IEndOfProps & Omit<IDateProps, 'message'>
): TDateValidatorResult => {
  const { unit, timezone, active = true } = props ?? {}

  return (schema) => {
    if (active) {
      schema = schema.transform((v) => {
        let date = dayjs(v)

        if (!date.isValid()) {
          return v as unknown
        }

        if (timezone) {
          date = timezone[0] === 'utc' ? date.utc(timezone[1]) : date.tz(timezone[0], timezone[1])
        }

        return date.endOf(unit).toDate()
      })
    }

    return schema
  }
}
