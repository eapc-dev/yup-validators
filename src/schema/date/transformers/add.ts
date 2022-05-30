import dayjs from 'dayjs'
import pluginTimezone from 'dayjs/plugin/timezone'
import pluginUTC from 'dayjs/plugin/utc'

import { IDateProps, TDateValidatorResult } from '../_types'

dayjs.extend(pluginUTC)
dayjs.extend(pluginTimezone)

export interface IAddProps {
  /**
   * Unit to be used.
   */
  values: [unit: dayjs.ManipulateType, value: number][]

  /**
   * Timezone to be used.
   */
  timezone?: [tz: string, keepLocalTimes?: boolean]
}

/**
 * Add values to the date using `dayjs`.
 */
export const add = (props: IAddProps & Omit<IDateProps, 'message'>): TDateValidatorResult => {
  const { values, timezone, active = true } = props ?? {}

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

        for (const [unit, value] of values) {
          date = date.add(value, unit)
        }

        return date.toDate()
      })
    }

    return schema
  }
}
