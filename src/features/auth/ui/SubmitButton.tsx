import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
  pendingLabel: string;
  cta: string;
};

export function SubmitButton({ pendingLabel, cta }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary mt-4 w-full shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
      disabled={pending}
    >
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
