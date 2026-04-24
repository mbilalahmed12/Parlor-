import Head from 'next/head';
import Header from '@/components/Header';
import Booking from '@/components/Booking';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

export default function BookingPage() {
  return (
    <>
      <Head>
        <title>Book a Service - Elite Parlor</title>
        <description>Reserve your appointment at Elite Parlor</description>
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-20">
          <Booking />
        </div>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </>
  );
}
