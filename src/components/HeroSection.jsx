'use client';

import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import { usePromptImprover } from '@/hooks/usePromptImprover';

export default function HeroSection() {
  const {
    idea,
    result,
    loading,
    error,
    copied,
    improveMethod,
    setIdea,
    setImproveMethod,
    handleSubmit,
    handleCopy,
    handleReset,
  } = usePromptImprover();

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-950 to-emerald-950 animate-gradient'>
      <div className='container mx-auto px-4 py-16'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <h1 className='text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg'>
            Vibe Coder
          </h1>
          <p className='text-xl md:text-2xl text-white/90 max-w-2xl mx-auto'>
            Transform your rough ideas into clear, actionable website prompts
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='max-w-4xl mx-auto'
        >
          {/* Input Section */}
          {!result && (
            <div className='bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20'>
              <form onSubmit={handleSubmit}>
                <label
                  htmlFor='idea'
                  className='block text-white text-lg font-semibold mb-3'
                >
                  What's your website idea?
                </label>

                <textarea
                  id='idea'
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder='e.g., I want to build an online store for selling handmade jewelry with a shopping cart and payment integration...'
                  className='w-full h-48 px-6 py-4 rounded-2xl bg-white/90 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/50 resize-none text-lg'
                  disabled={loading}
                />

                {/* Improvement Method Selection */}
                <div className='mt-6 mb-6'>
                  <label className='block text-white text-lg font-semibold mb-3'>
                    Choose improvement method:
                  </label>
                  <div className='flex gap-4 flex-wrap'>
                    <label className='flex items-center gap-3 cursor-pointer'>
                      <input
                        type='radio'
                        name='improveMethod'
                        value='standard'
                        checked={improveMethod === 'standard'}
                        onChange={(e) => setImproveMethod(e.target.value)}
                        disabled={loading}
                        className='w-4 h-4 cursor-pointer'
                      />
                      <span className='text-white font-medium'>
                        Standard Improve
                      </span>
                    </label>
                    <label className='flex items-center gap-3 cursor-pointer'>
                      <input
                        type='radio'
                        name='improveMethod'
                        value='ai'
                        checked={improveMethod === 'ai'}
                        onChange={(e) => setImproveMethod(e.target.value)}
                        disabled={loading}
                        className='w-4 h-4 cursor-pointer'
                      />
                      <span className='text-white font-medium'>
                        🤖 Improve Using AI (GPT-3.5 Turbo)
                      </span>
                    </label>
                  </div>
                </div>

                <div className='flex items-center justify-between mt-4'>
                  <span className='text-white/80 text-sm'>
                    {idea.length} / 1000 characters
                  </span>

                  <button
                    type='submit'
                    disabled={loading || idea.trim().length < 10}
                    className='px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200'
                  >
                    {loading ? (
                      <span className='flex items-center gap-2'>
                        <LoadingSpinner />
                        Improving...
                      </span>
                    ) : (
                      '✨ Improve My Idea'
                    )}
                  </button>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='text-red-200 mt-4 text-center bg-red-500/20 py-2 px-4 rounded-lg'
                  >
                    {error}
                  </motion.p>
                )}
              </form>
            </div>
          )}

          {/* Result Section */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className='space-y-6'
              >
                {/* Original Idea */}
                <div className='bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20'>
                  <h2 className='text-white text-xl font-semibold mb-3 flex items-center gap-2'>
                    📝 Your Original Idea
                  </h2>
                  <p className='text-white/90 italic'>"{result.original}"</p>
                </div>

                {/* Improved Version */}
                <div className='bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20'>
                  <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-white text-2xl font-bold flex items-center gap-2'>
                      ✨ Improved Version
                    </h2>

                    <button
                      onClick={handleCopy}
                      className='px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-full font-semibold transition-all duration-200 flex items-center gap-2'
                    >
                      {copied ? '✓ Copied!' : '📋 Copy'}
                    </button>
                  </div>

                  <div className='bg-white/90 rounded-2xl p-6 text-gray-800 max-h-96 overflow-y-auto'>
                    <pre className='whitespace-pre-wrap font-sans text-sm leading-relaxed'>
                      {result.improved}
                    </pre>
                  </div>

                  {/* Detected Info */}
                  <div className='mt-6 flex flex-wrap gap-3'>
                    <span className='px-4 py-2 bg-purple-500/30 text-white rounded-full text-sm font-medium'>
                      Type: {result.projectType}
                    </span>
                    {result.detectedFeatures.map((feature, idx) => (
                      <span
                        key={idx}
                        className='px-4 py-2 bg-pink-500/30 text-white rounded-full text-sm font-medium'
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex justify-center gap-4'>
                  <button
                    onClick={handleReset}
                    className='px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200'
                  >
                    🔄 Try Another Idea
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='text-center mt-16 text-white/70'
        >
          <p>Built with Next.js + Node.js | Ahmed Othman</p>
        </motion.div>
      </div>
    </div>
  );
}
