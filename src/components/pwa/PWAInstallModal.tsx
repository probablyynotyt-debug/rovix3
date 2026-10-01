import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  X,
  CheckCircle2,
  Share,
  MoreVertical,
  ShieldCheck,
  Download,
  Sparkles,
} from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall.ts';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PWAInstallModal({ isOpen, onClose }: PWAInstallModalProps) {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [installedSuccess, setInstalledSuccess] = useState(false);
  const [iconKey, setIconKey] = useState(Date.now());

  // Detect newly uploaded icon when modal opens
  useEffect(() => {
    if (isOpen) {
      setIconKey(Date.now());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNativeInstall = async () => {
    const success = await install();
    if (success) {
      setInstalledSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in select-none font-sans">
      <div className="bg-[#1f2125] border border-neutral-700/80 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-900/50 via-indigo-900/40 to-neutral-900/60 p-5 sm:p-6 border-b border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#17191d] p-1 flex items-center justify-center shadow-lg border border-neutral-700/80 shrink-0 overflow-hidden">
              <img
                src={`/icon.png?v=${iconKey}`}
                alt="Rovix App Icon"
                className="w-full h-full object-contain rounded-xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.endsWith('/logo.png')) {
                    target.src = '/logo.png';
                  }
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                  Install Rovix App
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  MOBILE APP
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Install directly to your home screen with high performance &amp; touch controls
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* App Icon Preview Card */}
          <div className="flex items-center gap-3.5 p-3.5 bg-[#17191d] rounded-xl border border-neutral-800/90 shadow-inner">
            <div className="w-12 h-12 rounded-xl bg-[#23262b] p-1.5 flex items-center justify-center shadow-md border border-neutral-700/60 shrink-0">
              <img
                src={`/icon.png?v=${iconKey}`}
                alt="Rovix App Icon"
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.endsWith('/logo.png')) {
                    target.src = '/logo.png';
                  }
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>Rovix</span>
                <span className="text-[10px] text-blue-400 font-semibold px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Samsung &amp; Mobile Icon
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5 leading-snug">
                This icon will be installed onto your Samsung / Android / iOS home screen.
              </p>
            </div>
          </div>

          {/* Native Install Button (if available) */}
          {isInstallable && !isInstalled && !installedSuccess && (
            <button
              type="button"
              onClick={handleNativeInstall}
              className="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-blue-600 hover:from-blue-500 to-indigo-600 hover:to-indigo-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-xl shadow-blue-600/30 transition-all transform active:scale-98 cursor-pointer border border-blue-400/40"
            >
              <Download className="w-5 h-5" />
              <span>Install Rovix Shortcut Now</span>
            </button>
          )}

          {installedSuccess && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-1">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="text-sm font-bold text-emerald-300">Rovix App Installed!</div>
              <p className="text-xs text-neutral-300">Shortcut added to your home screen.</p>
            </div>
          )}

          {/* Browser Specific Installation Guides */}
          <div className="bg-[#24272c] border border-neutral-700/80 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Smartphone className="w-4 h-4 text-blue-400" />
              <span>How to Install on Mobile Devices:</span>
            </div>

            {/* Samsung Internet Specific Guide */}
            <div className="bg-[#18191c] rounded-xl p-3.5 text-xs text-neutral-300 space-y-2 border border-neutral-800">
              <div className="font-bold text-blue-300 flex items-center gap-1.5">
                <MoreVertical className="w-4 h-4 text-blue-400" />
                <span>Samsung Internet (Samsung Galaxy):</span>
              </div>
              <div className="pl-5 space-y-1.5 text-[11px] text-neutral-300 leading-relaxed">
                <div>1. Tap the <strong>menu icon (☰ or ⋮)</strong> at the bottom/top of Samsung Internet.</div>
                <div>2. Select <strong>Add page to</strong> &rarr; <strong>Home screen</strong> (or tap <strong>Install app</strong> if prompted).</div>
                <div>3. Tap <strong>Add</strong>. The Rovix app icon will appear in your Samsung One UI app drawer and home screen.</div>
              </div>
            </div>

            {/* Google Chrome & Edge Mobile Guide */}
            <div className="bg-[#18191c] rounded-xl p-3.5 text-xs text-neutral-300 space-y-2 border border-neutral-800">
              <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                <MoreVertical className="w-4 h-4 text-indigo-400" />
                <span>Google Chrome &amp; Edge Mobile:</span>
              </div>
              <div className="pl-5 space-y-1.5 text-[11px] text-neutral-300 leading-relaxed">
                <div>1. Tap the <strong>three dots (⋮)</strong> in the top-right corner.</div>
                <div>2. Tap <strong>Add to Home screen</strong> or <strong>Install application</strong>.</div>
                <div>3. Tap <strong>Install</strong> to add the Rovix shortcut to your phone.</div>
              </div>
            </div>

            {/* iOS Safari Guide */}
            {isIOS && (
              <div className="bg-[#18191c] rounded-xl p-3.5 text-xs text-neutral-300 space-y-2 border border-neutral-800">
                <div className="font-bold text-blue-300 flex items-center gap-1.5">
                  <Share className="w-4 h-4 text-blue-400" />
                  <span>iPhone / iPad Safari:</span>
                </div>
                <div className="pl-5 space-y-1.5 text-[11px] text-neutral-300 leading-relaxed">
                  <div>1. Tap the <strong>Share button</strong> in Safari toolbar.</div>
                  <div>2. Scroll down and tap <strong>Add to Home Screen</strong>.</div>
                  <div>3. Tap <strong>Add</strong> in top right.</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#17181a] border-t border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>PWA web application install tutorial</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#2b2d31] hover:bg-[#34373c] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
