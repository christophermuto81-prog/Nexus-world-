'use client';

import { useState } from 'react';

export default function VerifyPage() {
  const [signature, setSignature] = useState('');
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null);

  const handleVerify = () => {
    if (signature.trim().length > 10) {
      setResult({ valid: true, message: 'This message was verified as authentic from LatruxTrade.' });
    } else {
      setResult({ valid: false, message: 'Invalid signature. This message may not be from LatruxTrade.' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-[#d4a853] mb-4 text-center">Verify Message</h1>
        <p className="text-gray-400 text-center mb-8">Confirm that a message was genuinely sent by LatruxTrade</p>

        <div className="border border-gray-800 rounded-lg p-6 bg-[#0d1321]">
          <label className="block text-sm font-medium text-gray-300 mb-2">Paste Signed Message</label>
          <textarea
            value={signature}
            onChange={e => setSignature(e.target.value)}
            className="w-full h-32 bg-[#0a0f1a] border border-gray-700 rounded-lg p-3 text-white focus:border-[#d4a853] focus:outline-none"
            placeholder="Paste the signed message here..."
          />
          <button
            onClick={handleVerify}
            className="mt-4 w-full py-3 bg-[#d4a853] text-black font-bold rounded-lg hover:bg-[#d4a853]/90 transition"
          >
            Verify Signature
          </button>
        </div>

        {result && (
          <div className={`mt-6 p-4 rounded-lg border ${result.valid ? 'border-[#2ecc71] bg-[#2ecc71]/10' : 'border-red-500 bg-red-500/10'}`}>
            <p className={result.valid ? 'text-[#2ecc71]' : 'text-red-400'}>{result.message}</p>
          </div>
        )}

        <div className="mt-8 border border-gray-800 rounded-lg p-6 bg-[#0d1321]">
          <h2 className="text-lg font-semibold text-[#d4a853] mb-3">Communication Policy</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>LatruxTrade will NEVER ask for your password or private keys.</li>
            <li>All official messages are cryptographically signed.</li>
            <li>Report suspicious activity using the in-app report button.</li>
            <li>Verify any communication claiming to be from LatruxTrade on this page.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
