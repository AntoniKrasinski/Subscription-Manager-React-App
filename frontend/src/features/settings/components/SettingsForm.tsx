import React from "react";
import { useEditPreferences } from "../api/EditPreferences";
import { useForm, type SubmitHandler } from "react-hook-form";

interface FormFields {
  currency: "pln" | "usd";
}

const SettingsForm = () => {
  const preferencesMutation = useEditPreferences();
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    preferencesMutation.mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="currency">Currency</label>
        <select {...register("currency")} name="currency">
          <option value="pln">PLN</option> <option value="usd">USD</option>
        </select>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default SettingsForm;
