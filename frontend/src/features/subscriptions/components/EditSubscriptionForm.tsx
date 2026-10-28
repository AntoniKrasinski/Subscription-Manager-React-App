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
  const editSubscriptionMutation = useUpdateSubscription();
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
      <div className="flex justify-between">
        <h2>Edytuj subskrypcję</h2>

        <button type="button" onClick={() => setIsOpen(false)}>
          X
        </button>
      </div>

      <form
        onSubmit={handleSubmit((subscriptionData) =>
          editSubscriptionMutation.mutate({
            subscriptionId: subscription.id,
            data: subscriptionData,
          }),
        )}
      >
        <div className="flex">
          <div className="formField">
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

          <input
            id="category"
            type="text"
            {...register("category")}
            placeholder="np. Rozrywka"
            required
          />
        </div>

        <div className="formFieldChckbox">
          <label htmlFor="isFreeTrial">Free Trial</label>

          <input id="isFreeTrial" type="checkbox" {...register("isFreeTrial")} />
        </div>

        <div className="formField">
          <label htmlFor="nextBillingDate">
            {isFreeTrial ? "Koniec darmowego okresu" : "Następna płatność"}
          </label>

          <input
            id="nextBillingDate"
            type="date"
            {...register("nextBillingDate")}
            required
          />
        </div>

        <button type="submit" disabled={editSubscriptionMutation.isPending}>
          {editSubscriptionMutation.isPending
            ? "Zapisywanie..."
            : "Zapisz zmiany"}
        </button>
      </form>
    </ModalLayout>
  );
};

export default EditSubscriptionForm;
