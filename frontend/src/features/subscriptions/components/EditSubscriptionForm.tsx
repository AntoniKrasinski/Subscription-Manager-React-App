
import type { Dispatch, SetStateAction } from "react";
import { useForm, useWatch } from "react-hook-form";
import type { Subscription } from "../../../types/api";
import { useUpdateSubscription } from "../api/updateSubscription";
import ModalLayout from "../../../components/layouts/ModalLayout";
import AddLogo from "./AddLogo";

type EditSubscriptionFormValues = Omit<
  Subscription,
  "id" | "nextBillingDate" | "autopayment"
> & {
  nextBillingDate: string;
};

const EditSubscriptionForm = ({
  subscription,
  setIsOpen,
}: {
  subscription: Subscription;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const editSubscriptionMutation = useUpdateSubscription({
    onSuccess: () => {
      setIsOpen(false);
    },
  });

  const { control, register, handleSubmit, setValue } =
    useForm<EditSubscriptionFormValues>({
      defaultValues: {
        price: subscription.price,
        title: subscription.title,
        showImage: subscription.showImage,
        billingCycle: subscription.billingCycle,
        category: subscription.category,
        currency: subscription.currency,
        isFreeTrial: subscription.isFreeTrial,
        nextBillingDate: subscription.nextBillingDate?.slice(0, 10) ?? "",
      },
    });

  const title = useWatch({ control, name: "title" });
  const showImage = useWatch({ control, name: "showImage" });
  const isFreeTrial = useWatch({ control, name: "isFreeTrial" });

  return (
    <ModalLayout onClick={() => setIsOpen(false)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Edytuj subskrypcję</h2>
      </div>

      <form
        onSubmit={handleSubmit((subscriptionData) =>
          editSubscriptionMutation.mutate({
            subscriptionId: subscription.id,
            data: subscriptionData,
          }),
        )}
        className="flex flex-col gap-6"
      >
        <section className="flex flex-col gap-4">
          <div className="flex items-end gap-4">
            <div className="formField flex-1 min-w-0">
              <label htmlFor="title">Nazwa subskrypcji</label>
              <input
                id="title"
                type="text"
                {...register("title")}
                placeholder="np. Netflix"
                required
              />
            </div>

            <AddLogo
              name={title}
              showImage={showImage}
              setShowImage={(value) =>
                setValue("showImage", value, { shouldDirty: true })
              }
            />
          </div>

          <div className="grid grid-cols-[1fr_120px] gap-3">
            <div className="formField">
              <label htmlFor="price">Cena</label>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                placeholder="0.00"
                required
              />
            </div>

            <div className="formField">
              <label htmlFor="currency">Waluta</label>
              <select id="currency" {...register("currency")}>
                <option value="pln">PLN</option>
                <option value="usd">USD</option>
              </select>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="formField">
              <label htmlFor="billingCycle">Cykl rozliczeniowy</label>
              <select id="billingCycle" {...register("billingCycle")}>
                <option value="weekly">Tygodniowo</option>
                <option value="monthly">Miesięcznie</option>
                <option value="yearly">Rocznie</option>
              </select>
            </div>

            <div className="formField">
              <label htmlFor="category">Kategoria</label>
              <select id="category" {...register("category")} required>
                <option value="entertainment">Entertainment</option>
                <option value="music">Music</option>
                <option value="software">Software</option>
                <option value="education">Education</option>
                <option value="fitness">Fitness</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="isFreeTrial" className="font-medium">
                Free Trial
              </label>
              <p className="text-xs text-muted mt-1">
                Subskrypcja posiada okres próbny
              </p>
            </div>

            <input
              id="isFreeTrial"
              type="checkbox"
              {...register("isFreeTrial")}
              className="size-4 accent-primary"
            />
          </div>

          <div className="formField">
            <label htmlFor="nextBillingDate">
              {isFreeTrial
                ? "Koniec okresu próbnego"
                : "Data następnej płatności"}
            </label>
            <input
              id="nextBillingDate"
              type="date"
              {...register("nextBillingDate")}
              required
            />
          </div>
        </section>

        <div className="flex justify-end gap-3 border-t border-border pt-5">
          <button
            className="cancelButton"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Anuluj
          </button>

          <button
            type="submit"
            disabled={editSubscriptionMutation.isPending}
            className="bigButton"
          >
            {editSubscriptionMutation.isPending
              ? "Zapisywanie..."
              : "Zapisz zmiany"}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default EditSubscriptionForm;
