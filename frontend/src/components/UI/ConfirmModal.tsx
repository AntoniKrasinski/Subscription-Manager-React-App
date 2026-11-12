import ModalLayout from "../layouts/ModalLayout";

const ConfirmModal = ({
  onConfirm,
  onCancel,
  text,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  text: string;
}) => {
  return (
    <ModalLayout onClick={onCancel}>
      <div>
        <h2>{text}</h2>

        <div className="flex gap-2 justify-end">
          <button className="cancelButton" onClick={onCancel}>Cancel</button>
          <button className="bigButton" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ConfirmModal;
