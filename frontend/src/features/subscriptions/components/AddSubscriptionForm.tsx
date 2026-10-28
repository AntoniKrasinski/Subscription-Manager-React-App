import type { Dispatch, SetStateAction } from "react";
import { useForm, useWatch } from "react-hook-form";
import type { CreateSubscription } from "../../../types/api";
import { useAddSubscription } from "../api/addSubscription";
import ModalLayout from "../../../components/layouts/ModalLayout";
import AddLogo from "./AddLogo";

type AddSubscriptionFormValues = Omit<
  CreateSubscription,
  "nextBillingDate" | "isFreeTrial"
> & {
  isFreeTrial: boolean;
  nextBillingDate: string;
};

const AddSubscriptionForm = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const addSubscriptionMutation = useAddSubscription({
    onSuccess: () => {
      setIsOpen(false);
    },
  });
  const { control, register, handleSubmit, setValue } =
    useForm<AddSubscriptionFormValues>({
      defaultValues: {
        price: 0,
        title: "",
        showImage: true,
        billingCycle: "monthly",
        category: "other",
        currency: "pln",
        isFreeTrial: false,
        nextBillingDate: "",
      },
    });

  const title = useWatch({ control, name: "title" });
  const showImage = useWatch({ control, name: "showImage" });
  const isFreeTrial = useWatch({ control, name: "isFreeTrial" });

  return (
    <ModalLayout onClick={() => setIsOpen(false)}>
      <div className="flex justify-between ">
        <h2>Dodaj subskrypcję</h2>
        <button type="button" onClick={() => setIsOpen(false)}>
          X
        </button>
      </div>

      <form
        onSubmit={handleSubmit((subscriptionData) =>
          addSubscriptionMutation.mutate(subscriptionData),
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
            min="0.00"
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

          <select id="category" {...register("category")} required>
            <option value="entertainment">Entertainment</option>
            <option value="music">Music</option>
            <option value="software">Software</option>
            <option value="education">Education</option>
            <option value="fitness">Fitness</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="formFieldChckbox">
          <label htmlFor="isFreeTrial">Free Trial</label>
          <input
            id="isFreeTrial"
            type="checkbox"
            {...register("isFreeTrial")}
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

        <button type="submit" disabled={addSubscriptionMutation.isPending}>
          {addSubscriptionMutation.isPending
            ? "Dodawanie..."
            : "Dodaj subskrypcję"}
        </button>
      </form>
    </ModalLayout>
  );
};

export default AddSubscriptionForm;
