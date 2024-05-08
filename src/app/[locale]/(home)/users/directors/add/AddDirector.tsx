'use client'
import { Button } from '@/components/common/Button';
import AllIcons from '@/components/common/Icons';
import { InputPhone } from '@/components/common/form/input-phone';
import { InputSelect } from '@/components/common/form/input-select';
import { InputText } from '@/components/common/form/input-text';
import { useCities, useCountries, useStates } from '@/hooks/useCommon';
import { useAddDirector } from '@/hooks/useDirectors';
import { FieldProps } from '@/interfaces';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const AddDirectors = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { errors, control, register, handleSubmit, handleSubmitData, isLoading, isValid, watch } = useAddDirector();
  const { countries } = useCountries();
  const { states } = useStates(watch("country_id"));
  const { cities } = useCities(watch("state_id"));
  return (
    <div>
      <div className='flex gap-4 items-center'>
        <div onClick={() => router.push("/users/directors")} className='cursor-pointer'>
          <AllIcons name="BackIcon" className='h-4 w-4'/>
        </div>
        <p className='font-semibold text-lg'>{t("directors:add:title")}</p>
      </div>
      <form onSubmit={handleSubmit(handleSubmitData)} className='w-full'>
        <div className='w-full mt-10 lg:w-3/5'>
          <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <InputText                
                name="name"
                type="text"
                register={register}
                label={t("directors:add:firstName")}
                customPlaceholder="Ex. Pablo"
                error={errors.name}
              />       
              <InputText                
                name="last_name"
                type="text"
                register={register}
                label={t("directors:add:lastName")}
                customPlaceholder="Ex. Cifuentes"
                error={errors.last_name}
              />    
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'> 
              <Controller
                  render={({ field: { ref, ...field } }: {field: FieldProps}) => {
                      return (
                      <InputPhone
                          name="phone_number"
                          field={field}
                          error={errors.phone_number}
                          label={t("directors:add:phone") as string}
                          defaultValue={field.value}
                      />
                      );
                  }}
                  name="phone_number"
                  control={control}
                  defaultValue=""
              /> 
              <InputText                
                name="email"
                type="text"
                register={register}
                label={t("directors:add:email")}
                customPlaceholder="Ex. test@gmail.com"
                error={errors.email}
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'> 
              <InputSelect
                label={t("directors:add:country")}
                name="country_id"
                register={register}
                values={countries}
                placeholder={t("common:select")}
                error={errors.country_id}
              />     
              <InputSelect
                label={t("directors:add:state")}
                name="state_id"
                register={register}
                values={states}
                placeholder={t("common:select")}
                error={errors.state_id}
              /> 
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'> 
              <InputSelect
                label={t("directors:add:city")}
                name="city_id"
                register={register}
                values={cities}
                placeholder={t("common:select")}
                error={errors.city_id}
              /> 
            </div>
          </div>         
        </div>
        <div className="pt-8 lg:pt-14 flex justify-center w-full lg:w-3/5">
          <Button
            type="submit"
            ButtonStyle={!isValid || isLoading ? "gray" : "primary"}
            className="py-3 w-56 lg:w-72"
            disabled={!isValid || isLoading}
            title={t("common:buttons:save")}
          />
        </div>        
      </form>
    </div>
  )
}

export default AddDirectors;
