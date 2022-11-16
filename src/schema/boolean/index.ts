import * as yup from 'yup'

import { IIntlShapeRich } from '../../i18n/placeholder'

import { TBooleanValidatorResult } from './_types'

export const schema = <Intl extends IIntlShapeRich = IIntlShapeRich>(
  intl: Intl,
  ...validators: TBooleanValidatorResult<Intl>[]
): yup.BooleanSchema => {
  let value = yup
    .boolean()
    .typeError(intl.formatErrorMessage({ id: 'e.y_v.b_type_error' }))
    .default(false)
    .transform((v) => !!v)

  for (const validator of validators) {
    value = validator(value, intl)
  }

  return value
}

export * from './_types'

export * from './validators/isDifferentThan'
export * from './validators/isEqualTo'
export * from './validators/isFalse'
export * from './validators/isNullable'
export * from './validators/isOptional'
export * from './validators/isRequired'
export * from './validators/isTrue'
