import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Camera,
  X,
  RefreshCw,
  Printer,
  CheckCircle2,
  Sparkles,
  Eye,
  Scan,
  ShieldCheck,
  FileText,
  ChevronRight,
  ArrowRight,
  Activity,
  Layers,
  Check,
  Share2,
  Info
} from 'lucide-react';
import { EducationalReport } from './types';

// Sample demonstration photos for instant exhibition testing
const DEMO_SAMPLES = [
  {
    id: 'smile',
    title: 'Anterior Smile View',
    subtitle: 'Front teeth & smile line',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23f8fafc"/><stop offset="100%" stop-color="%23e2e8f0"/></linearGradient><linearGradient id="lip" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23e17076"/><stop offset="100%" stop-color="%23be4b53"/></linearGradient></defs><rect width="600" height="400" fill="url(%23g1)"/><circle cx="300" cy="200" r="180" fill="%23ffffff" stroke="%23cbd5e1" stroke-width="2"/><path d="M 140 200 C 190 145, 240 140, 300 155 C 360 140, 410 145, 460 200 C 420 255, 360 275, 300 275 C 240 275, 180 255, 140 200 Z" fill="url(%23lip)"/><path d="M 175 200 C 210 170, 255 165, 300 170 C 345 165, 390 170, 425 200 C 390 230, 350 240, 300 240 C 250 240, 210 230, 175 200 Z" fill="%232b0d10"/><path d="M 270 174 L 270 215 Q 285 218 298 218 L 298 174 Z" fill="%23fcfdfd" stroke="%23cbd5e1"/><path d="M 302 174 L 302 218 Q 315 218 330 215 L 330 174 Z" fill="%23fcfdfd" stroke="%23cbd5e1"/><path d="M 242 177 L 242 210 Q 255 213 268 213 L 268 175 Z" fill="%23f8fafc" stroke="%23cbd5e1"/><path d="M 332 175 L 332 213 Q 345 213 358 210 L 358 177 Z" fill="%23f8fafc" stroke="%23cbd5e1"/><path d="M 260 238 L 260 219 L 298 219 L 298 238 Z" fill="%23f1f5f9" stroke="%23cbd5e1"/><path d="M 302 238 L 302 219 L 340 219 L 340 238 Z" fill="%23f1f5f9" stroke="%23cbd5e1"/><text x="300" y="70" font-family="sans-serif" font-size="14" font-weight="bold" fill="%230284c7" text-anchor="middle">EXHIBITION VISUAL SAMPLE • SMILE &amp; TEETH</text></svg>`,
  },
  {
    id: 'gingiva',
    title: 'Gingival & Sulcus Close-up',
    subtitle: 'Tooth margin & gum tissue',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="gumg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23e87a84"/><stop offset="100%" stop-color="%23c9505b"/></linearGradient></defs><rect width="600" height="400" fill="%23f1f5f9"/><rect x="180" y="120" width="55" height="130" rx="8" fill="%23ffffff" stroke="%23cbd5e1" stroke-width="2"/><rect x="245" y="110" width="55" height="145" rx="8" fill="%23ffffff" stroke="%23cbd5e1" stroke-width="2"/><rect x="310" y="110" width="55" height="145" rx="8" fill="%23ffffff" stroke="%23cbd5e1" stroke-width="2"/><rect x="375" y="120" width="55" height="130" rx="8" fill="%23ffffff" stroke="%23cbd5e1" stroke-width="2"/><path d="M 100 320 C 180 250, 420 250, 500 320 L 500 380 L 100 380 Z" fill="url(%23gumg)"/><path d="M 160 300 Q 185 235 210 300 Q 240 230 270 300 Q 300 225 330 300 Q 360 230 390 300 Q 420 235 445 300 Z" fill="%23d65662"/><ellipse cx="272" cy="250" rx="22" ry="7" fill="%23fde047" opacity="0.45"/><text x="300" y="70" font-family="sans-serif" font-size="14" font-weight="bold" fill="%230284c7" text-anchor="middle">EXHIBITION VISUAL SAMPLE • GUM MARGINS</text></svg>`,
  },
  {
    id: 'facial',
    title: 'Facial Midline & Profile',
    subtitle: 'Lip posture & facial symmetry',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23f8fafc"/><ellipse cx="300" cy="200" rx="140" ry="170" fill="%23fed7aa" stroke="%23fdba74" stroke-width="2"/><circle cx="245" cy="165" r="9" fill="%23334155"/><circle cx="355" cy="165" r="9" fill="%23334155"/><path d="M 300 165 L 305 210 L 295 215" fill="none" stroke="%23c2410c" stroke-width="2.5" stroke-linecap="round"/><path d="M 255 255 Q 300 240 345 255 Q 300 280 255 255 Z" fill="%23e17076"/><line x1="300" y1="50" x2="300" y2="350" stroke="%230ea5e9" stroke-width="1.5" stroke-dasharray="4 4"/><text x="300" y="380" font-family="sans-serif" font-size="13" font-weight="bold" fill="%230284c7" text-anchor="middle">EXHIBITION VISUAL SAMPLE • FACIAL SYMMETRY</text></svg>`,
  },
];

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [imageFileName, setImageFileName] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Camera modal state
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Analysis status & states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>('Initializing optical analysis...');
  const [report, setReport] = useState<EducationalReport | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const reportRef = useRef<HTMLDivElement | null>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, WEBP).');
      return;
    }
    setImageFileName(file.name);
    setImageMimeType(file.type);

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const loadSample = (sample: (typeof DEMO_SAMPLES)[0]) => {
    setSelectedImage(sample.svg);
    setImageMimeType('image/svg+xml');
    setImageFileName(`${sample.id}-sample.svg`);
    setErrorMessage(null);
  };

  const startCamera = async () => {
    setCameraError(null);
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      setCameraError('Unable to access camera. Please upload an image file instead.');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setSelectedImage(dataUrl);
      setImageMimeType('image/jpeg');
      setImageFileName('Camera_Snapshot.jpg');
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setCameraError(null);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImageFileName('');
    setReport(null);
    setErrorMessage(null);
  };

  const handleGenerateReport = async () => {
    if (!selectedImage) {
      setErrorMessage('Please upload or select an oral/facial image first.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const steps = [
      'Scanning visual structures & lighting quality...',
      'Mapping anterior tooth alignment & enamel sheen...',
      'Analyzing gingival contours & mucosal uniformity...',
      'Synthesizing evidence-based lifestyle suggestions...',
    ];

    let i = 0;
    const stepInterval = setInterval(() => {
      i = (i + 1) % steps.length;
      setScanStep(steps[i]);
    }, 1100);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType: imageMimeType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${response.status}`);
      }

      const data: EducationalReport = await response.json();
      setReport(data);

      setTimeout(() => {
        reportRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to generate report. Please try again.');
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950 pb-20">
      {/* Decorative ambient background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-600/30 via-cyan-500/30 to-indigo-600/30 blur-[120px] rounded-full" />
        <div className="absolute top-[600px] -left-40 w-[450px] h-[450px] bg-cyan-600/15 blur-[130px] rounded-full" />
        <div className="absolute top-[800px] -right-40 w-[450px] h-[450px] bg-indigo-600/15 blur-[130px] rounded-full" />
      </div>

      {/* Modern Glass Header */}
      <header className="relative z-20 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl sticky top-0">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="h-full w-full rounded-[11px] bg-slate-950 flex items-center justify-center">
                <Scan className="h-4.5 w-4.5 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white block">
                Multi-Modal Oral &amp; Facial Health Screener
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedImage && (
              <button
                onClick={handleReset}
                className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700/80 hover:bg-slate-800/80 flex items-center gap-1.5 transition-all cursor-pointer font-medium"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            )}
            {report && (
              <button
                onClick={() => window.print()}
                className="text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg shadow-sm shadow-cyan-500/25 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 pt-8 space-y-7">
        {/* HERO TITLE SECTION */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
            Multi-Modal Oral &amp; Facial Health Screener
          </h1>
        </div>

        {/* HIGH-TECH IMAGE UPLOAD CARD */}
        <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl p-6 sm:p-7 backdrop-blur-xl overflow-hidden">
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Photo Upload &amp; Capture
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
              Mouth • Smile • Face
            </span>
          </div>

          {!selectedImage ? (
            <div className="space-y-4">
              {/* Dropzone with viewfinder brackets */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`group relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? 'border-cyan-400 bg-cyan-950/20 scale-[1.01]'
                    : 'border-slate-700 hover:border-cyan-500/80 bg-slate-950/40 hover:bg-slate-950/70'
                }`}
              >
                {/* Viewfinder corner decorations */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-slate-600 group-hover:border-cyan-400 transition-colors" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-slate-600 group-hover:border-cyan-400 transition-colors" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-slate-600 group-hover:border-cyan-400 transition-colors" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-slate-600 group-hover:border-cyan-400 transition-colors" />

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />

                <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 shadow-inner group-hover:scale-105 transition-transform">
                  <Upload className="h-6 w-6" />
                </div>

                <p className="text-sm font-bold text-white">
                  Drop your oral or facial photo here, or{' '}
                  <span className="text-cyan-400 underline underline-offset-2">
                    browse files
                  </span>
                </p>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Supports JPEG, PNG, WEBP (recommended 1200x800px+)
                </p>

                {/* Camera snapshot button */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      startCamera();
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 hover:border-cyan-500/50 flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Camera className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Open Live Camera</span>
                  </button>
                </div>
              </div>

              {/* Instant One-Click Demonstration Samples */}
              <div className="pt-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Or try an exhibition test photo in 1-click:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {DEMO_SAMPLES.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => loadSample(sample)}
                      className="text-left p-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group flex items-center gap-3"
                    >
                      <div className="w-11 h-11 rounded-lg bg-slate-900 border border-slate-700 overflow-hidden shrink-0">
                        <img
                          src={sample.svg}
                          alt={sample.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-white truncate group-hover:text-cyan-300">
                          {sample.title}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {sample.subtitle}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 group">
              {/* Photo Viewport */}
              <div className="relative w-full h-80 bg-slate-950 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Uploaded target"
                  className="w-full h-full object-contain"
                />

                {/* Animated HUD scan line effect when loading */}
                {isLoading && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-bounce" />
                    <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-[1px]" />
                  </div>
                )}

                {/* Viewfinder crosshairs */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
                  <div className="w-48 h-48 border border-cyan-500/40 rounded-2xl flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  </div>
                </div>

                {/* Top Overlay Controls */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImageFileName('');
                    }}
                    className="p-1.5 rounded-full bg-slate-900/80 hover:bg-rose-600 text-white border border-slate-700 backdrop-blur-md transition-colors cursor-pointer"
                    title="Remove Photo"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Meta Bar */}
              <div className="p-3.5 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono text-white truncate max-w-[200px]">
                    {imageFileName || 'Selected Target Image'}
                  </span>
                </div>
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer transition-colors"
                  >
                    Change File
                  </button>
                  <button
                    type="button"
                    onClick={startCamera}
                    className="text-slate-400 hover:text-white font-medium cursor-pointer transition-colors"
                  >
                    Retake
                  </button>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
          )}
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="rounded-xl bg-red-950/60 border border-red-500/60 p-4 text-red-200 text-xs font-medium flex items-center gap-3">
            <X className="h-5 w-5 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* BIG HERO BLUE BUTTON */}
        <div className="text-center pt-1">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleGenerateReport}
            className={`group relative w-full sm:w-auto min-w-[340px] px-8 py-4.5 rounded-2xl font-extrabold text-base text-white shadow-xl transition-all duration-300 flex items-center justify-center gap-3 mx-auto ${
              isLoading
                ? 'bg-slate-800 border border-slate-700 cursor-not-allowed opacity-90'
                : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-500 hover:via-cyan-500 hover:to-blue-500 shadow-blue-500/25 hover:shadow-cyan-500/40 active:scale-[0.99] cursor-pointer ring-2 ring-cyan-400/30'
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin text-cyan-400" />
                <span className="font-mono text-cyan-200">
                  {scanStep}
                </span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 text-cyan-200 group-hover:rotate-12 transition-transform" />
                <span>Generate Educational Report</span>
                <ArrowRight className="h-4 w-4 text-cyan-200 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* STRUCTURED 4-PART REPORT CARD */}
        {report && (
          <div
            ref={reportRef}
            className="pt-8 border-t border-slate-800 space-y-6 animate-fadeIn"
          >
            {/* Header banner */}
            <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-700/80 p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-semibold mb-2">
                    <Activity className="h-3 w-3" />
                    <span>Visual Analysis Complete</span>
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    Structured Educational Report
                  </h3>
                </div>

                <button
                  onClick={() => window.print()}
                  className="self-start sm:self-auto text-xs font-semibold bg-white text-slate-950 hover:bg-slate-100 px-4 py-2 rounded-xl transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print Report</span>
                </button>
              </div>

              {report.overallSummary && (
                <p className="mt-4 pt-4 border-t border-slate-800 text-slate-300 text-sm leading-relaxed">
                  {report.overallSummary}
                </p>
              )}
            </div>

            {/* PART 1: VISUAL OBSERVATIONS */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 font-bold text-sm flex items-center justify-center">
                  1
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    Part 1: Visual Observations
                  </h4>
                  <p className="text-xs text-slate-400">
                    Surface features observed from 2D photographic inspection
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {report.visualObservations?.map((obs, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3 hover:border-slate-700 transition-colors"
                  >
                    <Eye className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {obs}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* PART 2: POSSIBLE AREAS OF ATTENTION (SOFT LANGUAGE) */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-sm flex items-center justify-center">
                  2
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white">
                      Part 2: Possible Areas of Attention
                    </h4>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 font-semibold">
                      Soft Language Only
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Discussion points to raise with a dental professional
                  </p>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                {report.possibleAreasOfAttention?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/90 flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {item.level || 'Routine'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* PART 3: GENERAL LIFESTYLE SUGGESTIONS */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-sm flex items-center justify-center">
                  3
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    Part 3: General Lifestyle Suggestions
                  </h4>
                  <p className="text-xs text-slate-400">
                    Evidence-based preventive hygiene practices
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {report.lifestyleSuggestions?.map((sug, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 flex items-start gap-3"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                      {sug}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* PART 4: STRONG EDUCATIONAL DISCLAIMER */}
            <div className="rounded-2xl bg-gradient-to-r from-red-950/40 via-red-900/20 to-red-950/40 border border-red-500/40 p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 rounded-xl bg-red-600 text-white font-bold text-sm flex items-center justify-center shadow-md">
                  4
                </div>
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Part 4: Strong Educational Disclaimer</span>
                  </h4>
                  <p className="text-xs text-red-300">
                    Exhibition &amp; Demonstration Protocol
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-red-500/30 text-xs sm:text-sm text-red-100/90 leading-relaxed">
                <p className="font-semibold text-red-300 mb-1">
                  EXHIBITION DEMO ONLY:
                </p>
                <p>{report.educationalDisclaimer}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* LIVE CAMERA CAPTURE MODAL */}
      {isCameraActive && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Camera className="h-4 w-4 text-cyan-400" />
                <span>Live Camera View</span>
              </div>
              <button
                onClick={stopCamera}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 bg-black">
              {cameraError ? (
                <div className="p-6 text-center text-red-400 text-xs">
                  {cameraError}
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-black">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {/* Framing guideline */}
                  <div className="absolute inset-0 pointer-events-none border border-white/20 m-6 rounded-2xl flex items-center justify-center">
                    <div className="w-44 h-24 border-2 border-dashed border-cyan-400/80 rounded-xl" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={stopCamera}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={capturePhoto}
                disabled={Boolean(cameraError)}
                className="px-5 py-2 text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl shadow-md cursor-pointer flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                <span>Capture Snapshot</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
