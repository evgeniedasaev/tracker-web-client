import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
  pendingLabel: string;
  cta: string;
};

export function SubmitButton({ pendingLabel, cta }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-neutral mt-2" disabled={pending}>
      {pending ? (
        <>
          <span className="loading loading-spinner loading-sm" />
          {pendingLabel}
        </>
      ) : (
        cta
      )}
    </button>
  );
}
