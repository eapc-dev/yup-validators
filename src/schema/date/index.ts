import * as yup from 'yup'

import { IIntlShapeRich } from '../../i18n/placeholder'

import { TDateValidatorResult } from './_types'

export const schema = <Intl extends IIntlShapeRich = IIntlShapeRich>(
  intl: Intl,
  ...validators: TDateValidatorResult<Intl>[]
): yup.DateSchema => {
  let value = yup
    .date()
    .typeError(intl.formatErrorMessage({ id: 'e.y_v.d_type_error' }))
    .default(null)
    .nullable() as yup.DateSchema

  for (const validator of validators) {
    value = validator(value, intl)
  }

  return value
}

export * from './_types'

export * from './validators/isEqualTo'
export * from './validators/isDifferentThan'
export * from './validators/isInFuture'
export * from './validators/isMinMax'
export * from './validators/isNotInFuture'
export * from './validators/isNullable'
export * from './validators/isRequired'
export * from './validators/isOptional'

export * from './transformers/add'
export * from './transformers/set'
export * from './transformers/setEndOf'
export * from './transformers/setStartOf'
export * from './transformers/subtract'
