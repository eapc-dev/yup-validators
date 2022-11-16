import * as yup from 'yup'
import { ObjectShape } from 'yup/lib/object'

import { IIntlShapeRich } from '../../i18n/placeholder'

import { TObjectValidatorResult } from './_types'

export const schema = <T extends ObjectShape = {}>(
  object: T,
  intl: IIntlShapeRich,
  ...validators: TObjectValidatorResult<T>[]
): yup.ObjectSchema<T> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  let value = yup
    .object<T>()
    .shape(object)
    .typeError(intl.formatErrorMessage({ id: 'e.y_v.o_type_error' }))
    .default(null)
    .nullable()
    .strict() as yup.ObjectSchema<T>

  for (const validator of validators) {
    value = validator(value, intl)
  }

  return value
}

export const schemaExcludes = <T extends ObjectShape = {}>(
  object: T,
  excludes: [string, string][],
  intl: IIntlShapeRich,
  ...validators: TObjectValidatorResult<T>[]
): yup.ObjectSchema<T> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  let value = yup
    .object<T>()
    .shape(object, excludes)
    .typeError(intl.formatErrorMessage({ id: 'e.y_v.o_type_error' }))
    .default(null)
    .nullable()
    .strict() as yup.ObjectSchema<T>

  for (const validator of validators) {
    value = validator(value, intl)
  }

  return value
}

export * from './_types'

export * from './validators/isNullable'
export * from './validators/isRequired'
export * from './validators/isOptional'
