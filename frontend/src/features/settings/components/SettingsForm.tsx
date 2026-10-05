import React from "react";
import { useEditPreferences } from "../api/EditPreferences";
import { useForm, type SubmitHandler } from "react-hook-form";
import { usePreferences } from "../api/GetPreferences";

interface FormFields {
  currency: "pln" | "usd";
  // budget: number | null;
}

const SettingsForm = () => {
  const preferences = usePreferences();

  if (preferences.isLoading) {
    return <div>loading</div>;
  }
  if (preferences.error || !preferences.data) {
    return <div>error</div>;
  }

  return <PreferencesForm defaultValues={preferences.data} />;
};

const PreferencesForm = ({ defaultValues }: { defaultValues: FormFields }) => {
  const preferencesMutation = useEditPreferences();
  const { register, handleSubmit } = useForm<FormFields>({
    defaultValues: { currency: defaultValues.currency },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    preferencesMutation.mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="currency">Currency</label>
        <select {...register("currency")} id="currency">
          <option value="pln">PLN</option>
          <option value="usd">USD</option>
        </select>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default SettingsForm;
