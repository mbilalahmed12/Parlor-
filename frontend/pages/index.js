import Head from 'next/head';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Booking from '@/components/Booking';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { useAuthStore } from '@/lib/store';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  const { hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <>
      <Head>
        <title>Elite Parlor - Premium Beauty & Wellness</title>
        <meta name="description" content="Experience luxury beauty and wellness services at Elite Parlor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        <Hero />
        <Services />
        <Booking />
        <Testimonials />
        <Footer />
        <Toaster position="top-right" />
      </div>
    </>
  );
}
