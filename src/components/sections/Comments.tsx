import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import emailjs from '@emailjs/browser';

const Comments: React.FC = () => {
  const { theme, isDark } = useTheme();
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const maxWords = 100;
  const wordCount = message.trim().split(/\s+/).filter(word => word.length > 0).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (wordCount > maxWords || !message.trim() || !name.trim() || !email.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Initialize EmailJS with your service configuration
      await emailjs.send(
        'your_service_id', // Replace with your EmailJS service ID
        'your_template_id', // Replace with your EmailJS template ID
        {
          from_name: name,
          from_email: email,
          message: message,
          to_email: 'john.doe@email.com', // Your email address
        },
        'your_public_key' // Replace with your EmailJS public key
      );
      
      setSubmitStatus('success');
      setMessage('');
      setName('');
      setEmail('');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStyles = () => {
    if (theme === 'professional') {
      return {
        bg: isDark ? 'bg-gray-800' : 'bg-gray-50',
        text: isDark ? 'text-white' : 'text-gray-800',
        card: isDark ? 'bg-gray-700' : 'bg-white',
        input: isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800',
        accent: isDark ? 'text-blue-400' : 'text-blue-600',
        button: isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700',
      };
    } else {
      return {
        bg: isDark ? 'bg-gray-800' : 'bg-gray-900',
        text: isDark ? 'text-cyan-400' : 'text-cyan-400',
        card: isDark ? 'bg-gray-900' : 'bg-black',
        input: isDark ? 'bg-gray-800 border-purple-500/50 text-cyan-400' : 'bg-black border-purple-500/50 text-cyan-400',
        accent: 'text-purple-400',
        button: 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600',
      };
    }
  };

  const styles = getStyles();

  return (
    <section id="comments" className={`min-h-screen py-20 ${styles.bg} relative`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-4xl lg:text-5xl font-bold mb-4 ${styles.text} ${
            theme === 'professional' ? 'font-serif' : 'font-bold'
          }`}>
            Leave a Message
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            theme === 'professional' 
              ? isDark ? 'bg-blue-400' : 'bg-blue-600'
              : 'bg-gradient-to-r from-purple-400 to-cyan-400'
          }`} />
          <p className={`mt-6 text-lg ${
            theme === 'professional'
              ? isDark ? 'text-gray-300' : 'text-gray-600'
              : 'text-gray-300'
          }`}>
            I'd love to hear from you! Share your thoughts, feedback, or just say hello.
          </p>
        </motion.div>

        <motion.div
          className={`${styles.card} rounded-lg p-8 shadow-lg border ${
            theme === 'professional'
              ? isDark ? 'border-gray-600' : 'border-gray-200'
              : 'border-purple-500/30'
          } relative`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Message Icon */}
          <motion.div
            className={`flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-8 ${
              theme === 'professional'
                ? isDark ? 'bg-blue-400/20' : 'bg-blue-100'
                : 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20'
            }`}
            animate={theme === 'creative' ? {
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            } : {}}
            transition={theme === 'creative' ? {
              duration: 4,
              repeat: Infinity,
            } : {}}
          >
            <MessageCircle 
              size={32} 
              className={`${styles.accent} ${theme === 'creative' ? 'drop-shadow-glow' : ''}`}
            />
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <label className={`block text-sm font-medium mb-2 ${styles.text}`}>
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  styles.input
                } ${theme === 'professional' 
                  ? 'focus:ring-blue-400' 
                  : 'focus:ring-purple-400'
                }`}
                placeholder="Enter your name"
                required
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <label className={`block text-sm font-medium mb-2 ${styles.text}`}>
                Your Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  styles.input
                } ${theme === 'professional' 
                  ? 'focus:ring-blue-400' 
                  : 'focus:ring-purple-400'
                }`}
                placeholder="Enter your email"
                required
              />
            </motion.div>

            {/* Message Field */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <label className={`block text-sm font-medium mb-2 ${styles.text}`}>
                Your Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 resize-none ${
                  styles.input
                } ${theme === 'professional' 
                  ? 'focus:ring-blue-400' 
                  : 'focus:ring-purple-400'
                }`}
                placeholder="Share your thoughts, feedback, or just say hello..."
                required
              />
              
              {/* Word Counter */}
              <div className="flex justify-between items-center mt-2">
                <span className={`text-sm ${
                  wordCount > maxWords 
                    ? 'text-red-400' 
                    : theme === 'professional'
                      ? isDark ? 'text-gray-400' : 'text-gray-600'
                      : 'text-gray-400'
                }`}>
                  {wordCount}/{maxWords} words
                </span>
                
                {wordCount > maxWords && (
                  <motion.span
                    className="text-sm text-red-400"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Please keep it under {maxWords} words
                  </motion.span>
                )}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.button
                type="submit"
                disabled={isSubmitting || wordCount > maxWords || !message.trim() || !name.trim() || !email.trim()}
                className={`px-8 py-4 rounded-lg font-medium text-lg text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  styles.button
                }`}
                whileHover={!isSubmitting ? { 
                  scale: 1.05,
                  boxShadow: theme === 'creative' 
                    ? '0 0 30px rgba(168, 85, 247, 0.5)' 
                    : '0 10px 30px rgba(59, 130, 246, 0.3)'
                } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              >
                <div className="flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </div>
              </motion.button>
            </motion.div>
          </form>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <motion.div
              className="mt-6 p-4 rounded-lg bg-green-100 border border-green-400 flex items-center justify-center space-x-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CheckCircle className="text-green-600" size={20} />
              <span className="text-green-800 font-medium">
                Message sent successfully! I'll get back to you soon.
              </span>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              className="mt-6 p-4 rounded-lg bg-red-100 border border-red-400 flex items-center justify-center space-x-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <XCircle className="text-red-600" size={20} />
              <span className="text-red-800 font-medium">
                Failed to send message. Please try again or contact me directly.
              </span>
            </motion.div>
          )}

          {/* Creative Mode: Animated Border */}
          {theme === 'creative' && (
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                background: 'linear-gradient(45deg, transparent, rgba(168, 85, 247, 0.1), transparent, rgba(6, 182, 212, 0.1), transparent)',
                backgroundSize: '400% 400%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}
        </motion.div>

        {/* Note */}
        <motion.p
          className={`text-center mt-8 text-sm ${
            theme === 'professional'
              ? isDark ? 'text-gray-400' : 'text-gray-600'
              : 'text-gray-400'
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          * Your message will be sent directly to my email. I typically respond within 24 hours.
        </motion.p>
      </div>

      {/* Background Decoration for Creative Mode */}
      {theme === 'creative' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Comments;