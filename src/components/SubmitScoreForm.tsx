import { useState } from "react";

type SubmitScoreFormProps = {
  score: number; // pass in the score they achieved
  onSuccess?: () => void; // optional callback after successful submit
};

const SubmitScoreForm = ({ score, onSuccess }: SubmitScoreFormProps) => {
  const [initials, setInitials] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/submit-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initials, score }),
      });

      if (!res.ok) throw new Error('Failed to submit score');

      setInitials('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Error submitting score: ' + err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mt-6 p-4 border rounded-lg max-w-xs mx-auto">
      <h2 className="text-xl font-bold">Submit Your Score</h2>
      <input
        type="text"
        placeholder="Your initials"
        value={initials}
        onChange={(e) => setInitials(e.target.value.toUpperCase().substring(0, 3))}
        maxLength={3}
        className="border p-2 rounded text-center uppercase font-mono"
        required
      />
      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default SubmitScoreForm;
