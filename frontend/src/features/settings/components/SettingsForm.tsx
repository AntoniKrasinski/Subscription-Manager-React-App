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
    <div className="flex flex-col gap-8 rounded-xl border border-border bg-surface p-8">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-col gap-6">
          <h2 className="text-lg font-semibold text-text">Preferences</h2>

          <div className="flex items-center justify-between gap-6 border-b border-border pb-5">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="currency"
                className="text-sm font-medium text-text"
              >
                Display currency
              </label>
            </div>

            <select {...register("currency")} id="currency">
              <option value="pln">PLN (zł)</option>
              <option value="usd">USD ($)</option>
            </select>
          </div>

          <div className="flex items-center justify-between gap-6 border-b border-border pb-5">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="timezone"
                className="text-sm font-medium text-text"
              >
                Time zone
              </label>
            </div>

            <select id="timezone">
              <option value="Europe/Warsaw">Europe/Warsaw</option>
              <option value="Europe/London">Europe/London</option>
              <option value="Europe/Berlin">Europe/Berlin</option>
              <option value="America/New_York">America/New_York</option>
              <option value="UTC">UTC</option>
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="monthlyBudget"
                  className="text-sm font-medium text-text"
                >
                  Monthly budget
                </label>
              </div>

              <span className="rounded-lg bg-primary-soft px-3 py-1.5 text-sm font-semibold text-primary">
                xxxxx
              </span>
            </div>

            <input
              id="monthlyBudget"
              type="range"
              min="0"
              max="1000"
              step="25"
            />

            <div className="flex justify-between text-xs text-text-muted">
              <span>0</span>
              <span>500</span>
              <span>1,000</span>
            </div>
          </div>
        </section>

        <div className="h-px bg-border" />

        <section className="flex flex-col gap-5">
          <h2 className="text-lg font-semibold text-text">Notifications</h2>

          <div className="flex items-center justify-between gap-6">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="emailNotifications"
                className="text-sm font-medium text-text"
              >
                Email notifications
              </label>
            </div>

            <input id="emailNotifications" type="checkbox" />
          </div>
        </section>

        <div className="flex justify-end border-t border-border pt-6">
          <button className="bigButton" type="submit">
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;
