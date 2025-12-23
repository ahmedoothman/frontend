import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function usePromptImprover() {
  const [idea, setIdea] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [improveMethod, setImproveMethod] = useState('standard');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (idea.trim().length < 10) {
      setError('Please enter at least 10 characters');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const endpoint =
        improveMethod === 'ai' ? '/api/v1/improve/ai' : '/api/v1/improve';
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(
          data.message ||
            data.error ||
            'Failed to improve prompt. Please try again.'
        );
      }
    } catch (err) {
      setError('Failed to connect to server. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.improved);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setIdea('');
    setResult(null);
    setError('');
  };

  return {
    // State
    idea,
    result,
    loading,
    error,
    copied,
    improveMethod,
    // Setters
    setIdea,
    setImproveMethod,
    // Handlers
    handleSubmit,
    handleCopy,
    handleReset,
  };
}
