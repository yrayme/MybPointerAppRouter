'use client'
import { Button } from '@/components/common/Button';
import AllIcons from '@/components/common/Icons';
import { InputPhone } from '@/components/common/form/input-phone';
import { InputSelect } from '@/components/common/form/input-select';
import { InputText } from '@/components/common/form/input-text';
import { useAddSeller } from '@/hooks/useSellers';
import React from 'react'
import { Controller } from 'react-hook-form';
import { ComboBoxAutocompleteAsync } from '@/components/common/form/ComboBoxAutocompleteAsync';
import { FieldProps, User } from '@/interfaces';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { GET_MANAGERS } from '@/lib/keys';

interface Props {
  id: string;
  data: any;
}
const EditSeller: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { errors, control, register, handleSubmit, handleSubmitData, isLoading, isValid, getManagers, setValue, getValues } = useAddSeller(data);
  
  return (
    <div>
      <div className='flex gap-4 items-center'>
        <div onClick={() => router.push("/users/sellers")} className='cursor-pointer'>
          <AllIcons name="BackIcon" className='h-4 w-4'/>
        </div>
        <p className='font-semibold text-lg'>{t("sellers:add:edit")}</p>
      </div>
      <form onSubmit={handleSubmit(handleSubmitData)} className='w-full'>
        <div className='flex flex-col sm:flex-row mt-14 gap-4 w-full lg:w-3/5 '>
            <div className='w-full sm:w-1/2 flex flex-col gap-y-3'>
              <InputText                
                name="name"
                type="text"
                register={register}
                label={t("sellers:add:name")}
                error={errors.name}
              />
              <InputText                
                name="email"
                type="text"
                register={register}
                label={t("sellers:add:email")}
                disabled
                error={errors.email}
              />
              <InputText                
                name="npm_number"
                type="text"
                register={register}
                label={t("sellers:add:npn")}
                error={errors.npm_number}
                disabled
              />                   
              <ComboBoxAutocompleteAsync
                  onChange={(value) => {
                      setValue("superior_role_id", value?._id.$oid);
                  }}
                  name="superior_role_id"
                  label={
                    t("sellers:add:role") as string
                  }
                  placeHolder={
                      t("common:select") as string
                  }
                  getData={getManagers}
                  queryKey={GET_MANAGERS}
                  customIcon={() => (
                      <AllIcons name='SearchIcon' className='h-4 w-4 text-gray-1'/>
                  )}
                  error={errors.superior_role_id}
                  selectedValue={getValues("superior_role_id")}
              /> 
              {/* <InputSelect
                label={t("sellers:add:role")}
                name="superior_role_id"
                register={register}
                values={dataManagers?.items}
                placeholder={t("sellers:add:select")}
                error={errors.superior_role_id}
              /> */}
            </div>     
            <div className='w-full sm:w-1/2 flex flex-col gap-y-3'>
              <InputText                
                name="last_name"
                type="text"
                register={register}
                label={t("sellers:add:lastName")}
                error={errors.last_name}
              />
              <InputText                
                name="san_number"
                type="text"
                register={register}
                label={t("sellers:add:san")}
                disabled
                error={errors.san_number}
              />
              <Controller
                  render={({ field: { ref, ...field } }: {field: FieldProps}) => {
                      return (
                      <InputPhone
                          name="phone_number"
                          // ref={ref}
                          field={field}
                          error={errors.phone_number}
                          label={t("sellers:add:phone") as string}
                          defaultValue={field.value}
                      />
                      );
                  }}
                  name="phone_number"
                  control={control}
                  defaultValue=""
              />
            </div>           
        </div>
        <div className="pt-8 lg:pt-14 flex justify-center w-full lg:w-3/5">
          <Button
            type="submit"
            ButtonStyle={!isValid || isLoading ? "gray" : "primary"}
            className="py-3 w-56 lg:w-72"
            disabled={!isValid || isLoading}
            title={t("common:buttons:update")}
          />
        </div>        
      </form>
    </div>
  )
}

export default EditSeller;
