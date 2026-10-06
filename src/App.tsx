/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatIDo } from './components/WhatIDo';
import { Currently } from './components/Currently';
import { SelectedWork } from './components/SelectedWork';
import { OpenForWork } from './components/OpenForWork';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { AnimatedBackground } from './components/AnimatedBackground';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 2500);
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#F5F5F5] flex flex-col font-sans selection:bg-white/20 selection:text-white">
      {/* Scroll-Reactive Animated Ambient Background */}
      <AnimatedBackground />

      {/* Sticky Blurred Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 flex-1">
        <Hero onNotify={showNotification} />
        <WhatIDo />
        <Currently />
        <SelectedWork />
        <OpenForWork />
        <SocialSection onNotify={showNotification} />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Micro-interaction Toast */}
      <Toast message={toastMessage} />
    </div>
  );
}
