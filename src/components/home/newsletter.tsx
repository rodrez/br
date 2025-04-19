'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
    // TOOD: We will use actions or trpc to handle this
      // This would be an API call in a real implementation
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Example success handling
      toast.success('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      toast.error('Something went wrong!');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="newsletter">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                Subscribe to Our Newsletter
              </h2>
              <p
                className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
              >
                Get the latest product rankings delivered straight to your inbox.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-primary hover:bg-primary text-white"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By subscribing, you agree to our{' '}
                <a className="underline underline-offset-2 text-primary" href="/terms">
                  Terms &amp; Conditions
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 