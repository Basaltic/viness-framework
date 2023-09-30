import { createContext, useContext } from 'react'
import { VinessForm } from '../form'

const FormContext = createContext<VinessForm<any> | null>(null)

export const FormProvider = FormContext.Provider

export const useFormContext = <DV extends object = any>() => useContext(FormContext) as VinessForm<DV>
